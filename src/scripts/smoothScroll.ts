import Lenis from 'lenis';

const isMobile = window.innerWidth < 768;

const lenis = new Lenis({
  duration: isMobile ? 1.1 : 1.8,
  easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
  smoothWheel: !isMobile,
  smoothTouch: false,
  wheelMultiplier: 0.7,
  lerp: 0.08
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

export default lenis;
