import Lenis from 'lenis';

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

// OPTIONAL: Disable Lenis on mobile for native scroll performance if desired
if (isMobile) {
  (window as any).lenis = null;
}

const lenis = !isMobile ? new Lenis({
  autoRaf: false,
  lerp: 0.1,
  duration: 1.2,
  smoothWheel: true,
  wheelMultiplier: 1,
}) : null;

// Expose lenis on window for other scripts to access safely
(window as any).lenis = lenis;

// Note: We do NOT use requestAnimationFrame here anymore.
// The RAF loop is handled by gsap.ticker in maskReveal.ts to keep them in sync.

export default lenis;
