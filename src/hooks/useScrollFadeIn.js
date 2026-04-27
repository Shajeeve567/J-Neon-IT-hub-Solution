import { useEffect } from 'react';

export default function useScrollFadeIn() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(el => {
                    if (el.isIntersecting) {
                        el.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.12 }
        );
        const observeTargets = () => {
            const targets = document.querySelectorAll('.fade-in:not(.visible)');
            targets.forEach(t => observer.observe(t));
        };

        observeTargets();

        const mutationObserver = new MutationObserver(() => {
            observeTargets();
        });

        mutationObserver.observe(document.body, { childList: true, subtree: true });

        return () => {
            mutationObserver.disconnect();
            observer.disconnect();
        };
    }, []);
}
