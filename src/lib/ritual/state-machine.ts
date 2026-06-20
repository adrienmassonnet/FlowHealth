// Flow engine — determines which screen state to return for a given scan

import { db, type Profile } from './supabase';

export type RitualState =
  | 'new_visitor'
  | 'otp_pending'
  | 'first_time_success'
  | 'daily_message'
  | 'milestone'
  | 'already_checked_in'
  | 'gap_return'
  | 'email_not_found'
  | 'device_conflict'
  | 'non_customer';

export interface ScanResult {
  state: RitualState;
  profile: Profile | null;
  displayPosition: number; // 1–10, cycling
  isGapReturn: boolean;
  isMilestone: boolean;
  milestonePosition?: number;
}

const COOLDOWN_HOURS = 21;
const GAP_HOURS = 96; // 4 days
const CYCLE_LENGTH = 10;
const MILESTONE_POSITIONS = [10]; // expand for future milestones

function displayPosition(sequencePosition: number): number {
  if (sequencePosition === 0) return 1;
  return ((sequencePosition - 1) % CYCLE_LENGTH) + 1;
}

function hoursSince(isoTimestamp: string): number {
  return (Date.now() - new Date(isoTimestamp).getTime()) / 3_600_000;
}

export async function processScan(deviceToken: string): Promise<ScanResult> {
  const profile = await db.profiles.findByDeviceToken(deviceToken);

  if (!profile) {
    return { state: 'new_visitor', profile: null, displayPosition: 1, isGapReturn: false, isMilestone: false };
  }

  // Update device last seen
  await db.deviceTokens.touch(deviceToken);

  // Cooldown check — must wait 21h between valid scans
  if (profile.last_scan_at) {
    const hours = hoursSince(profile.last_scan_at);

    if (hours < COOLDOWN_HOURS) {
      await db.scanEvents.insert({
        profile_id: profile.id,
        outcome: 'cooldown_rejected',
        device_token: deviceToken,
        ip_hash: null,
        metadata: { email: profile.email, hours_since_last_scan: Math.round(hours * 10) / 10 },
      });
      return { state: 'already_checked_in', profile, displayPosition: displayPosition(profile.sequence_position), isGapReturn: false, isMilestone: false };
    }
  }

  // Device conflict check — bound token exists and doesn't match
  if (profile.bound_device_token && profile.bound_device_token !== deviceToken) {
    await db.scanEvents.insert({
      profile_id: profile.id,
      outcome: 'device_conflict',
      device_token: deviceToken,
      ip_hash: null,
      metadata: { email: profile.email },
    });
    return { state: 'device_conflict', profile, displayPosition: displayPosition(profile.sequence_position), isGapReturn: false, isMilestone: false };
  }

  // Gap detection — more than 4 days since last scan
  const isGapReturn = !!(profile.last_scan_at && hoursSince(profile.last_scan_at) > GAP_HOURS);

  // Advance sequence
  const newPosition = profile.sequence_position + 1;
  const newDisplayPosition = displayPosition(newPosition);

  // Reset gap nudge flag so they can receive another nudge if they lapse again
  await db.profiles.update(profile.id, {
    sequence_position: newPosition,
    last_scan_at: new Date().toISOString(),
    bound_device_token: deviceToken,
    gap_nudge_sent_at: null,
  });

  // Log valid scan
  const outcome = isGapReturn ? 'gap_return' : (MILESTONE_POSITIONS.includes(newPosition) ? 'milestone' : 'valid');
  await db.scanEvents.insert({
    profile_id: profile.id,
    outcome,
    device_token: deviceToken,
    ip_hash: null,
    metadata: { email: profile.email, sequence_position: newPosition, display_position: newDisplayPosition },
  });

  // Milestone check
  if (MILESTONE_POSITIONS.includes(newPosition)) {
    return {
      state: 'milestone',
      profile,
      displayPosition: newDisplayPosition,
      isGapReturn,
      isMilestone: true,
      milestonePosition: newPosition,
    };
  }

  // Gap return — show warm welcome-back screen before daily message
  if (isGapReturn) {
    return { state: 'gap_return', profile, displayPosition: newDisplayPosition, isGapReturn: true, isMilestone: false };
  }

  // Normal daily message
  const state: RitualState = profile.sequence_position === 0 ? 'first_time_success' : 'daily_message';
  return { state, profile, displayPosition: newDisplayPosition, isGapReturn: false, isMilestone: false };
}
