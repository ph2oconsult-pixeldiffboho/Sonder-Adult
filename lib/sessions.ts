import { getSupabase } from "./supabase";
import { SEQUENCES, getDayContent, type DayContent } from "./content";

// ─────────────────────────────────────────────
// ANONYMOUS USER ID
// ─────────────────────────────────────────────

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
// USER STATE
// ─────────────────────────────────────────────

export interface UserState {
  user_id: string;
  current_sequence: string;
  current_day: number; // 1–7
  sequence_started_at: string;
  last_completed_at: string | null;
  sequences_completed: string[]; // IDs of finished sequences
}

/**
 * Get or create the user's state.
 * New users are assigned their first sequence.
 */
export async function getUserState(userId: string): Promise<UserState> {
  try {
    const { data, error } = await getSupabase()
      .from("user_state")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (data && !error) return data as UserState;
  } catch {
    // No state yet — fall through to create
  }

  // New user: assign first sequence
  const newState: UserState = {
    user_id: userId,
    current_sequence: SEQUENCES[0].id,
    current_day: 1,
    sequence_started_at: new Date().toISOString(),
    last_completed_at: null,
    sequences_completed: [],
  };

  try {
    await getSupabase().from("user_state").insert([newState]);
  } catch (e) {
    console.error("Failed to create user state:", e);
  }

  return newState;
}

// ─────────────────────────────────────────────
// TODAY'S CONTENT
// ─────────────────────────────────────────────

export interface TodaySession {
  content: DayContent;
  sequenceId: string;
  day: number;
  isLastDay: boolean;
  alreadyCompletedToday: boolean;
}

/**
 * Get the content for today's session.
 * If the user already completed today, flag it (but still return content).
 */
export async function getTodaySession(userId: string): Promise<TodaySession> {
  const state = await getUserState(userId);

  // Check if already completed today
  const alreadyCompletedToday = state.last_completed_at
    ? isSameDay(new Date(state.last_completed_at), new Date())
    : false;

  const content = getDayContent(state.current_sequence, state.current_day);

  // Fallback if somehow content is null (shouldn't happen)
  const safeContent: DayContent = content || {
    entry: "What's here right now?",
    response: "You showed up. That's the thing.",
    action: "Stay for a moment.",
    close: "That's enough.",
  };

  return {
    content: safeContent,
    sequenceId: state.current_sequence,
    day: state.current_day,
    isLastDay: state.current_day === 7,
    alreadyCompletedToday,
  };
}

// ─────────────────────────────────────────────
// COMPLETE SESSION
// ─────────────────────────────────────────────

/**
 * Record a completed session and advance the user.
 * - If day < 7: advance to next day
 * - If day = 7: mark sequence complete, assign next sequence
 */
export async function completeSession(
  userId: string,
  sequenceId: string,
  day: number,
  durationMs: number
): Promise<void> {
  const now = new Date().toISOString();

  // 1. Record the session log
  try {
    await getSupabase().from("sessions").insert([
      {
        user_id: userId,
        sequence_id: sequenceId,
        day_number: day,
        duration_ms: durationMs,
        completed_at: now,
      },
    ]);
  } catch (e) {
    console.error("Session log failed:", e);
  }

  // 2. Advance user state
  try {
    if (day < 7) {
      // Advance to next day
      await getSupabase()
        .from("user_state")
        .update({
          current_day: day + 1,
          last_completed_at: now,
        })
        .eq("user_id", userId);
    } else {
      // Sequence complete — assign next
      const state = await getUserState(userId);
      const completed = [...(state.sequences_completed || []), sequenceId];
      const nextSequence = pickNextSequence(completed);

      await getSupabase()
        .from("user_state")
        .update({
          current_sequence: nextSequence,
          current_day: 1,
          sequence_started_at: now,
          last_completed_at: now,
          sequences_completed: completed,
        })
        .eq("user_id", userId);
    }
  } catch (e) {
    console.error("State advance failed:", e);
  }
}

// ─────────────────────────────────────────────
// SEQUENCE ASSIGNMENT
// ─────────────────────────────────────────────

/**
 * Pick the next sequence the user hasn't done yet.
 * If all are done, cycle back to the first.
 */
function pickNextSequence(completedIds: string[]): string {
  const allIds = SEQUENCES.map((s) => s.id);
  const unseen = allIds.filter((id) => !completedIds.includes(id));

  if (unseen.length > 0) {
    return unseen[0];
  }

  // All sequences completed — restart from beginning
  return allIds[0];
}

// ─────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
