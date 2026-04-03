"use client";

import { FadeIn } from "./FadeIn";
import type { Category } from "@/lib/content";
import styles from "./screens.module.css";

interface EntryScreenProps {
  prompt: string;
  onSelect: (category: Category) => void;
}

export function EntryScreen({ prompt, onSelect }: EntryScreenProps) {
  return (
    <div className={styles.screenWrap}>
      <FadeIn delay={0.2}>
        <h1 className={styles.now}>Now</h1>
      </FadeIn>

      <FadeIn delay={0.6}>
        <p className={styles.prompt}>{prompt}</p>
      </FadeIn>

      <div className={styles.options}>
        <FadeIn delay={0.9}>
          <button
            className={styles.option}
            onClick={() => onSelect("avoiding")}
          >
            <span className={styles.optionDot}>·</span>
            Something I'm avoiding
          </button>
        </FadeIn>

        <FadeIn delay={1.05}>
          <button
            className={styles.option}
            onClick={() => onSelect("overthinking")}
          >
            <span className={styles.optionDot}>·</span>
            Something I can't stop thinking about
          </button>
        </FadeIn>

        <FadeIn delay={1.2}>
          <button
            className={styles.option}
            onClick={() => onSelect("nothing")}
          >
            <span className={styles.optionDot}>·</span>
            Nothing obvious
          </button>
        </FadeIn>
      </div>
    </div>
  );
}
