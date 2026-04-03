"use client";

import { FadeIn } from "./FadeIn";
import styles from "./screens.module.css";

interface DoneScreenProps {
  isLastDay: boolean;
}

export function DoneScreen({ isLastDay }: DoneScreenProps) {
  return (
    <div className={styles.screenWrap}>
      <FadeIn delay={0.3}>
        <div className={styles.doneDot} />
      </FadeIn>

      {isLastDay && (
        <FadeIn delay={1.5}>
          <p className={styles.sequenceEnd}>Something new begins tomorrow.</p>
        </FadeIn>
      )}
    </div>
  );
}
