"use client";

import { FadeIn } from "./FadeIn";
import styles from "./screens.module.css";

interface CloseScreenProps {
  text: string;
  onContinue: () => void;
}

export function CloseScreen({ text, onContinue }: CloseScreenProps) {
  return (
    <div className={styles.screenWrap} onClick={onContinue}>
      <FadeIn delay={0.5}>
        <p className={styles.closeLine}>{text}</p>
      </FadeIn>

      <FadeIn delay={2.0}>
        <p className={styles.tapHint}>tap</p>
      </FadeIn>
    </div>
  );
}
