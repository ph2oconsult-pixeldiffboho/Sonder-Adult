"use client";

import { FadeIn } from "./FadeIn";
import styles from "./screens.module.css";

interface ResponseScreenProps {
  text: string;
  onContinue: () => void;
}

export function ResponseScreen({ text, onContinue }: ResponseScreenProps) {
  return (
    <div className={styles.screenWrap} onClick={onContinue}>
      <FadeIn delay={0.3}>
        <p className={styles.responseLine}>{text}</p>
      </FadeIn>

      <FadeIn delay={1.8}>
        <p className={styles.tapHint}>tap</p>
      </FadeIn>
    </div>
  );
}
