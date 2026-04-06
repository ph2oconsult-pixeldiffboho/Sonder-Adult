import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import webpush from "web-push";

// ─────────────────────────────────────────────
// SONDER NOTIFICATION CRON
// ─────────────────────────────────────────────
// Called by Vercel Cron every hour.
// Checks each user against touch timing rules.
// Sends max 3 notifications per user, ever.
//
// Touch 1: 18-24h after first session (if inactive)
// Touch 2: 48-72h after Touch 1 (if inactive)
// Touch 3: 5-7 days after Touch 2 (if inactive)

const TOUCHES = [
  { number: 1, message: "It came back.", minHours: 18, maxHours: 24 },
  { number: 2, message: "Same place it starts.", minHours: 48, maxHours: 72 },
  { number: 3, message: "It didn't go as far this time.", minHours: 120, maxHours: 168 },
];

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Server-side Supabase client (uses service role key)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Configure web-push
  webpush.setVapidDetails(
    "mailto:hello@sonder-adult.vercel.app",
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
  );

  // Get all users with push subscriptions
  const { data: subscriptions } = await supabase
    .from("push_subscriptions")
    .select("user_id, endpoint, p256dh, auth");

  if (!subscriptions || subscriptions.length === 0) {
    return NextResponse.json({ sent: 0 });
  }

  // Group subscriptions by user
  const userSubs = new Map<string, typeof subscriptions>();
  for (const sub of subscriptions) {
    const existing = userSubs.get(sub.user_id) || [];
    existing.push(sub);
    userSubs.set(sub.user_id, existing);
  }

  let sent = 0;

  for (const [userId, subs] of userSubs) {
    try {
      // Get user state
      const { data: state } = await supabase
        .from("user_state")
        .select("last_completed_at, last_seen_at")
        .eq("user_id", userId)
        .single();

      if (!state?.last_completed_at) continue;

      // Get existing touches for this user
      const { data: touches } = await supabase
        .from("notification_touches")
        .select("touch_number, sent_at")
        .eq("user_id", userId)
        .order("touch_number", { ascending: true });

      const touchesSent = touches?.length || 0;

      // All 3 sent — done forever
      if (touchesSent >= 3) continue;

      // Check if user has been active since last touch
      const lastActivity = getLatest(state.last_completed_at, state.last_seen_at);

      // Determine which touch to send
      const nextTouchNumber = touchesSent + 1;
      const touchDef = TOUCHES[nextTouchNumber - 1];

      // Calculate reference time:
      // Touch 1: since last_completed_at (first session)
      // Touch 2+: since last touch sent_at
      let referenceTime: string;
      if (nextTouchNumber === 1) {
        referenceTime = state.last_completed_at;
      } else {
        const lastTouch = touches?.[touches.length - 1];
        if (!lastTouch) continue;
        referenceTime = lastTouch.sent_at;
      }

      const hoursSinceReference = hoursSince(referenceTime);
      const hoursSinceActivity = hoursSince(lastActivity);

      // Only send if:
      // 1. Within the send window
      // 2. User has been INACTIVE (not seen since reference time)
      if (
        hoursSinceReference >= touchDef.minHours &&
        hoursSinceReference <= touchDef.maxHours &&
        hoursSinceActivity >= touchDef.minHours
      ) {
        // Send to all subscriptions for this user
        for (const sub of subs) {
          try {
            await webpush.sendNotification(
              {
                endpoint: sub.endpoint,
                keys: { p256dh: sub.p256dh, auth: sub.auth },
              },
              JSON.stringify({ message: touchDef.message })
            );
          } catch (pushError: any) {
            // Remove expired subscriptions
            if (pushError?.statusCode === 410 || pushError?.statusCode === 404) {
              await supabase
                .from("push_subscriptions")
                .delete()
                .eq("endpoint", sub.endpoint);
            }
          }
        }

        // Record the touch
        await supabase.from("notification_touches").insert({
          user_id: userId,
          touch_number: touchDef.number,
          message: touchDef.message,
        });

        sent++;
      }
    } catch {
      // Skip this user, continue with others
    }
  }

  return NextResponse.json({ sent });
}

function hoursSince(isoString: string): number {
  return (Date.now() - new Date(isoString).getTime()) / (1000 * 60 * 60);
}

function getLatest(...dates: (string | null)[]): string {
  const valid = dates.filter(Boolean) as string[];
  return valid.reduce((a, b) => (new Date(a) > new Date(b) ? a : b));
}
