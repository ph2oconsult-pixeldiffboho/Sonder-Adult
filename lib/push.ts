import { getSupabase } from "./supabase";

/**
 * Register service worker and subscribe to push notifications.
 * Call once after user completes their first session.
 * Fails silently — push is optional.
 */
export async function registerPush(userId: string): Promise<void> {
  if (typeof window === "undefined") return;
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;

  try {
    const registration = await navigator.serviceWorker.register("/sw.js");

    // Check if already subscribed
    const existing = await registration.pushManager.getSubscription();
    if (existing) return;

    // Request permission
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return;

    // Subscribe
    const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!vapidKey) return;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidKey),
    });

    // Store in Supabase
    const keys = subscription.toJSON().keys;
    if (!keys) return;

    await getSupabase().from("push_subscriptions").upsert(
      {
        user_id: userId,
        endpoint: subscription.endpoint,
        p256dh: keys.p256dh,
        auth: keys.auth,
      },
      { onConflict: "user_id,endpoint" }
    );
  } catch {
    // Push registration failed — not critical
  }
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
