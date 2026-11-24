/**
 * Safe mobile Web Vibration API trigger for tactile physical feedback on touch devices
 */
export function triggerHaptic(intensity: 'light' | 'medium' | 'success' = 'light'): void {
  if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
    try {
      if (intensity === 'light') {
        navigator.vibrate(10);
      } else if (intensity === 'medium') {
        navigator.vibrate(22);
      } else if (intensity === 'success') {
        navigator.vibrate([12, 40, 12]);
      }
    } catch {
      // Ignore vibration errors if blocked by browser policy
    }
  }
}
