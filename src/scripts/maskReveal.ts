import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import lenis from './smoothScroll';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Integrate ScrollTrigger with Lenis smooth scroll if it exists
if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        // Critical Mobile Fix: Only call raf if lenis is active
        if ((window as any).lenis) {
            (window as any).lenis.raf(time * 1000);
        }
    });
}

gsap.ticker.lagSmoothing(0);

// Initialize mask reveal animation
function initMaskReveal() {
    // Select all elements with .reveal-text class
    const revealElements = gsap.utils.toArray('.reveal-text');

    revealElements.forEach((element: any) => {
        gsap.fromTo(
            element,
            {
                y: '100%', // Start position: fully hidden below
            },
            {
                y: '0%', // End position: fully visible
                duration: 1.2,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: element.closest('.mask') || element, // Use mask parent or element itself
                    start: 'top 80%', // Animation starts when top of element reaches 80% of viewport
                    toggleActions: 'play none none none', // Play once, no repeat on scroll back
                    // markers: true, // Uncomment for debugging
                },
            }
        );
    });

    // Handle stagger effect for multiple elements within same container
    const revealContainers = gsap.utils.toArray('.mask-container');

    revealContainers.forEach((container: any) => {
        const children = container.querySelectorAll('.reveal-text');

        if (children.length > 1) {
            gsap.fromTo(
                children,
                {
                    y: '100%',
                },
                {
                    y: '0%',
                    duration: 1.2,
                    ease: 'power4.out',
                    stagger: 0.1, // 0.1s delay between each element
                    scrollTrigger: {
                        trigger: container,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                        // markers: true, // Uncomment for debugging
                    },
                }
            );
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMaskReveal);
} else {
    initMaskReveal();
}

export default initMaskReveal;
