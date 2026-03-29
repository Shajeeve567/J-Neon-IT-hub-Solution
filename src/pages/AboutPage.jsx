import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

const imgCeo = "http://localhost:3845/assets/78059306baf512b76c441d11a13d79452686de16.png"
const imgCto = "http://localhost:3845/assets/eba13ed5e06c6a80ea4e6df07691c7e943c9eb47.png"
const imgCoo = "http://localhost:3845/assets/335492fa8e12da0d169c9e44e4dada3f78facad2.png"

const timeline = [
    { year: '2015', title: 'Inception', desc: 'Founded in a small garage with a singular focus on high-performance server architecture.', side: 'left' },
    { year: '2018', title: 'Expansion', desc: 'Opened our first dedicated data center and expanded services to include full-stack cyber defense.', side: 'right' },
    { year: '2021', title: 'Global Reach', desc: 'Partnered with Fortune 500 companies across 3 continents, delivering enterprise cloud migrations.', side: 'left' },
    { year: 'NOW', title: 'The Innovation Hub', desc: 'Launching our AI-driven analytics division. Setting new standards for predictive IT maintenance.', side: 'right', current: true },
]

const leadership = [
    { 
        name: 'Anton Jaan Jenushan Miranda', 
        title: 'FOUNDER & CEO', 
        img: imgCeo, 
        desc: 'Visionary architect with 15+ years in high-scale infrastructure.' 
    }
]

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main className="page">
                {/* ── Hero ── */}
                <section className="about-hero">
                    <div className="about-hero__content">
                        <h1 className="about-hero__title">
                            FORCE <br />
                            <span>BEHIND THE TECH</span>
                        </h1>
                        <p className="about-hero__subtitle">
                            We are the architects of the digital future. Merging creative vision with
                            forensic precision to build infrastructure that endures.
                        </p>
                    </div>
                </section>

                {/* ── Mission & Vision ── */}
                <section className="about-mission">
                    <div className="about-mission__container">
                        {/* Mission */}
                        <div className="about-mission__col about-mission__col--right">
                            <div className="about-mission__label-row">
                                <div className="about-mission__line" />
                                <span className="about-mission__label">Our Mission</span>
                            </div>
                            <h3 className="about-mission__heading">Digital Mastery</h3>
                            <p className="about-mission__text">
                                To empower enterprises by dismantling complex technical barriers. We deploy robust, scalable
                                solutions that turn IT infrastructure from a cost center into a strategic weapon.
                            </p>
                        </div>

                        {/* Center logo visual */}
                        <div className="about-mission__center">
                            <div className="about-mission__orbit-outer" />
                            <div className="about-mission__orbit-inner" />
                            <div className="about-mission__logo-mark">J</div>
                        </div>

                        {/* Vision */}
                        <div className="about-mission__col about-mission__col--left">
                            <div className="about-mission__label-row about-mission__label-row--left">
                                <span className="about-mission__label">Our Vision</span>
                                <div className="about-mission__line" />
                            </div>
                            <h3 className="about-mission__heading">Future Secured</h3>
                            <p className="about-mission__text">
                                A world where technology is seamless, secure, and invisible. We envision an ecosystem where
                                data flows freely yet securely, driving innovation without friction or fear.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── Our Journey Timeline ── */}
                <section className="about-journey">
                    <div className="about-journey__container">
                        <div className="about-journey__header">
                            <span className="section-tag">The Minds</span>
                            <h2 className="about-journey__title">OUR <span>JOURNEY</span></h2>
                        </div>

                        <div className="about-journey__timeline">
                            <div className="about-journey__line" />
                            {timeline.map((item, i) => (
                                <div key={i} className={`journey-item journey-item--${item.side}`}>
                                    <div className={`journey-dot ${item.current ? 'journey-dot--current' : ''}`} />
                                    <div className="journey-content">
                                        <span className="journey-year">{item.year}</span>
                                        <h4 className={`journey-title ${item.current ? 'journey-title--current' : ''}`}>{item.title}</h4>
                                        <p className="journey-desc">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Leadership ── */}
                <section className="about-leadership">
                    <div className="about-leadership__container">
                        <div className="about-leadership__header">
                            <span className="section-tag">The Minds</span>
                            <h2 className="about-leadership__title">LEADERSHIP</h2>
                        </div>
                        <div className="about-leadership__grid">
                            {leadership.map((member, i) => (
                                <div key={i} className="leader-card">
                                    <div className="leader-card__info">
                                        <h3 className="leader-card__name">{member.name}</h3>
                                        <span className="leader-card__title">{member.title}</span>
                                        <p className="leader-card__desc">{member.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="about-cta">
                    <div className="about-cta__container">
                        <span className="section-tag">Let's Build Something Together</span>
                        <h2 className="about-cta__title">
                            READY TO<br />
                            <span className="gradient-text">UPGRADE?</span>
                        </h2>
                        <Link to="/services/consultation" className="btn-primary">SEND INQUIRY</Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
