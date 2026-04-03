import { supabase } from "./supabase";
import type { Category } from "./content";

// ─────────────────────────────────────────────
// ANONYMOUS USER ID
// ─────────────────────────────────────────────
// No auth required. We generate a random ID on first visit
// and store it in localStorage. This is the only identifier.

const STORAGE_KEY = "sonder_uid";

export function getOrCreateUserId(): string {
  if (typeof window === "undefined") return "";
  let uid = localStorage.getItem(STORAGE_KEY);
  if (!uid) {
    uid = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, uid);
  }
  return uid;
}

// ─────────────────────────────────────────────
// SESSION RECORDING
// ─────────────────────────────────────────────

export interface SessionRecord {
  user_id: string;
  category: Category;
  response_shown: string;
  action_shown: string;
  closing_shown: string;
  duration_ms: number;
  created_at?: string;
}

export async function recordSession(session: SessionRecord): Promise<void> {
  try {
    const { error } = await supabase.from("sessions").insert([session]);
    if (error) console.error("Session record failed:", error.message);
  } catch (e) {
    // Fail silently — the app works without persistence
    console.error("Session record failed:", e);
  }
}

// ─────────────────────────────────────────────
// PATTERN RETRIEVAL
// ─────────────────────────────────────────────

export interface CategoryCounts {
  avoiding: number;
  overthinking: number;
  nothing: number;
}

export async function getCategoryCounts(
  userId: string
): Promise<CategoryCounts> {
  const defaults: CategoryCounts = { avoiding: 0, overthinking: 0, nothing: 0 };

  try {
    const { data, error } = await supabase
      .from("sessions")
      .select("category")
      .eq("user_id", userId);

    if (error || !data) return defaults;

    const counts = { ...defaults };
    data.forEach((row: { category: Category }) => {
      if (counts[row.category] !== undefined) {
        counts[row.category]++;
      }
    });
    return counts;
  } catch {
    return defaults;
  }
}

export async function getTotalSessions(userId: string): Promise<number> {
  try {
    const { count, error } = await supabase
      .from("sessions")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    if (error) return 0;
    return count || 0;
  } catch {
    return 0;
  }
}
