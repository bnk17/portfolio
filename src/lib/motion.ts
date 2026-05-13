import type { Variants, Transition } from "framer-motion";

// Base transitions
export const spring: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export const snappy: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 35,
};

export const easeOut: Transition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.2,
};

// Staggered entry — per ui_ux_polish.md §3
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

// Fade + slide up entry with blur — per ui_ux_polish.md §3
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { ...spring },
  },
};

// Subtle exit — faster, less distance — per ui_ux_polish.md §3
export const fadeOut: Variants = {
  exit: {
    opacity: 0,
    y: -6,
    filter: "blur(2px)",
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

// Page transition wrapper
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 12, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { ...spring },
  },
  exit: {
    opacity: 0,
    y: -6,
    filter: "blur(2px)",
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

// Icon toggle (scale + opacity) — per ui_ux_polish.md §3
export const iconToggle: Variants = {
  idle: { scale: 1, opacity: 1 },
  active: {
    scale: [1, 0.8, 1.15, 1],
    opacity: [1, 0.6, 1],
    transition: { duration: 0.3 },
  },
};
