document.addEventListener('DOMContentLoaded', () => {
    // Registra ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Trova tutti i wrapper animati
    const animatedWrappers = document.querySelectorAll('.gsap-split-animated-wrapper');

    animatedWrappers.forEach(wrapper => {
        // Leggi attributi
        const splitType = wrapper.dataset.splitType || 'chars';
        const animationType = wrapper.dataset.animationType || 'fadeUp';
        const duration = parseFloat(wrapper.dataset.duration) || 0.8;
        const stagger = parseFloat(wrapper.dataset.stagger) || 0.03;
        const delay = parseFloat(wrapper.dataset.delay) || 0;
        const useScroll = wrapper.dataset.useScroll === 'true';
        const triggerStart = wrapper.dataset.triggerStart || 'top 80%';

        // Trova elementi da animare all'interno del wrapper
        const elements = wrapper.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li');

        // Definisci animazioni in base al tipo
        const animations = {
            fadeUp: {
                from: { opacity: 0, y: 10 },
                to: { opacity: 1, y: 0 },
                ease: 'power2.out'
            },
            fadeIn: {
                from: { opacity: 0 },
                to: { opacity: 1 },
                ease: 'power2.out'
            },
            slideRight: {
                from: { opacity: 0, x: -50 },
                to: { opacity: 1, x: 0 },
                ease: 'power2.out'
            },
            slideLeft: {
                from: { opacity: 0, x: 50 },
                to: { opacity: 1, x: 0 },
                ease: 'power2.out'
            },
            scaleUp: {
                from: { opacity: 0, scale: 0.5 },
                to: { opacity: 1, scale: 1 },
                ease: 'power2.out'
            },
            rotateIn: {
                from: { opacity: 0, rotation: -45, transformOrigin: 'left center' },
                to: { opacity: 1, rotation: 0, transformOrigin: 'left center' },
                ease: 'power2.out'
            },
            // nuove animazioni
            blurIn: {
                from: { opacity: 0, filter: 'blur(8px)' },
                to: { opacity: 1, filter: 'blur(0px)' },
                ease: 'power2.out'
            },
            flipY: {
                from: { opacity: 0, rotationY: -90, transformOrigin: 'left center' },
                to: { opacity: 1, rotationY: 0, transformOrigin: 'left center' },
                ease: 'power2.out'
            },
            skewUp: {
                from: { opacity: 0, y: 20, skewY: 10 },
                to: { opacity: 1, y: 0, skewY: 0 },
                ease: 'power2.out'
            },
            bounceUp: {
                from: { opacity: 0, y: 60 },
                to: { opacity: 1, y: 0 },
                ease: 'bounce.out'
            }
        };

        const anim = animations[animationType] || animations.fadeUp;

        elements.forEach(element => {
            // Applica split text
            const split = new SplitType(element, {
                types: splitType,
                tagName: 'span'
            });

            // Ottieni gli elementi da animare in base al tipo di split
            let animateElements = [];

            if (splitType.includes('chars') && split.chars) {
                animateElements = animateElements.concat(split.chars);
            }

            if (splitType.includes('words') && split.words) {
                animateElements = animateElements.concat(split.words);
            }

            if (splitType.includes('lines') && split.lines) {
                animateElements = animateElements.concat(split.lines);
            }

            // fallback nel caso di typo sullo splitType
            if (animateElements.length === 0) {
                if (split.chars) {
                    animateElements = split.chars;
                } else if (split.words) {
                    animateElements = split.words;
                } else if (split.lines) {
                    animateElements = split.lines;
                }
            }

            if (!animateElements || animateElements.length === 0) return;

            // Imposta stato iniziale
            gsap.set(animateElements, anim.from);

            // Crea animazione
            const timelineConfig = {
                delay: delay
            };

            if (useScroll) {
                timelineConfig.scrollTrigger = {
                    trigger: wrapper, // uso il wrapper come trigger per maggiore controllo
                    start: triggerStart,
                    toggleActions: 'play none none none'
                    // markers: true // Decommentare per debug
                };
            }

            const timeline = gsap.timeline(timelineConfig);

            timeline.to(animateElements, {
                ...anim.to,
                duration: duration,
                stagger: stagger,
                ease: anim.ease || 'power2.out'
            });
        });

        // Quando tutto è stato processato, rendo il wrapper "ready" per evitare FOUC
        wrapper.classList.add('gsap-split-ready');
    });

    // Aggiorna ScrollTrigger quando le immagini si caricano
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });
});
