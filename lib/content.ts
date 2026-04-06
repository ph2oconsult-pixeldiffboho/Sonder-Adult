// ─────────────────────────────────────────────
// SONDER ADULT — PATTERN RECOGNITION CONTENT
// ─────────────────────────────────────────────
// 10 sequences × 7 days = 70 days
// Model: Notice → See Again → Recognition → Holding
// No instruction. No intervention. No improvement language.
// The user sees. That's the product.

export interface DayContent {
  anchor?: string; // Day 1 only — shown before entry line
  entry: string;
  response: string;
  moment: string;
  close: string;
  notification?: string;
}

export interface Transition {
  screen1: string;
  screen2: string;
  screen3: string;
  primaryCta: string;
  secondaryCta: string;
  notification: string;
}

export interface Sequence {
  id: string;
  pattern: string;
  days: [DayContent, DayContent, DayContent, DayContent, DayContent, DayContent, DayContent];
  transition?: Transition;
}

export const SEQUENCES: Sequence[] = [

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 1. OVERTHINKING
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "overthinking",
    pattern: "The loop that feels like progress",
    days: [
      {
        anchor: "It's been running.",
        entry: "What thought showed up more than once today?",
        response: "You've seen it before.",
        moment: "It stayed.",
        close: "It didn't end anywhere.",
        notification: "It circled back.",
      },
      {
        entry: "It came back.",
        response: "Same place it starts.",
        moment: "It ran again.",
        close: "Nothing settled.",
        notification: "Still running.",
      },
      {
        entry: "What are you trying to resolve?",
        response: "It hasn't moved.",
        moment: "It ran again.",
        close: "Same path.",
        notification: "It restarted.",
      },
      {
        entry: "You've been here before.",
        response: "This is the loop.",
        moment: "It starts the same way.",
        close: "It keeps going.",
        notification: "Same loop.",
      },
      {
        entry: "It started again.",
        response: "Same beginning. But it slowed earlier.",
        moment: "It didn't go as far this time.",
        close: "It ran shorter.",
        notification: "Same rhythm.",
      },
      {
        entry: "It tried again.",
        response: "It was already running.",
        moment: "It didn't build the same way.",
        close: "It didn't build as far.",
        notification: "It didn't complete.",
      },
      {
        entry: "It's still there.",
        response: "It's quieter. Not gone.",
        moment: "It's visible as it starts.",
        close: "It's still there.",
      },
    ],
    transition: {
      screen1: "The loop is still running. But you're watching it now.",
      screen2: "Something else has been at the edge. You've been looking past it.",
      screen3: "Seven days.",
      primaryCta: "Begin",
      secondaryCta: "Not today",
      notification: "The loop is visible now. Something else is at the edge.",
    },
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 2. AVOIDANCE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "avoidance",
    pattern: "The thing you won't look at",
    days: [
      {
        anchor: "You moved past something.",
        entry: "What did you move away from today?",
        response: "It was at the edge.",
        moment: "You passed it.",
        close: "It didn't follow.",
        notification: "It's at the edge again.",
      },
      {
        entry: "It was at the edge again.",
        response: "Same spot.",
        moment: "The path curved around it.",
        close: "Nothing changed.",
        notification: "Same spot.",
      },
      {
        entry: "How many times did you pass it?",
        response: "More than once.",
        moment: "The redirect happened again. Smooth.",
        close: "Same curve. Same speed.",
        notification: "Same curve.",
      },
      {
        entry: "You know the curve.",
        response: "You know this one.",
        moment: "It happens before you choose it.",
        close: "Same direction every time.",
        notification: "The story played again.",
      },
      {
        entry: "It showed up again.",
        response: "Same spot. But the curve was wider this time.",
        moment: "The redirect was slower.",
        close: "It took longer to pass.",
        notification: "Same shape underneath.",
      },
      {
        entry: "It was closer this time.",
        response: "The curve didn't go as far around it.",
        moment: "It lingered at the edge a moment longer.",
        close: "The distance was shorter.",
        notification: "The weight is there.",
      },
      {
        entry: "It's at the edge.",
        response: "The curve is still there. But it's smaller.",
        moment: "The thing and the curve. Both visible.",
        close: "The edge hasn't moved.",
      },
    ],
    transition: {
      screen1: "The thing is still there. So are you.",
      screen2: "Something keeps almost happening. It surfaces and sinks.",
      screen3: "Seven days.",
      primaryCta: "Begin",
      secondaryCta: "Not today",
      notification: "The avoidance is visible. Something else keeps surfacing.",
    },
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 3. DISTRACTION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "distraction",
    pattern: "The exit you don't remember taking",
    days: [
      {
        anchor: "You left for a moment.",
        entry: "Where did the last hour go?",
        response: "You left. Not physically.",
        moment: "You reached for something. Not clear what.",
        close: "You didn't decide to leave. You just left.",
        notification: "It left without deciding.",
      },
      {
        entry: "It happened again.",
        response: "Same door.",
        moment: "You were gone before you noticed.",
        close: "Nothing stayed.",
        notification: "It moved again. Smooth.",
      },
      {
        entry: "You left again without choosing to.",
        response: "Same exit. No choosing.",
        moment: "You were already gone.",
        close: "Same door.",
        notification: "Something was before the exit.",
      },
      {
        entry: "The exits kept happening.",
        response: "Most didn't feel like decisions.",
        moment: "No friction. You were just gone.",
        close: "It doesn't stop here.",
        notification: "No friction at all.",
      },
      {
        entry: "It happened again.",
        response: "Same exit. But it took a moment longer to start.",
        moment: "The leaving was slower this time.",
        close: "It didn't go as smoothly.",
        notification: "Same arc. Different door.",
      },
      {
        entry: "What's on the other side of staying?",
        response: "Something you keep leaving instead of meeting.",
        moment: "You stayed for a moment. It had a feeling.",
        close: "You don't usually stay long enough for it.",
        notification: "The staying had a feeling.",
      },
      {
        entry: "The exits are still there.",
        response: "Same arc. Same smoothness.",
        moment: "You can see them now. And the staying.",
        close: "The exits don't close.",
      },
    ],
    transition: {
      screen1: "The arc. The smoothness. The leaving. All visible.",
      screen2: "Something hits before you think. Fast. Familiar. It's been landing the same way for a while.",
      screen3: "Seven days.",
      primaryCta: "Begin",
      secondaryCta: "Not today",
      notification: "The exits are visible. Something else lands first.",
    },
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 4. INTERNAL CONFLICT
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "conflict",
    pattern: "The argument you're having with yourself",
    days: [
      {
        anchor: "It pulled both ways.",
        entry: "What were you pulled between today?",
        response: "Both sides were there.",
        moment: "It stayed.",
        close: "Nothing settled.",
        notification: "Both sides spoke today.",
      },
      {
        entry: "It came back again.",
        response: "Same tension.",
        moment: "It went back and forth.",
        close: "No decision.",
        notification: "It switched again.",
      },
      {
        entry: "It went back and forth again.",
        response: "Same two sides.",
        moment: "Both were held.",
        close: "Still open.",
        notification: "Old argument. New clothes.",
      },
      {
        entry: "You've been here before.",
        response: "This is the tension.",
        moment: "It pulls both ways.",
        close: "It doesn't resolve.",
        notification: "Both sides are guarding.",
      },
      {
        entry: "It showed up again.",
        response: "Same pull. But it didn't escalate as fast.",
        moment: "The back-and-forth was slower this time.",
        close: "It didn't build the same way.",
        notification: "It's visible from outside.",
      },
      {
        entry: "It came back.",
        response: "It stayed.",
        moment: "It wasn't forced.",
        close: "It didn't collapse.",
        notification: "Something would go quiet.",
      },
      {
        entry: "It's still there.",
        response: "Both sides remain.",
        moment: "It sat there.",
        close: "It holds without closing.",
      },
    ],
    transition: {
      screen1: "Both sides are visible now. The argument is still running.",
      screen2: "Your hands are tighter than you think. Something has been gripping.",
      screen3: "Seven days.",
      primaryCta: "Begin",
      secondaryCta: "Not today",
      notification: "The argument is visible. Something else is gripping.",
    },
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 5. COMPARISON
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "comparison",
    pattern: "The mirror that isn't yours",
    days: [
      {
        anchor: "You measured it.",
        entry: "Who made you feel behind today?",
        response: "The measuring was already running.",
        moment: "It started before the choosing.",
        close: "It was automatic.",
        notification: "The measuring ran again.",
      },
      {
        entry: "The check happened again.",
        response: "Same impulse. Faster this time.",
        moment: "Same person.",
        close: "Nothing shifted.",
        notification: "Faster this time.",
      },
      {
        entry: "The check ran again.",
        response: "Same person. Same result.",
        moment: "You built them up. You skipped yourself.",
        close: "Same sequence.",
        notification: "The gaps got filled.",
      },
      {
        entry: "What gets dismissed when you compare?",
        response: "Everything that doesn't support what you've already decided.",
        moment: "Same thing dismissed.",
        close: "The dismissal is automatic.",
        notification: "Same thing skipped.",
      },
      {
        entry: "It ran again.",
        response: "Same sequence. But it stalled partway through.",
        moment: "It didn't complete the same way.",
        close: "It broke earlier.",
        notification: "Same four moves.",
      },
      {
        entry: "If the person disappeared, the feeling wouldn't.",
        response: "They gave it a shape. The feeling was there before them.",
        moment: "Something was underneath. Before the person.",
        close: "The comparison gave it somewhere to go.",
        notification: "Something underneath.",
      },
      {
        entry: "The comparison is still there.",
        response: "The building up. The skipping. The feeling underneath.",
        moment: "The whole pattern is there.",
        close: "The measuring doesn't stop.",
      },
    ],
    transition: {
      screen1: "The structure. The feeling underneath. All visible.",
      screen2: "There's an audience in your head. You've been performing without knowing it.",
      screen3: "Seven days.",
      primaryCta: "Begin",
      secondaryCta: "Not today",
      notification: "The comparison is visible. There's an audience too.",
    },
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 6. EMOTIONAL REACTION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "reaction",
    pattern: "The speed before the thought",
    days: [
      {
        anchor: "It landed fast.",
        entry: "What hit you today before you had time to think?",
        response: "Something moved before you had a name for it.",
        moment: "It landed somewhere specific. Not the thought. The landing.",
        close: "It landed somewhere specific. It always does.",
        notification: "It landed again.",
      },
      {
        entry: "It landed again.",
        response: "Same place.",
        moment: "The body moved before the thinking started.",
        close: "Nothing slowed.",
        notification: "Same place in your body.",
      },
      {
        entry: "It landed the same way again.",
        response: "Same place. Same speed.",
        moment: "It arrived the same way. No variation.",
        close: "You know this one.",
        notification: "The arrival is old.",
      },
      {
        entry: "What happens right after it hits?",
        response: "Something fires. A response. Before you choose it.",
        moment: "The response was already happening. No gap.",
        close: "The response is faster than the choosing. It doesn't stop when this ends.",
        notification: "No gap.",
      },
      {
        entry: "It landed again.",
        response: "Same trigger. But the response was slightly delayed.",
        moment: "There was a gap that wasn't there before.",
        close: "It didn't fire as fast.",
        notification: "Same sequence.",
      },
      {
        entry: "There's a gap you usually skip.",
        response: "Between the landing and the response. Small. But there.",
        moment: "The gap held for a moment. Brief.",
        close: "It exists. It's usually too fast to feel.",
        notification: "The gap was there.",
      },
      {
        entry: "The reaction is still there.",
        response: "Same landing. Same speed. But the gap is visible.",
        moment: "The reaction is there. The gap is there. Both.",
        close: "The speed hasn't changed.",
      },
    ],
    transition: {
      screen1: "The landing. The sequence. The gap. All visible.",
      screen2: "There's someone you keep measuring yourself against. It happens before you notice.",
      screen3: "Seven days.",
      primaryCta: "Begin",
      secondaryCta: "Not today",
      notification: "The reaction is visible. Something else keeps measuring.",
    },
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 7. CONTROL
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "control",
    pattern: "The grip that won't open",
    days: [
      {
        anchor: "You were already holding it.",
        entry: "What did you manage before it started?",
        response: "There was already a plan.",
        moment: "The body was already tight. It felt like readiness.",
        close: "The holding was already there.",
        notification: "Already holding.",
      },
      {
        entry: "It fired again.",
        response: "Same speed. It felt useful.",
        moment: "The correction came first.",
        close: "Nothing loosened.",
        notification: "The correction was fast.",
      },
      {
        entry: "The rehearsal ran again. Same ones.",
        response: "Simulations for things that haven't happened.",
        moment: "The rehearsal was already running. It felt like preparation.",
        close: "Same rehearsal.",
        notification: "Same simulation.",
      },
      {
        entry: "The grip has been there a long time.",
        response: "It hasn't loosened. It doesn't feel like a grip.",
        moment: "The grip is there even when nothing is wrong.",
        close: "It has a resting state. It feels like being ready.",
        notification: "The grip has a resting state.",
      },
      {
        entry: "It fired again.",
        response: "Same correction. But it was slower to start.",
        moment: "The grip tightened later than usual.",
        close: "It didn't lock as fast.",
        notification: "The grip doesn't scale.",
      },
      {
        entry: "The control has a shape.",
        response: "Rehearsal. Correction. Rehearsal. Correction. Underneath everything.",
        moment: "From above it looks like a loop.",
        close: "Inside it feels like productivity.",
        notification: "The loop is visible.",
      },
      {
        entry: "The grip is still there.",
        response: "The rehearsal. The correction. The resting state.",
        moment: "It still feels useful. It's still a loop.",
        close: "The grip doesn't open.",
      },
    ],
    transition: {
      screen1: "The rehearsal. The correction. The loop. All visible.",
      screen2: "You've been leaving. Not physically. You check out and you're not sure when.",
      screen3: "Seven days.",
      primaryCta: "Begin",
      secondaryCta: "Not today",
      notification: "The grip is visible. Something keeps leaving.",
    },
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 8. SEEKING APPROVAL
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "approval",
    pattern: "The audience that isn't there",
    days: [
      {
        anchor: "Someone was there.",
        entry: "What tightened when you last spoke?",
        response: "Something braced before the words came.",
        moment: "The tightening was there before the speaking.",
        close: "It braced.",
        notification: "It tightened again.",
      },
      {
        entry: "It tightened again.",
        response: "Same place.",
        moment: "The bracing came before the room.",
        close: "Nothing loosened.",
        notification: "Same place.",
      },
      {
        entry: "It tightened the same way again.",
        response: "Same moment. Same place.",
        moment: "The tightening came before the face.",
        close: "Same bracing.",
        notification: "Same bracing.",
      },
      {
        entry: "The tightening has a shape.",
        response: "It braces. It holds. It releases after.",
        moment: "The holding runs through the whole room.",
        close: "Same shape every time.",
        notification: "Same shape.",
      },
      {
        entry: "It tightened again.",
        response: "Same place. But it held lighter.",
        moment: "The bracing was softer this time.",
        close: "It didn't grip as hard.",
        notification: "It held lighter.",
      },
      {
        entry: "What's underneath the tightening?",
        response: "Something that doesn't need the room to be safe.",
        moment: "The tightening was there. And something underneath it.",
        close: "The underneath doesn't brace.",
        notification: "Something underneath.",
      },
      {
        entry: "The tightening is still there.",
        response: "It braces. It holds. Both visible.",
        moment: "The tightening and the underneath. Both.",
        close: "The bracing doesn't stop.",
      },
    ],
    transition: {
      screen1: "The tightening is visible. The bracing. The holding. The releasing.",
      screen2: "There's something you don't know. You've been closing the space so you don't have to feel it.",
      screen3: "Seven days.",
      primaryCta: "Begin",
      secondaryCta: "Not today",
      notification: "The tightening is visible. Something else keeps closing.",
    },
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 9. UNFINISHED DECISIONS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "decisions",
    pattern: "The thing you keep almost doing",
    days: [
      {
        anchor: "Something almost happened.",
        entry: "What keeps almost surfacing?",
        response: "It rose for a moment.",
        moment: "It was there. Then it dropped.",
        close: "It dropped.",
        notification: "It rose again.",
      },
      {
        entry: "It rose again.",
        response: "Same weight.",
        moment: "It hovered. Then it dropped.",
        close: "Same drop.",
        notification: "Same drop.",
      },
      {
        entry: "It rose the same way again.",
        response: "Same weight. Same height.",
        moment: "The drop came at the same point.",
        close: "Same drop every time.",
        notification: "Same point.",
      },
      {
        entry: "The rising has a pattern.",
        response: "Rise. Hover. Drop. Rise. Hover. Drop.",
        moment: "The hover is where it stalls.",
        close: "The drop follows the hover.",
        notification: "Same pattern.",
      },
      {
        entry: "It rose again.",
        response: "Same weight. But it hovered longer.",
        moment: "The drop was slower this time.",
        close: "It didn't fall as fast.",
        notification: "It hovered longer.",
      },
      {
        entry: "What's in the hover?",
        response: "Something that doesn't need to land yet.",
        moment: "The hover was there. Just the hover.",
        close: "Not rising. Not dropping. Something else.",
        notification: "The hover was there.",
      },
      {
        entry: "It's still rising and dropping.",
        response: "The hover is still there. Between them.",
        moment: "The rise and the drop. Both visible.",
        close: "The hover stays.",
      },
    ],
    transition: {
      screen1: "The rising. The hovering. The dropping. All visible.",
      screen2: "There's something you don't know. You've been closing the space before you feel it.",
      screen3: "Seven days.",
      primaryCta: "Begin",
      secondaryCta: "Not today",
      notification: "The decision pattern is visible. Something else keeps closing.",
    },
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 10. UNCERTAINTY
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "uncertainty",
    pattern: "The ground that isn't there",
    days: [
      {
        anchor: "It's been there.",
        entry: "What don't you know right now?",
        response: "There's a gap.",
        moment: "It opened. Then it closed.",
        close: "The gap is there.",
        notification: "The gap is there.",
      },
      {
        entry: "The gap opened again.",
        response: "Same shape. It closed fast.",
        moment: "It was open for a moment. Then it wasn't.",
        close: "Nothing stayed open.",
        notification: "Same gap.",
      },
      {
        entry: "The gap opened again.",
        response: "Same place. Same speed.",
        moment: "It closed the same way as before.",
        close: "Same closing.",
        notification: "Same closing.",
      },
      {
        entry: "The gap keeps closing.",
        response: "Same speed every time.",
        moment: "It opens and closes before you feel it.",
        close: "The closing is automatic.",
        notification: "The closing is automatic.",
      },
      {
        entry: "The gap opened again.",
        response: "Same gap. But it stayed open a moment longer.",
        moment: "The closing was slower this time.",
        close: "It didn't close as fast.",
        notification: "Same rhythm.",
      },
      {
        entry: "What's in the gap when it's open?",
        response: "Something that doesn't have a name yet.",
        moment: "The gap was open. Just the gap.",
        close: "Not empty. Not full. Something else.",
        notification: "The gap was open.",
      },
      {
        entry: "The gap is still there.",
        response: "It opens. It closes. Both.",
        moment: "The gap and the seeing of the gap. Both.",
        close: "The gap stays.",
      },
    ],
    // No transition — last sequence
  },
];

// ─────────────────────────────────────────────
// CONTENT RETRIEVAL
// ─────────────────────────────────────────────

export function getSequence(id: string): Sequence | undefined {
  return SEQUENCES.find((s) => s.id === id);
}

export function getDayContent(sequenceId: string, day: number): DayContent | null {
  const seq = getSequence(sequenceId);
  if (!seq || day < 1 || day > 7) return null;
  return seq.days[day - 1];
}

export function getSequenceIds(): string[] {
  return SEQUENCES.map((s) => s.id);
}

export function getTransition(sequenceId: string): Transition | null {
  const seq = getSequence(sequenceId);
  return seq?.transition || null;
}
