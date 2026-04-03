"use client";

import { FadeIn } from "./FadeIn";
import styles from "./screens.module.css";

interface ActionScreenProps {
  text: string;
  onContinue: () => void;
}

export function ActionScreen({ text, onContinue }: ActionScreenProps) {
  return (
    <div className={styles.screenWrap} onClick={onContinue}>
      <FadeIn delay={0.3}>
        <p className={styles.actionLine}>{text}</p>
      </FadeIn>

      <FadeIn delay={2.4}>
        <p className={styles.tapHint}>tap</p>
      </FadeIn>
    </div>
  );
}
