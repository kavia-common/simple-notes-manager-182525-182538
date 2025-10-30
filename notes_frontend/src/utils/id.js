/**
 * Simple ID generator using timestamp and random segment.
 */
// PUBLIC_INTERFACE
export function createId() {
  const rand = Math.random().toString(36).slice(2, 8);
  return `n_${Date.now().toString(36)}_${rand}`;
}
