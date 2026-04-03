# Sonder (Adult)

A minimal awareness system. Not self-help. Not journaling. Not meditation.

One interaction. Under 30 seconds. Interrupts autopilot.

---

## What it does

Four steps:

1. **Now** — "What's pulling your attention?" → pick one of three
2. **Reflection** — One sharp line reflected back
3. **Micro-action** — One instruction, under 10 seconds
4. **Close** — Done

That's it.

---

## Architecture

```
app/
  layout.tsx          Root layout, meta, global CSS
  page.tsx            Mounts NowContainer

components/
  NowContainer.tsx    State machine (5 steps), session tracking
  EntryScreen.tsx     "Now" prompt + 3 tap options
  ResponseScreen.tsx  Single reflection line
  ActionScreen.tsx    Single micro-action
  CloseScreen.tsx     Clean exit
  DoneScreen.tsx      Dot + "again"
  FadeIn.tsx          Framer Motion fade wrapper
  *.module.css        Co-located styles

lib/
  content.ts          All prompts, responses, actions, closings (tier 1 + tier 2)
  sessions.ts         Anonymous user ID, Supabase session recording, pattern retrieval
  supabase.ts         Supabase client singleton

supabase/
  schema.sql          Run in Supabase SQL Editor to create tables
```

### Pattern Recognition

Content has two tiers:
- **Tier 1** (sessions 1–5 per category): gentler reflections
- **Tier 2** (session 6+ per category): sharper, more confronting

The system silently escalates when it detects repeated patterns. No UI indication. The language just gets more precise.

---

## Setup

### 1. Clone and install

```bash
git clone <your-repo>
cd sonder-adult
npm install
```

### 2. Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/schema.sql`
3. Go to **Settings → API** and copy your project URL and anon key
4. Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Deploy to Vercel

```bash
npx vercel
```

Add the two environment variables in Vercel dashboard → Settings → Environment Variables.

---

## Design Principles

- No long text
- No journaling
- No progress tracking
- No gamification
- No "journey" language
- No "self-improvement" tone
- Calm, not motivational
- Precise, not abstract
- Intelligent, not clinical
- Never sounds like a coach, therapist, or guru

---

## Content Stats

| Category     | Tier 1 Responses | Tier 2 Responses | Tier 1 Actions | Tier 2 Actions |
|-------------|-----------------|-----------------|----------------|----------------|
| Avoiding    | 8               | 8               | 5              | 5              |
| Overthinking| 8               | 8               | 5              | 5              |
| Nothing     | 8               | 8               | 5              | 5              |

Plus 5 entry prompts and 10 closing messages.

**Total unique combinations**: 5 × 3 × 16 × 10 × 10 = **24,000**

---

## License

Private. All rights reserved.
