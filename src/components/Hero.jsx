export default function Hero() {
    return (
        <section className="hero" id="hero">
            <div className="hero__bg-glow" aria-hidden="true" />

            {/* Decorative globe — SVG placeholder for the faint head/globe image */}
            <svg
                className="hero__globe"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <circle cx="200" cy="200" r="180" stroke="#2ebfa5" strokeWidth="1.5" />
                <circle cx="200" cy="200" r="130" stroke="#2ebfa5" strokeWidth="1" />
                <circle cx="200" cy="200" r="80" stroke="#2ebfa5" strokeWidth="0.8" />
                <ellipse cx="200" cy="200" rx="180" ry="70" stroke="#2ebfa5" strokeWidth="1" />
                <ellipse cx="200" cy="200" rx="180" ry="120" stroke="#2ebfa5" strokeWidth="0.7" />
                <line x1="20" y1="200" x2="380" y2="200" stroke="#2ebfa5" strokeWidth="1" />
                <line x1="200" y1="20" x2="200" y2="380" stroke="#2ebfa5" strokeWidth="1" />
                <line x1="60" y1="60" x2="340" y2="340" stroke="#2ebfa5" strokeWidth="0.5" />
                <line x1="340" y1="60" x2="60" y2="340" stroke="#2ebfa5" strokeWidth="0.5" />
                {/* J letter */}
                <text x="155" y="230" fontFamily="Paytone One, sans-serif" fontSize="100" fill="#2ebfa5" opacity="0.6">J</text>
            </svg>

            <div className="hero__content fade-in">
                <div className="hero__headline">
                    <div>YOUR</div>
                    <div>COMPLETE</div>
                    <div className="gradient-text">IT HUB</div>
                    <div>SOLUTION.</div>
                </div>

                <div className="hero__tagline">
                    <p>Enterprise-grade infrastructure. Forensic security protocols.</p>
                    <p>Future-proof your digital landscape.</p>
                </div>

                <div className="hero__cta-row">
                    <a href="#services" className="btn-outline">
                        Check Services
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}
