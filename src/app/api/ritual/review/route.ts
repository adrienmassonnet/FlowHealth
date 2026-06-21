import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getDb() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      device_token?: string;
      rating?: number;
      noticed?: string;
      continue?: string;
    };

    const deviceToken = (body.device_token ?? '').trim();
    if (!deviceToken) {
      return NextResponse.json({ error: 'missing_device_token' }, { status: 400 });
    }

    const db = getDb();
    const { data: profile } = await db
      .from('profiles')
      .select('id')
      .eq('bound_device_token', deviceToken)
      .single();

    if (!profile) {
      return NextResponse.json({ error: 'profile_not_found' }, { status: 404 });
    }

    await db.from('ritual_reviews').insert({
      profile_id: profile.id,
      rating: body.rating ?? null,
      noticed: body.noticed ?? null,
      will_continue: body.continue ?? null,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[ritual/review]', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
