"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SEQUENCES } from "@/lib/content";
import styles from "./screens.module.css";

interface SeenLayerProps {
  completedSequenceIds: string[];
  onClose: () => void;
}

export function SeenLayer({ completedSequenceIds, onClose }: SeenLayerProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const completedSequences = SEQUENCES.filter((s) =>
    completedSequenceIds.includes(s.id)
  );

  const handleTap = useCallback(
    (id: string) => {
      if (expandedId === id) {
        setExpandedId(null);
      } else {
        setExpandedId(id);
      }
    },
    [expandedId]
  );

  if (completedSequences.length === 0) return null;

  return (
    <motion.div
      className={styles.seenOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClose}
    >
      <div
        className={styles.seenContent}
        onClick={(e) => e.stopPropagation()}
      >
        {completedSequences.map((seq) => (
          <div key={seq.id} onClick={() => handleTap(seq.id)}>
            <p className={styles.seenPattern}>{seq.pattern}</p>
            <AnimatePresence>
              {expandedId === seq.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className={styles.seenLine}>
                    {seq.days[0].entry}
                  </p>
                  <p className={styles.seenLine}>
                    {seq.days[6].close}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
