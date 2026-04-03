"use client";

import { FadeIn } from "./FadeIn";
import styles from "./screens.module.css";

interface DoneScreenProps {
  onReset: () => void;
}

export function DoneScreen({ onReset }: DoneScreenProps) {
  return (
    <div className={styles.screenWrap}>
      <FadeIn delay={0.3}>
        <div className={styles.doneDot} />
      </FadeIn>

      <FadeIn delay={2.0}>
        <button className={styles.againBtn} onClick={onReset}>
          again
        </button>
      </FadeIn>
    </div>
  );
}
