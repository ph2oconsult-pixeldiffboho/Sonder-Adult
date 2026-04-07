"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "./FadeIn";
import styles from "./screens.module.css";

export function DoneScreen() {
  const [dim, setDim] = useState(false);

  useEffect(() => {
    // Start dimming 7 seconds after mount
    // (dot at 0.3s, text at 1.3s, wordmark at 3.5s — all visible by ~5.5s)
    const t = setTimeout(() => setDim(true), 7000);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      className={styles.screenWrap}
      animate={{ opacity: dim ? 0 : 1 }}
      transition={{ duration: 8, ease: "easeInOut" }}
    >
      <FadeIn delay={0.3}>
        <div className={styles.doneDot} />
      </FadeIn>

      <FadeIn delay={1.3} duration={1.8}>
        <p className={styles.doneLine}>You'll see it again.</p>
      </FadeIn>

      <FadeIn delay={3.5} duration={2.0}>
        <p className={styles.wordmark}>sonder</p>
      </FadeIn>
    </motion.div>
  );
}
