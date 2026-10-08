"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface RevealTextProps {
  text: string;
  highlightText?: string;
  className?: string;
  highlightClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

export default function RevealText({
  text,
  highlightText,
  className = "",
  highlightClassName = "text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-fuchsia-500",
  delay = 0,
  as = "div",
}: RevealTextProps) {
  const primaryWords = text.trim().split(/\s+/).filter(Boolean);
  const highlightWords = highlightText ? highlightText.trim().split(/\s+/).filter(Boolean) : [];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (customDelay: number) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: customDelay,
      },
    }),
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 16,
      scale: 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const Tag = as;

  return (
    <Tag className={className}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        custom={delay}
        className="inline-block"
      >
        {primaryWords.map((word, i) => (
          <motion.span
            key={`word-${i}`}
            variants={wordVariants}
            className="inline-block mr-[0.28em] last:mr-0"
          >
            {word}
          </motion.span>
        ))}

        {highlightWords.length > 0 && (
          <span className={highlightClassName}>
            {highlightWords.map((word, i) => (
              <motion.span
                key={`hw-${i}`}
                variants={wordVariants}
                className="inline-block mr-[0.28em] last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </span>
        )}
      </motion.span>
    </Tag>
  );
}
