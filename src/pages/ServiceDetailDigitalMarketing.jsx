import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const imgCctv = "http://localhost:3845/assets/e4615309020baa67a681be5c16d027096ace2563.png"
const imgLine = "http://localhost:3845/assets/08b4f1ac92af14156aab55d0d5cad7c8909b045b.svg"

const plans = [
    {
        tier: 'Basic',
        forText: 'For Personal Use',
        price: '$20',
        features: ['Social Media Setup', 'Monthly Report', 'Basic Analytics', 'Email Campaign'],
    },
    {
        tier: 'Standard',
        forText: 'For Growing Businesses',
        price: '$100',
        features: ['Multi-Platform Ads', 'Weekly Reports', 'A/B Testing', 'Content Calendar'],
    },
    {
        tier: 'Premium',
        forText: 'For Enterprise',
        price: '$200',
        features: ['Full Strategy', 'Dedicated Manager', 'Influencer Outreach', 'ROI Dashboard'],
    },
]

export default function ServiceDetailDigitalMarketing() {
    return (
        <>
            <Navbar />
            <main className="page">
                <section className="svc-detail-hero">
                    <h1 className="svc-detail-hero__title">
                        <span>DIGITAL</span>
                        <br />MARKETING
                    </h1>
                    <p className="svc-detail-hero__desc">
                        Digital marketing is our specialty. We create data-driven campaigns that grow your reach, improve
                        brand visibility, and drive measurable ROI. From SEO and SEM to social media and content
                        strategies, we tailor every campaign to your market and goals.
                    </p>
                </section>

                <section className="svc-detail-plans">
                    <div className="svc-detail-plans__tagline">
                        <h2 className="svc-detail-plans__heading">
                            Choose what's <span className="gradient-text">best</span> for you
                        </h2>
                        <p className="svc-detail-plans__sub">
                            Flexible packages designed for startups, growing businesses, and enterprise-grade applications.
                        </p>
                    </div>

                    <div className="svc-detail-plans__grid">
                        {plans.map((plan, i) => (
                            <div key={i} className="plan-card">
                                <div className="plan-card__icon-wrap">
                                    <img src={imgCctv} alt={plan.tier} className="plan-card__icon" />
                                </div>
                                <div className="plan-card__tier">{plan.tier}</div>
                                <div className="plan-card__for">{plan.forText}</div>
                                <div className="plan-card__price">{plan.price}</div>
                                <Link to="/about" className="plan-card__cta">Get Your Quote</Link>
                                <div className="plan-card__divider">
                                    <img src={imgLine} alt="" />
                                </div>
                                <p className="plan-card__what">What you'll get</p>
                                <ul className="plan-card__features">
                                    {plan.features.map((f, j) => (
                                        <li key={j}>{'> '}{f}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
