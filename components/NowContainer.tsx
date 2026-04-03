"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EntryScreen } from "./EntryScreen";
import { ResponseScreen } from "./ResponseScreen";
import { ActionScreen } from "./ActionScreen";
import { CloseScreen } from "./CloseScreen";
import { DoneScreen } from "./DoneScreen";
import { AlreadyDoneScreen } from "./AlreadyDoneScreen";
import {
  getOrCreateUserId,
  getTodaySession,
  completeSession,
  type TodaySession,
} from "@/lib/sessions";
import styles from "./NowContainer.module.css";

// ─────────────────────────────────────────────
// STATE MACHINE
// ─────────────────────────────────────────────

enum Step {
  LOADING = -1,
  ENTRY = 0,
  RESPONSE = 1,
  ACTION = 2,
  CLOSE = 3,
  DONE = 4,
  ALREADY_DONE = 5,
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
// MAIN CONTAINER
// ─────────────────────────────────────────────

export function NowContainer() {
  const [step, setStep] = useState(Step.LOADING);
  const [session, setSession] = useState<TodaySession | null>(null);
  const [timeLabel, setTimeLabel] = useState("");

  const sessionStart = useRef<number>(0);
  const userId = useRef<string>("");

  // Initialize: load user state and today's content
  useEffect(() => {
    userId.current = getOrCreateUserId();

    const h = new Date().getHours();
    if (h < 12) setTimeLabel("morning");
    else if (h < 17) setTimeLabel("afternoon");
    else if (h < 21) setTimeLabel("evening");
    else setTimeLabel("night");

    if (userId.current) {
      getTodaySession(userId.current).then((todaySession) => {
        setSession(todaySession);
        if (todaySession.alreadyCompletedToday) {
          setStep(Step.ALREADY_DONE);
        } else {
          setStep(Step.ENTRY);
        }
      });
    }
  }, []);

  const handleBegin = useCallback(() => {
    sessionStart.current = Date.now();
    setStep(Step.RESPONSE);
  }, []);

  const advance = useCallback(() => {
    setStep((prev) => {
      const next = prev + 1;

      // Record session when reaching DONE
      if (next === Step.DONE && session) {
        const duration = Date.now() - sessionStart.current;
        completeSession(
          userId.current,
          session.sequenceId,
          session.day,
          duration
        );
      }

      return next;
    });
  }, [session]);

  if (!session || step === Step.LOADING) {
    return (
      <div className={styles.container}>
        <div className={styles.grain} />
        <div className={styles.content} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Grain texture */}
      <div className={styles.grain} />

      {/* Top bar */}
      <div className={styles.topBar}>
        <span className={styles.timeLabel}>{timeLabel}</span>
      </div>

      {/* Content area */}
      <div className={styles.content}>
        <ScreenTransition stepKey={step}>
          {step === Step.ENTRY && (
            <EntryScreen
              entryLine={session.content.entry}
              day={session.day}
              onBegin={handleBegin}
            />
          )}
          {step === Step.RESPONSE && (
            <ResponseScreen
              text={session.content.response}
              onContinue={advance}
            />
          )}
          {step === Step.ACTION && (
            <ActionScreen
              text={session.content.action}
              onContinue={advance}
            />
          )}
          {step === Step.CLOSE && (
            <CloseScreen
              text={session.content.close}
              onContinue={advance}
            />
          )}
          {step === Step.DONE && (
            <DoneScreen isLastDay={session.isLastDay} />
          )}
          {step === Step.ALREADY_DONE && <AlreadyDoneScreen />}
        </ScreenTransition>
      </div>

      {/* Bottom line */}
      <div className={styles.bottomLine} />
    </div>
  );
}
