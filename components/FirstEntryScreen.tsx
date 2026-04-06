"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeIn } from "./FadeIn";
import styles from "./screens.module.css";

interface FirstEntryScreenProps {
  entryLine: string;
  onComplete: () => void;
}

const GROUNDING = [
  "One pattern.",
  "Seven days.",
  "Less than a minute.",
];

enum FEStep {
  S0 = 0,
  S1 = 1,
  S2 = 2,
  S3 = 3,
  S4 = 4,
}

export function FirstEntryScreen({ entryLine, onComplete }: FirstEntryScreenProps) {
  const [step, setStep] = useState(FEStep.S0);
  const [ready, setReady] = useState(false);

  const screens = [...GROUNDING, "It's already happening.", entryLine];

  useEffect(() => {
    setReady(false);
    // First three screens auto-advance (grounding)
    // Last two wait for tap (engagement)
    if (step <= FEStep.S2) {
      const hold = step === FEStep.S0 ? 2500 : 2000;
      const t = setTimeout(() => {
        setStep((s) => s + 1);
      }, hold);
      return () => clearTimeout(t);
    } else {
      const hold = step === FEStep.S3 ? 3000 : 3500;
      const t = setTimeout(() => setReady(true), hold);
      return () => clearTimeout(t);
    }
  }, [step]);

  const advance = useCallback(() => {
    if (!ready) return;
    if (step < FEStep.S4) {
      setStep((s) => s + 1);
    } else {
      onComplete();
    }
  }, [ready, step, onComplete]);

  return (
    <div className={styles.screenWrap}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className={styles.firstEntryInner}
          onClick={advance}
        >
          <FadeIn delay={0.6} duration={1.2}>
            <p className={step <= FEStep.S2 ? styles.firstEntryGrounding : styles.firstEntryLine}>
              {screens[step]}
            </p>
          </FadeIn>

          {ready && step > FEStep.S2 && (
            <FadeIn delay={0}>
              <div className={styles.breathDot} />
            </FadeIn>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
