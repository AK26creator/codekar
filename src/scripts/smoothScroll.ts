import Lenis from 'lenis';

const isMobile = window.innerWidth < 768;

const lenis = new Lenis({
  autoRaf: false,
  lerp: 0.1, // Smoothness (lower means smoother, 0.1 is standard)
  duration: 1.2,
  smoothWheel: true,
  wheelMultiplier: 1, // Reset to 1 for natural speed
});

// Expose lenis on window for other scripts to access safely
(window as any).lenis = lenis;

// Note: We do NOT use requestAnimationFrame here anymore.
// The RAF loop is handled by gsap.ticker in maskReveal.ts to keep them in sync.

export default lenis;
