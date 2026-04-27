import pointingMan from '../assets/hero-pointing.png'
import float1 from '../assets/floating-1.png'
import float2 from '../assets/floating-2.png'
import webBg from '../assets/web1.png'

export default function Hero() {
    return (
        <section className="hero" id="hero">
            <div className="hero__bg-glow" aria-hidden="true" />

            {/* Decorative graphics based on Figma design */}
            <div className="hero__graphics" aria-hidden="true">
                <img src={webBg} alt="" className="hero__web-bg" />
                <img src={float1} alt="" className="hero__float1" />
                <img src={float2} alt="" className="hero__float2" />
                <img src={pointingMan} alt="Hero illustration" className="hero__main-img" />
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
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
            </div>
        </section>
    )
}

