"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeIn } from "./FadeIn";
import styles from "./screens.module.css";

interface SendScreenProps {
  onComplete: () => void;
}

enum SStep {
  LINE1 = 0,
  LINE2 = 1,
  LINE3 = 2,
}

export function SendScreen({ onComplete }: SendScreenProps) {
  const [step, setStep] = useState(SStep.LINE1);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    const hold = step === SStep.LINE3 ? 2500 : 3000;
    const t = setTimeout(() => setReady(true), hold);
    return () => clearTimeout(t);
  }, [step]);

  const advance = useCallback(async () => {
    if (!ready) return;

    if (step < SStep.LINE3) {
      setStep((s) => s + 1);
    } else {
      // Open native share sheet with app link only
      if (navigator.share) {
        try {
          await navigator.share({
            url: window.location.origin,
          });
        } catch {
          // User cancelled share — that's fine
        }
      } else if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(window.location.origin);
        } catch {
          // Clipboard failed — continue
        }
      }
      onComplete();
    }
  }, [ready, step, onComplete]);

  const lines = [
    "It shows up.",
    "You've seen it.",
    "Someone else will too.",
  ];

  return (
    <div className={styles.screenWrap}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className={styles.sendInner}
          onClick={advance}
        >
          <FadeIn delay={0.6} duration={1.2}>
            <p className={styles.sendLine}>{lines[step]}</p>
          </FadeIn>

          {ready && (
            <FadeIn delay={0}>
              <div className={styles.breathDot} />
            </FadeIn>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
