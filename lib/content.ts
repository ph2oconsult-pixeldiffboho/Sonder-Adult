// ─────────────────────────────────────────────
// CONTENT LIBRARIES
// ─────────────────────────────────────────────
// Tier 1: default pool (sessions 1–5)
// Tier 2: sharper pool (sessions 6+ with repeated category)
// The system silently escalates tone when patterns emerge.

export type Category = "avoiding" | "overthinking" | "nothing";

interface CategoryContent {
  responses: { tier1: string[]; tier2: string[] };
  actions: { tier1: string[]; tier2: string[] };
}

export const CONTENT: Record<Category, CategoryContent> = {
  avoiding: {
    responses: {
      tier1: [
        "That usually matters more than it looks.",
        "You already know what this is about.",
        "The weight is the signal.",
        "Avoidance has a shape. You can feel it.",
        "It's still there when you look away.",
        "The resistance is information.",
        "What you won't face runs the day.",
        "It doesn't get smaller by ignoring it.",
      ],
      tier2: [
        "You're not confused. You're unwilling.",
        "You know exactly what it is.",
        "That thing you're stepping around — it's the thing.",
        "Avoidance is also a decision.",
        "You're spending more energy avoiding it than it would take.",
        "There's a reason you looked away.",
        "Something in you already decided. You just haven't admitted it.",
        "How long have you been circling this one?",
      ],
    },
    actions: {
      tier1: [
        "Name it silently. Just the word.",
        "Don't solve it. Just let it be there.",
        "Feel where it sits in your body.",
        "Stay with it for three seconds.",
        "Let it exist without your opinion.",
      ],
      tier2: [
        "Say what you'd do if you weren't afraid.",
        "Notice what happens when you stop running.",
        "Feel the cost of not doing it.",
        "Hold still for a moment.",
        "Let the discomfort be there.",
      ],
    },
  },
  overthinking: {
    responses: {
      tier1: [
        "You've been here before.",
        "Thinking isn't moving this.",
        "Another lap won't change the view.",
        "You're not solving. You're circling.",
        "The answer isn't in the loop.",
        "More analysis won't make it safe.",
        "Certainty isn't coming. You know that.",
        "The mind is busy. You don't have to be.",
      ],
      tier2: [
        "This isn't productive. It's compulsive.",
        "You're rehearsing, not preparing.",
        "The loop is the problem, not the content.",
        "Your mind wants resolution. It won't get it this way.",
        "Every repetition feels like progress. It isn't.",
        "You're confusing movement with motion.",
        "You already know. The thinking is avoidance.",
        "What if you trusted the first answer?",
      ],
    },
    actions: {
      tier1: [
        "Stop mid-thought. Just stop.",
        "Notice the loop without finishing it.",
        "Let the thought be incomplete.",
        "Put it down. You can pick it up later.",
        "One breath. Let the thought dissolve.",
      ],
      tier2: [
        "Feel your hands. Come back.",
        "Let it be unresolved for now.",
        "Drop the rope.",
        "Notice: you're thinking about thinking.",
        "Let the silence answer instead.",
      ],
    },
  },
  nothing: {
    responses: {
      tier1: [
        "There's something quieter underneath.",
        "Then stay with that.",
        "Nothing is also something.",
        "'Nothing' is rarely nothing.",
        "That blankness has texture if you look.",
        "The absence of noise is its own signal.",
        "Stillness isn't emptiness.",
        "You noticed enough to be here.",
      ],
      tier2: [
        "That's interesting. Stay a moment.",
        "Sometimes clarity looks like nothing.",
        "The quiet has weight too.",
        "You're more aware than you think.",
        "Neutral is a feeling. Notice it.",
        "There's a difference between nothing and not looking.",
        "What if this is the most honest moment today?",
        "The emptiness is telling you something.",
      ],
    },
    actions: {
      tier1: [
        "Stay here for a second longer.",
        "Notice what's underneath the nothing.",
        "Don't search. Just wait.",
        "Let the stillness be enough.",
        "Listen to what's not being said.",
      ],
      tier2: [
        "Feel the space around you.",
        "Stay empty. It's fine.",
        "Be with this. No action needed.",
        "Just exist for a moment.",
        "Let nothing be the answer.",
      ],
    },
  },
};

export const CLOSINGS = [
  "That's enough.",
  "You can leave it there.",
  "Continue your day.",
  "You saw it. That's the work.",
  "Nothing else is needed.",
  "Back to your life.",
  "Done.",
  "That was it.",
  "You're already moving on.",
  "Leave it. Go.",
];

export const ENTRY_PROMPTS = [
  "What's pulling your attention?",
  "What's sitting with you right now?",
  "Where is your mind?",
  "What won't leave you alone?",
  "What's taking up space?",
];

// ─────────────────────────────────────────────
// SELECTION LOGIC
// ─────────────────────────────────────────────

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Select content based on session history.
 * If a category has been chosen 5+ times, escalate to tier2.
 */
export function selectContent(
  category: Category,
  categoryCounts: Record<Category, number>
) {
  const count = categoryCounts[category] || 0;
  const tier = count >= 5 ? "tier2" : "tier1";
  const data = CONTENT[category];

  return {
    response: pick(data.responses[tier]),
    action: pick(data.actions[tier]),
    closing: pick(CLOSINGS),
  };
}

export function selectEntryPrompt(): string {
  return pick(ENTRY_PROMPTS);
}
