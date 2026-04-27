import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { getPortfolioItems, getPortfolioImages } from '../services/portfolioService';

const projects = [
    { label: 'Cyber Defense', desc: 'Security & Compliance', tag: 'Security & Compliance' },
    { label: 'Cloud Migration', desc: 'Infrastructure', tag: 'Infrastructure' },
    { label: 'Digital Studio', desc: 'Design & Development', tag: 'Design & Dev' },
]

export default function Portfolio({ limit, showViewAll }) {
    const [dynamicProjects, setDynamicProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getPortfolioItems();
                if (data && data.length > 0) {
                    const mapped = await Promise.all(data.map(async item => {
                        let imageUrl = null;
                        try {
                            const images = await getPortfolioImages(item.id);
                            if (images && images.length > 0) imageUrl = images[0].imageUrl;
                        } catch (e) {}
                        return {
                            label: item.title,
                            desc: item.summary || 'Portfolio',
                            tag: item.summary || 'Portfolio',
                            imageUrl
                        };
                    }));
                    setDynamicProjects(mapped);
                }
            } catch (err) {
                console.error("Failed to fetch homepage portfolio items", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const sourceData = loading ? [] : (dynamicProjects.length > 0 ? dynamicProjects : projects);
    const displayed = limit ? sourceData.slice(0, limit) : sourceData;

    return (
        <section className="portfolio" id="portfolio" style={{ position: 'relative' }}>
            <div className="bg-watermark">PORTFOLIO</div>
            <div className="portfolio__container" style={{ position: 'relative', zIndex: 2 }}>
                <h2 className="portfolio__title fade-in">OUR <span>PORTFOLIO</span></h2>
                <p className="portfolio__subtitle fade-in">
                    Showcase of our digital craftsmanship. Where complex problems meet elegant, high-performance solutions.
                </p>

                <div className="portfolio__grid">
                    {loading && (
                        <div className="fade-in" style={{ textAlign: 'center', padding: '50px 0', color: 'var(--color-text-muted)', gridColumn: '1 / -1' }}>
                            Loading portfolio items...
                        </div>
                    )}
                    {!loading && displayed.map((p, i) => (
                        <div
                            className="portfolio-card fade-in"
                            key={i}
                            style={{ transitionDelay: `${i * 0.12}s` }}
                        >
                            <div className="portfolio-card__glow" />
                            {p.imageUrl && (
                                <img src={p.imageUrl} alt={p.label} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, zIndex: 0, borderRadius: 'inherit' }} />
                            )}
                            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
                                <span className="portfolio-card__tag">{p.tag}</span>
                                <span className="portfolio-card__label">{p.label}</span>
                                <span className="portfolio-card__number">/ {p.desc}</span>
                            </div>
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
