"use client";

import { FadeIn } from "./FadeIn";
import styles from "./screens.module.css";

interface EntryScreenProps {
  entryLine: string;
  day: number;
  onBegin: () => void;
}

export function EntryScreen({ entryLine, day, onBegin }: EntryScreenProps) {
  return (
    <div className={styles.screenWrap} onClick={onBegin}>
      <FadeIn delay={0.2}>
        <p className={styles.dayLabel}>day {day}</p>
      </FadeIn>

      <FadeIn delay={0.7}>
        <p className={styles.entryLine}>{entryLine}</p>
      </FadeIn>

      <FadeIn delay={1.6}>
        <p className={styles.tapHint}>tap</p>
      </FadeIn>
    </div>
  );
}
