"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "./FadeIn";
import styles from "./screens.module.css";

export function AlreadyDoneScreen() {
  const [dim, setDim] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDim(true), 5000);
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

      <FadeIn delay={1.0}>
        <p className={styles.doneLine}>You'll see it again.</p>
      </FadeIn>
    </motion.div>
  );
}
