import bcrypt from 'bcryptjs';

const OTP_EXPIRY_MINUTES = 10;
const OTP_MAX_ATTEMPTS = 3;
const OTP_LOCKOUT_MINUTES = 15;

export function generateCode(): string {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return String(array[0] % 10_000).padStart(4, '0');
}

export async function hashCode(code: string): Promise<string> {
  return bcrypt.hash(code, 10);
}

export async function verifyCode(code: string, hash: string): Promise<boolean> {
  return bcrypt.compare(code, hash);
}

export function otpExpiresAt(): Date {
  return new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
}

export function lockoutUntil(): Date {
  return new Date(Date.now() + OTP_LOCKOUT_MINUTES * 60 * 1000);
}

export function isLockedOut(lockedUntil: string | null): boolean {
  if (!lockedUntil) return false;
  return new Date(lockedUntil) > new Date();
}

export function attemptsRemaining(attemptCount: number): number {
  return Math.max(0, OTP_MAX_ATTEMPTS - attemptCount);
}

export function shouldLock(attemptCount: number): boolean {
  return attemptCount + 1 >= OTP_MAX_ATTEMPTS;
}
