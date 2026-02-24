"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type SectionRevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export default function SectionReveal({ children, delay = 0, className }: SectionRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
