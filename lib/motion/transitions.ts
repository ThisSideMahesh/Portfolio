export const transitions = {
  default: {
    type: 'spring',
    stiffness: 300,
    damping: 30
  },
  smooth: {
    type: 'tween',
    ease: [0.16, 1, 0.3, 1], // easeOutCubic
    duration: 0.4
  },
  hover: {
    type: 'spring',
    stiffness: 400,
    damping: 15
  }
};
