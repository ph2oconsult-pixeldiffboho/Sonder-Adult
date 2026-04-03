// ─────────────────────────────────────────────
// SONDER ADULT — SEQUENCED CONTENT (PRODUCTION)
// ─────────────────────────────────────────────
// 10 sequences × 7 days = 70 days of content
// Ordered by launch priority (1–3 ship first)
// All lines red-teamed and revised
// Content is NOT random. Day order matters.

export interface DayContent {
  entry: string;
  response: string;
  action: string;
  close: string;
}

export interface Sequence {
  id: string;
  pattern: string;
  days: [DayContent, DayContent, DayContent, DayContent, DayContent, DayContent, DayContent];
}

export const SEQUENCES: Sequence[] = [

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 1. OVERTHINKING (Launch sequence #1)
  // Cleanest arc, most universally relatable
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "overthinking",
    pattern: "The loop that feels like progress",
    days: [
      {
        entry: "What thought showed up more than once today?",
        response: "You've visited it before. And you'll visit it again. That's worth noticing.",
        action: "Just mark it. The same thought, again.",
        close: "Leave it mid-sentence.",
      },
      {
        entry: "Did it come back?",
        response: "It always does. That's not the problem. The problem is you think this time will resolve it.",
        action: "Count the revisits. Don't judge them. Just count.",
        close: "That number is the information.",
      },
      {
        entry: "What are you actually trying to solve?",
        response: "Not the thing on the surface. Something underneath it that you haven't named.",
        action: "Name the feeling behind the thought. One word.",
        close: "That's closer.",
      },
      {
        entry: "Has the thinking changed anything yet?",
        response: "Same calculation. Same result. But you ran it again anyway.",
        action: "Notice what it feels like to not think about it. Even for five seconds.",
        close: "That gap is real.",
      },
      {
        entry: "What are you avoiding by staying in the loop?",
        response: "Thinking is the safest thing you can do. That's why you can't stop.",
        action: "Feel what's underneath the need to figure it out.",
        close: "That's the uncomfortable part.",
      },
      {
        entry: "What would happen if you trusted your first answer?",
        response: "You had it before the loop started. Everything since has been negotiation.",
        action: "Say it. The answer you keep overriding.",
        close: "That was always it.",
      },
      {
        entry: "The loop is quieter today.",
        response: "Not because you solved it. Because you stopped pretending you needed to.",
        action: "Let the unresolved stay unresolved.",
        close: "Done.",
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 2. AVOIDANCE (Launch sequence #2)
  // Broadest appeal, strong "I've been seen" moment
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "avoidance",
    pattern: "The thing you won't look at",
    days: [
      {
        entry: "What's sitting at the edge of your attention?",
        response: "You already glanced at it. Then looked away.",
        action: "Notice where your eyes just went. That direction matters.",
        close: "That's enough for now.",
      },
      {
        entry: "Is it still at the edge?",
        response: "It didn't move. You did.",
        action: "Notice how much energy it takes to keep it peripheral.",
        close: "You can leave it there.",
      },
      {
        entry: "How many times have you redirected yourself today?",
        response: "Every redirection is a decision. You just stopped noticing you're making it.",
        action: "Catch the next redirect. Don't stop it. Just see it.",
        close: "That's the pattern.",
      },
      {
        entry: "What's the story you tell yourself about why now isn't the time?",
        response: "The story is always convincing. That's what makes it work.",
        action: "Hear the story without believing it. Just once.",
        close: "Stay with that.",
      },
      {
        entry: "What does this avoidance protect you from?",
        response: "You've got a good reason not to look. You always do.",
        action: "Feel who you'd need to become. That's the real cost.",
        close: "Harder than it looks.",
      },
      {
        entry: "What if the avoidance is heavier than the thing?",
        response: "You keep choosing 'not yet.' But 'not yet' has a cost too, and you've stopped counting.",
        action: "Hold both for a moment. Notice which one you already know.",
        close: "Now you've felt it.",
      },
      {
        entry: "Look at it directly. What's there?",
        response: "It's real. But so are you. And you've been acting like only one of those was true.",
        action: "Let it be its actual size.",
        close: "You can go.",
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 3. UNFINISHED DECISIONS (Launch sequence #3)
  // The differentiator — no other app does this
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "decisions",
    pattern: "The thing you keep almost doing",
    days: [
      {
        entry: "What have you been meaning to decide?",
        response: "It surfaced again just now. It does that. Usually at the edges of busier thoughts.",
        action: "Notice how long this decision has been waiting.",
        close: "That's enough for now.",
      },
      {
        entry: "Is it still undecided?",
        response: "Not because you lack information. You've had enough information for a while now.",
        action: "Notice what you tell yourself about why you're still waiting.",
        close: "You can leave it there.",
      },
      {
        entry: "How many times have you almost decided?",
        response: "You've gotten close. Then pulled back. Each time with a slightly different reason but the same result.",
        action: "Feel the pull-back. Not the reason. The sensation of retreating.",
        close: "That retreat is the pattern.",
      },
      {
        entry: "What are you calling 'not ready'?",
        response: "You keep raising the bar for 'ready.' That's not preparation.",
        action: "Ask yourself: ready for what, specifically? Notice if the answer keeps shifting.",
        close: "A moving target can't be hit. That's the design.",
      },
      {
        entry: "What happens to you — not around you — if you decide?",
        response: "Something becomes real. Something else becomes impossible. And you'd have to live with both.",
        action: "Feel the weight of one door closing. Not the option. The closing.",
        close: "That's what you've been avoiding.",
      },
      {
        entry: "Who are you without this decision hanging over you?",
        response: "You've carried it so long you've forgotten what you'd think about without it.",
        action: "Imagine the decision made. Feel the silence where the deliberation used to be.",
        close: "That silence is real.",
      },
      {
        entry: "You already know what you'd choose.",
        response: "You've known for a while. The rest has been ceremony.",
        action: "Let the knowing be there. You don't have to act on it today. Just stop pretending you don't have it.",
        close: "You can go.",
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 4. INTERNAL CONFLICT
  // Emotionally sophisticated, strong Day 6
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "conflict",
    pattern: "The argument you're having with yourself",
    days: [
      {
        entry: "What are you torn about right now?",
        response: "There are two answers living in you. Both feel true. That's why it won't settle.",
        action: "Notice both sides. Don't pick one. Just feel them both at the same time.",
        close: "That's enough.",
      },
      {
        entry: "Is the argument still running?",
        response: "You've been switching sides. Sometimes mid-sentence. Sometimes mid-thought.",
        action: "Notice which side spoke first today. Before you edited.",
        close: "That one is worth remembering.",
      },
      {
        entry: "How long have these two been fighting?",
        response: "Longer than this situation. This is an old disagreement wearing a new costume.",
        action: "Feel the familiarity. You've been here with different specifics but the same tension.",
        close: "That's the pattern.",
      },
      {
        entry: "What does each side want you to protect?",
        response: "Each side is protecting something. You haven't asked what.",
        action: "Name what each side is guarding. Not arguing for. Guarding.",
        close: "Now you see the stakes.",
      },
      {
        entry: "What if both sides are right?",
        response: "The conflict doesn't come from one side being wrong. It comes from you believing you can only honour one.",
        action: "Hold both for a moment. Don't call it anything.",
        close: "Stay with that.",
      },
      {
        entry: "What are you afraid of losing in the resolution?",
        response: "Not the option you don't pick. The part of you that wanted it. That part doesn't just disappear.",
        action: "Feel the grief of the unlived version. It's already there.",
        close: "That grief is the cost. Not the decision.",
      },
      {
        entry: "The argument is quieter today.",
        response: "Not because you resolved it. Because you stopped needing it to be resolved before you could move.",
        action: "Let the tension exist. Walk with it instead of against it.",
        close: "Done.",
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 5. CONTROL
  // Strong premise, precise Days 2–3
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "control",
    pattern: "The grip that won't open",
    days: [
      {
        entry: "What did you try to manage before it even started?",
        response: "You had a plan before your feet hit the floor.",
        action: "Notice the plan. Not whether it's good. Just that it was there before anything happened.",
        close: "That's enough.",
      },
      {
        entry: "What happened when something went off-script today?",
        response: "Not what happened externally. What happened in you.",
        action: "Notice the speed of the internal response. How fast the correction impulse fired.",
        close: "Leave it there.",
      },
      {
        entry: "How many outcomes did you rehearse before lunch?",
        response: "You've been running simulations. Most of them for things that will never happen.",
        action: "Pick one simulation. Notice that it hasn't happened yet.",
        close: "That was never real.",
      },
      {
        entry: "Who taught you that unplanned meant unsafe?",
        response: "Someone did. Or something. And the grip has been there ever since.",
        action: "Feel the grip without explaining it.",
        close: "Stay with that.",
      },
      {
        entry: "What are you protecting yourself from feeling?",
        response: "Something that would happen to you, not because of you. That's the part you can't stand.",
        action: "Let yourself not know what happens next. Just for a moment.",
        close: "You're still here.",
      },
      {
        entry: "Has the control actually prevented what you're afraid of?",
        response: "It gave you something to do. That's not nothing. But it's not what you think it is either.",
        action: "Notice the difference between prepared and braced.",
        close: "One of them is exhausting.",
      },
      {
        entry: "What if you opened your hands?",
        response: "Not as a decision. Just to see what stays without being held.",
        action: "Unclench one thing. Hands. Jaw. A plan. Any of it.",
        close: "Done.",
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 6. DISTRACTION
  // Unique angle, strong "exit" thread
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "distraction",
    pattern: "The exit you don't remember taking",
    days: [
      {
        entry: "Where did the last hour go?",
        response: "You left. Not physically. But you checked out and you're not sure when.",
        action: "Notice what you reached for. Phone. Task. Food. Scroll. Just name the exit.",
        close: "That's enough.",
      },
      {
        entry: "Did you leave again today?",
        response: "Same pattern. Different excuse. You barely noticed the switch.",
        action: "Notice how smooth the departure was. No friction. No decision. Just gone.",
        close: "That smoothness is the problem.",
      },
      {
        entry: "What were you feeling right before you checked out?",
        response: "There was something there. Boredom, restlessness, a low hum of something you didn't want to sit with.",
        action: "Name what was there before the exit. One word.",
        close: "That word is what you keep leaving.",
      },
      {
        entry: "How many times did you exit today without choosing to?",
        response: "You lost count because most of them didn't feel like decisions. That's how embedded this is.",
        action: "Catch one exit in real time today. You won't stop it. Just see it happen.",
        close: "Seeing it is the whole point.",
      },
      {
        entry: "What are you protecting yourself from by staying distracted?",
        response: "Not danger. Presence. Being here, in this, without an escape route.",
        action: "Feel what it's like to have nowhere to go. Even for five seconds.",
        close: "That's what you keep avoiding.",
      },
      {
        entry: "What would your day look like if you didn't leave?",
        response: "Slower. Quieter. The kind of day you keep escaping from.",
        action: "Notice the resistance to that image. The part that says 'that sounds boring.'",
        close: "Notice what that word does to you.",
      },
      {
        entry: "You're still here.",
        response: "Not because you forced it. Because there's less to run from when you've seen the exits.",
        action: "Let yourself be here. No performance. No plan to stay.",
        close: "Done.",
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 7. EMOTIONAL REACTION
  // Important pattern, handle with care
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "reaction",
    pattern: "The speed before the thought",
    days: [
      {
        entry: "What hit you today before you had time to think?",
        response: "Something moved in you before you had a name for it.",
        action: "Notice where it landed. Chest. Throat. Stomach. Just locate it.",
        close: "That's enough.",
      },
      {
        entry: "Did something land the same way today?",
        response: "Same speed. Same place. You recognised the shape before you recognised the cause.",
        action: "Notice that you already knew the feeling before you knew the trigger.",
        close: "Leave it there.",
      },
      {
        entry: "How old is this reaction?",
        response: "Older than today. Older than this week. This reaction was built somewhere you've stopped visiting.",
        action: "Feel the age of it. Don't explain it. Just feel how long it's been loaded.",
        close: "That's the pattern.",
      },
      {
        entry: "What did you do right after it hit?",
        response: "You reacted. Said something, shut down, or performed calm. All of those are the same thing — managing the flash instead of feeling it.",
        action: "Recall the moment right after. What did you reach for?",
        close: "That reach is automatic.",
      },
      {
        entry: "What if the reaction isn't about what just happened?",
        response: "The situation is today. The reaction is older. You've felt this mismatch before.",
        action: "Feel the mismatch between the size of the trigger and the size of the reaction.",
        close: "That gap is the information.",
      },
      {
        entry: "What would happen if you didn't react at the usual speed?",
        response: "There's a moment between the flash and the response. You usually skip it.",
        action: "Imagine the flash arriving. Now imagine not moving. Feel what lives in that pause.",
        close: "That's the part you've never stayed for.",
      },
      {
        entry: "The flash came today. What did you notice?",
        response: "It's still fast. But you saw it arrive this time. That changes everything and nothing at the same time.",
        action: "Let the reaction and the awareness exist together.",
        close: "You can go.",
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 8. COMPARISON
  // Familiar territory but well-executed
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "comparison",
    pattern: "The mirror that isn't yours",
    days: [
      {
        entry: "Who made you feel behind today?",
        response: "You measured yourself against someone. Before you even noticed you were doing it.",
        action: "Just name them. Silently. That's all.",
        close: "That's enough.",
      },
      {
        entry: "Did you check again?",
        response: "The comparison happened faster this time. It's getting automatic.",
        action: "Notice the impulse before you follow it. There's a gap there.",
        close: "Leave it in the gap.",
      },
      {
        entry: "What exactly are you comparing?",
        response: "Not their life. Your idea of their life. Built from fragments you chose to assemble.",
        action: "Notice what you filled in. The parts you invented.",
        close: "That was never real.",
      },
      {
        entry: "What do you skip about yourself when you compare?",
        response: "Everything that doesn't support what you've already decided about yourself.",
        action: "Name one thing you dismissed about yourself today.",
        close: "It still counts.",
      },
      {
        entry: "What do you actually want? Not what they have.",
        response: "You had to think about it. That pause is telling you something.",
        action: "Sit with not knowing. That's more honest than the comparison.",
        close: "Stay there.",
      },
      {
        entry: "If they disappeared, would the feeling go away?",
        response: "No. They just gave it a shape. The feeling was already there.",
        action: "Feel what's underneath the comparison. Before you give it a name.",
        close: "Now you've felt it.",
      },
      {
        entry: "Look at your own life. Without the mirror.",
        response: "It's not behind. It's not ahead. It's just yours. And you keep forgetting that.",
        action: "Let that be the only thing for a moment.",
        close: "You can go.",
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 9. SEEKING APPROVAL
  // Smallest margin of error — handle carefully
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "approval",
    pattern: "The audience that isn't there",
    days: [
      {
        entry: "Who were you thinking about when you made your last decision?",
        response: "Not what. Who. There was a face.",
        action: "Notice the face. Don't change it. Just see who showed up.",
        close: "You can put that down.",
      },
      {
        entry: "Did you check how it landed?",
        response: "You already scanned for a reaction. Approval, disappointment, something.",
        action: "Notice how fast that scan was. Before you even decided to look.",
        close: "That speed is the information.",
      },
      {
        entry: "What did you adjust today before anyone asked you to?",
        response: "You edited yourself. The words, the tone, the version of you that showed up.",
        action: "Recall the edit. What did the original look like?",
        close: "That one was more honest.",
      },
      {
        entry: "What version of yourself did you perform today?",
        response: "There's who you were in the room. And who you were after you left it.",
        action: "Notice which one knew more.",
        close: "That gap matters.",
      },
      {
        entry: "Whose rules are you following?",
        response: "Some of those rules aren't yours. You just never checked.",
        action: "Pick one rule you live by. Ask: did I choose this?",
        close: "Now you've seen it.",
      },
      {
        entry: "What would you want if no one had an opinion about it?",
        response: "You hesitated. That hesitation is the whole thing.",
        action: "Let the want exist without a justification.",
        close: "It doesn't need permission.",
      },
      {
        entry: "Who are you when you stop performing?",
        response: "Less impressive. More honest. You already know which one matters.",
        action: "Let that version sit here for a moment.",
        close: "You can go.",
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 10. UNCERTAINTY
  // Strong concept, needed most revision
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "uncertainty",
    pattern: "The ground that isn't there",
    days: [
      {
        entry: "What don't you know right now that you wish you did?",
        response: "There's something you don't know. And it's been humming in the background all day.",
        action: "Stop ignoring it. Just for a second. Feel the hum.",
        close: "That's enough.",
      },
      {
        entry: "Is the not-knowing louder or quieter today?",
        response: "It shifts. But it hasn't left. You've just gotten better at layering noise over it.",
        action: "Notice what you layered on top today. Busyness. Plans. Opinions. Just see the layers.",
        close: "Leave them there.",
      },
      {
        entry: "What do you do when you don't know?",
        response: "You filled the gap with activity. Research, plans, opinions. The gap is still there.",
        action: "Feel the urge to fix the not-knowing. Don't follow it. Just feel it pull.",
        close: "That pull is the pattern.",
      },
      {
        entry: "When did certainty become the requirement?",
        response: "At some point you decided that not knowing meant not safe. And you've been chasing solid ground in a world that doesn't offer it.",
        action: "Notice what certainty you clung to today. Ask: is that solid, or am I gripping?",
        close: "Gripping feels like holding. It isn't.",
      },
      {
        entry: "What if you're not supposed to know yet?",
        response: "That sentence made something in you resist. That resistance is more interesting than the answer.",
        action: "Sit with the resistance. Not the uncertainty. The resistance to the uncertainty.",
        close: "There's a difference.",
      },
      {
        entry: "What would you do today if certainty wasn't coming?",
        response: "You'd have to move without knowing where the ground is. Notice what part of you just clenched.",
        action: "Feel what it would be like to step forward without knowing the ground is there.",
        close: "You've done it before. You just didn't call it that.",
      },
      {
        entry: "The ground isn't there. You're still standing.",
        response: "Not because you found certainty. Because you stopped requiring it.",
        action: "Let the not-knowing be here. Not as a problem. As the actual condition.",
        close: "You can go.",
      },
    ],
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
