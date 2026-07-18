export const MotionUtils = {
  springs: {
    default: { type: 'spring', stiffness: 300, damping: 30 },
    gentle: { type: 'spring', stiffness: 120, damping: 14 },
    stiff: { type: 'spring', stiffness: 500, damping: 25 }
  },
  timings: {
    instant: 0,
    fast: 0.15,
    normal: 0.3,
    slow: 0.5
  },
  curves: {
    easeOut: [0.16, 1, 0.3, 1], // Apple-like easeOut
    easeInOut: [0.25, 0.1, 0.25, 1]
  }
};
