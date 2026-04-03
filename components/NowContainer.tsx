"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EntryScreen } from "./EntryScreen";
import { ResponseScreen } from "./ResponseScreen";
import { ActionScreen } from "./ActionScreen";
import { CloseScreen } from "./CloseScreen";
import { DoneScreen } from "./DoneScreen";
import {
  selectContent,
  selectEntryPrompt,
  type Category,
} from "@/lib/content";
import {
  getOrCreateUserId,
  getCategoryCounts,
  recordSession,
  type CategoryCounts,
} from "@/lib/sessions";
import styles from "./NowContainer.module.css";

// ─────────────────────────────────────────────
// STATE MACHINE
// ─────────────────────────────────────────────

enum Step {
  ENTRY = 0,
  RESPONSE = 1,
  ACTION = 2,
  CLOSE = 3,
  DONE = 4,
}

// ─────────────────────────────────────────────
// PAGE TRANSITION WRAPPER
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
  const [step, setStep] = useState(Step.ENTRY);
  const [category, setCategory] = useState<Category | null>(null);
  const [response, setResponse] = useState("");
  const [action, setAction] = useState("");
  const [closing, setClosing] = useState("");
  const [entryPrompt, setEntryPrompt] = useState("");
  const [timeLabel, setTimeLabel] = useState("");
  const [categoryCounts, setCategoryCounts] = useState<CategoryCounts>({
    avoiding: 0,
    overthinking: 0,
    nothing: 0,
  });

  const sessionStart = useRef<number>(0);
  const userId = useRef<string>("");

  // Initialize
  useEffect(() => {
    userId.current = getOrCreateUserId();
    setEntryPrompt(selectEntryPrompt());

    const h = new Date().getHours();
    if (h < 12) setTimeLabel("morning");
    else if (h < 17) setTimeLabel("afternoon");
    else if (h < 21) setTimeLabel("evening");
    else setTimeLabel("night");

    // Load category counts for pattern recognition
    if (userId.current) {
      getCategoryCounts(userId.current).then(setCategoryCounts);
    }
  }, []);

  const handleSelect = useCallback(
    (cat: Category) => {
      sessionStart.current = Date.now();
      const content = selectContent(cat, categoryCounts);
      setCategory(cat);
      setResponse(content.response);
      setAction(content.action);
      setClosing(content.closing);
      setStep(Step.RESPONSE);
    },
    [categoryCounts]
  );

  const advance = useCallback(() => {
    setStep((prev) => {
      const next = prev + 1;

      // Record session when reaching DONE
      if (next === Step.DONE && category) {
        const duration = Date.now() - sessionStart.current;
        recordSession({
          user_id: userId.current,
          category,
          response_shown: response,
          action_shown: action,
          closing_shown: closing,
          duration_ms: duration,
        });
        // Update local counts
        setCategoryCounts((prev) => ({
          ...prev,
          [category]: prev[category] + 1,
        }));
      }

      return next;
    });
  }, [category, response, action, closing]);

  const reset = useCallback(() => {
    setStep(Step.ENTRY);
    setCategory(null);
    setResponse("");
    setAction("");
    setClosing("");
    setEntryPrompt(selectEntryPrompt());
  }, []);

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
            <EntryScreen prompt={entryPrompt} onSelect={handleSelect} />
          )}
          {step === Step.RESPONSE && (
            <ResponseScreen text={response} onContinue={advance} />
          )}
          {step === Step.ACTION && (
            <ActionScreen text={action} onContinue={advance} />
          )}
          {step === Step.CLOSE && (
            <CloseScreen text={closing} onContinue={advance} />
          )}
          {step === Step.DONE && <DoneScreen onReset={reset} />}
        </ScreenTransition>
      </div>

      {/* Bottom line */}
      <div className={styles.bottomLine} />
    </div>
  );
}
