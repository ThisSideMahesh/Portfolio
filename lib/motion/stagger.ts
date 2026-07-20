export function getStaggerDelay(index: number, baseDelay = 0.04, maxStagger = 0.4): number {
  return Math.min(index * baseDelay, maxStagger);
}
