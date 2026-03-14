import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { getPortfolioItems } from '../services/portfolioService';

const projects = [
    { label: 'Cyber Defense', desc: 'Security & Compliance', tag: 'Security & Compliance' },
    { label: 'Cloud Migration', desc: 'Infrastructure', tag: 'Infrastructure' },
    { label: 'Digital Studio', desc: 'Design & Development', tag: 'Design & Dev' },
]

export default function Portfolio({ limit, showViewAll }) {
    const [dynamicProjects, setDynamicProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getPortfolioItems();
                if (data && data.length > 0) {
                    const mapped = data.map(item => ({
                        label: item.title,
                        desc: item.summary || 'Portfolio',
                        tag: item.summary || 'Portfolio'
                    }));
                    setDynamicProjects(mapped);
                }
            } catch (err) {
                console.error("Failed to fetch homepage portfolio items", err);
            }
        };
        fetchProjects();
    }, []);

    const sourceData = dynamicProjects.length > 0 ? dynamicProjects : projects;
    const displayed = limit ? sourceData.slice(0, limit) : sourceData;

    return (
        <section className="portfolio" id="portfolio">
            <div className="portfolio__container">
                <h2 className="portfolio__title fade-in">OUR <span>PORTFOLIO</span></h2>
                <p className="portfolio__subtitle fade-in">
                    Showcase of our digital craftsmanship. Where complex problems meet elegant, high-performance solutions.
                </p>

                <div className="portfolio__grid">
                    {displayed.map((p, i) => (
                        <div
                            className="portfolio-card fade-in"
                            key={i}
                            style={{ transitionDelay: `${i * 0.12}s` }}
                        >
                            <div className="portfolio-card__glow" />
                            <span className="portfolio-card__tag">{p.tag}</span>
                            <span className="portfolio-card__label">{p.label}</span>
                            <span className="portfolio-card__number">/ {p.desc}</span>
                        </div>
                    ))}
                </div>

                {showViewAll && (
                    <div className="view-all-row fade-in">
                        <Link to="/portfolio" className="view-all-btn">
                            VIEW ALL PORTFOLIO
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    )
}
