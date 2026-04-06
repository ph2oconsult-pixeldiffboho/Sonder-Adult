"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EntryScreen } from "./EntryScreen";
import { ResponseScreen } from "./ResponseScreen";
import { MomentScreen } from "./MomentScreen";
import { CloseScreen } from "./CloseScreen";
import { DoneScreen } from "./DoneScreen";
import { AlreadyDoneScreen } from "./AlreadyDoneScreen";
import { TransitionScreen } from "./TransitionScreen";
import { FirstEntryScreen } from "./FirstEntryScreen";
import { SeenLayer } from "./SeenLayer";
import { SendScreen } from "./SendScreen";
import { FadeIn } from "./FadeIn";
import {
  getOrCreateUserId,
  getUserView,
  getUserState,
  completeSession,
  acceptTransition,
  type UserView,
  type TodaySession,
} from "@/lib/sessions";
import type { Transition } from "@/lib/content";
import { installDebugHelper } from "@/lib/debug";
import { registerPush } from "@/lib/push";
import styles from "./NowContainer.module.css";
import screenStyles from "./screens.module.css";

// ─────────────────────────────────────────────
// STATE MACHINE
// ─────────────────────────────────────────────

enum Step {
  LOADING = -1,
  FIRST_ENTRY = -2,
  SILENCE = -3,
  REANCHOR = -4,
  REANCHOR_SILENCE = -5,
  ENTRY = 0,
  RESPONSE = 1,
  ACTION = 2,
  CLOSE = 3,
  DONE = 4,
  SEND = 8,
  ALREADY_DONE = 5,
  TRANSITION = 6,
  JOURNEY_COMPLETE = 7,
}

// ─────────────────────────────────────────────
// PAGE TRANSITION
// ─────────────────────────────────────────────

function ScreenTransition({
  stepKey,
  children,
}: {
  stepKey: number;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={styles.transitionWrap}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────
// SILENCE (400ms black screen between first entry and response)
// ─────────────────────────────────────────────

function SilenceScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 400);
    return () => clearTimeout(t);
  }, [onComplete]);

  return <div />;
}

// ─────────────────────────────────────────────
// REANCHOR (gap return — single line then silence to entry)
// ─────────────────────────────────────────────

function ReanchorScreen({ line, onComplete }: { line: string; onComplete: () => void }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 2500);
    return () => clearTimeout(t);
  }, []);

  const handleTap = useCallback(() => {
    if (ready) onComplete();
  }, [ready, onComplete]);

  return (
    <div className={screenStyles.screenWrap} onClick={handleTap}>
      <FadeIn delay={0.6} duration={1.0}>
        <p className={screenStyles.reanchorLine}>{line}</p>
      </FadeIn>
      {ready && (
        <FadeIn delay={0}>
          <div className={screenStyles.breathDot} />
        </FadeIn>
      )}
    </div>
  );
}

function ReanchorSilence({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 700);
    return () => clearTimeout(t);
  }, [onComplete]);

  return <div />;
}

// ─────────────────────────────────────────────
// MAIN CONTAINER
// ─────────────────────────────────────────────

export function NowContainer() {
  const [step, setStep] = useState(Step.LOADING);
  const [session, setSession] = useState<TodaySession | null>(null);
  const [transition, setTransition] = useState<Transition | null>(null);
  const [isFirstSession, setIsFirstSession] = useState(false);
  const [reanchorLine, setReanchorLine] = useState("");
  const [showSeen, setShowSeen] = useState(false);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const sessionStart = useRef<number>(0);
  const userId = useRef<string>("");
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressActive = useRef(false);

  // Initialize
  useEffect(() => {
    userId.current = getOrCreateUserId();

    if (userId.current) {
      installDebugHelper(userId.current);
      // Load state first, then route — avoids completedIds race condition
      Promise.all([
        getUserView(userId.current),
        getUserState(userId.current),
      ]).then(([view, state]) => {
        setCompletedIds(state.sequences_completed || []);
        routeView(view, state.sequences_completed || []);
      });
    }
  }, []);

  // Long press handlers for Seen layer
  const handlePointerDown = useCallback(() => {
    longPressActive.current = false;
    longPressTimer.current = setTimeout(() => {
      if (completedIds.length > 0) {
        longPressActive.current = true;
        setShowSeen(true);
      }
    }, 600);
  }, [completedIds]);

  const handlePointerUp = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  // Prevent click from firing after long press
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (longPressActive.current) {
      e.stopPropagation();
      longPressActive.current = false;
    }
  }, []);

  function routeView(view: UserView, completed?: string[]) {
    const ids = completed ?? completedIds;
    switch (view.type) {
      case "first_entry":
        setSession(view.session);
        setIsFirstSession(true);
        setStep(Step.FIRST_ENTRY);
        break;
      case "reanchor":
        setSession(view.session);
        setReanchorLine(view.line);
        setStep(Step.REANCHOR);
        break;
      case "session":
        setSession(view.session);
        setStep(Step.ENTRY);
        break;
      case "transition":
        setTransition(view.transition);
        // Show send screen once — after first sequence completion
        if (
          typeof window !== "undefined" &&
          !localStorage.getItem("sonder_send_shown") &&
          ids.length <= 1
        ) {
          localStorage.setItem("sonder_send_shown", "1");
          setStep(Step.SEND);
        } else {
          setStep(Step.TRANSITION);
        }
        break;
      case "already_done":
        setStep(Step.ALREADY_DONE);
        break;
      case "journey_complete":
        setStep(Step.JOURNEY_COMPLETE);
        break;
    }
  }

  const handleBegin = useCallback(() => {
    sessionStart.current = Date.now();
    setStep(Step.RESPONSE);
  }, []);

  // First entry complete — hold in silence before response arrives
  const handleFirstEntryComplete = useCallback(() => {
    sessionStart.current = Date.now();
    setStep(Step.SILENCE);
  }, []);

  const advance = useCallback(() => {
    setStep((prev) => {
      const next = prev + 1;

      if (next === Step.DONE && session) {
        const duration = Date.now() - sessionStart.current;
        completeSession(
          userId.current,
          session.sequenceId,
          session.day,
          duration
        );
        // Request push permission after first session
        if (session.day === 1 && isFirstSession) {
          registerPush(userId.current);
        }
      }

      return next;
    });
  }, [session]);

  // Transition: user chose "Begin"
  const handleTransitionBegin = useCallback(async () => {
    await acceptTransition(userId.current);
    // Reload view — will now show Day 1 of next sequence
    const view = await getUserView(userId.current);
    routeView(view);
  }, []);

  // Loading
  if (step === Step.LOADING) {
    return (
      <div className={styles.container}>
        <div className={styles.grain} />
        <div className={styles.content} />
      </div>
    );
  }

  return (
    <div
      className={styles.container}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClickCapture={handleClick}
    >
      <div className={styles.grain} />

      <AnimatePresence>
        {showSeen && (
          <SeenLayer
            completedSequenceIds={completedIds}
            onClose={() => setShowSeen(false)}
          />
        )}
      </AnimatePresence>

      <div className={styles.content}>
        <ScreenTransition stepKey={step}>
          {step === Step.FIRST_ENTRY && session && (
            <FirstEntryScreen
              entryLine={session.content.entry}
              onComplete={handleFirstEntryComplete}
            />
          )}
          {step === Step.SILENCE && <SilenceScreen onComplete={() => setStep(Step.RESPONSE)} />}
          {step === Step.REANCHOR && (
            <ReanchorScreen line={reanchorLine} onComplete={() => setStep(Step.REANCHOR_SILENCE)} />
          )}
          {step === Step.REANCHOR_SILENCE && <ReanchorSilence onComplete={() => setStep(Step.ENTRY)} />}
          {step === Step.ENTRY && session && (
            <EntryScreen
              anchor={session.content.anchor}
              entryLine={session.content.entry}
              onBegin={handleBegin}
            />
          )}
          {step === Step.RESPONSE && session && (
            <ResponseScreen
              text={session.content.response}
              onContinue={advance}
            />
          )}
          {step === Step.ACTION && session && (
            <MomentScreen
              text={session.content.moment}
              onContinue={advance}
            />
          )}
          {step === Step.CLOSE && session && (
            <CloseScreen
              text={session.content.close}
              onContinue={advance}
            />
          )}
          {step === Step.DONE && session && (
            <DoneScreen />
          )}
          {step === Step.SEND && (
            <SendScreen onComplete={() => setStep(Step.TRANSITION)} />
          )}
          {step === Step.ALREADY_DONE && <AlreadyDoneScreen />}
          {step === Step.TRANSITION && transition && (
            <TransitionScreen
              transition={transition}
              onBegin={handleTransitionBegin}
            />
          )}
          {step === Step.JOURNEY_COMPLETE && <AlreadyDoneScreen />}
        </ScreenTransition>
      </div>
    </div>
  );
}
