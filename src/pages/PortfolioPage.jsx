import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getPortfolioItems, getPortfolioImages } from '../services/portfolioService'

const imgCheckmark = "http://localhost:3845/assets/0ccf5697b7ad90af92894ea1fb9741db5ca8be25.svg"

const projects = [
    {
        tag: 'Security & Compliance',
        title: 'Cyber Defense',
        desc: 'Our advanced cybersecurity protocols go beyond basic firewalls. We implement zero-trust architectures, real-time threat hunting, and forensic analysis to ensure your data remains inviolable.',
        techLabel: 'Technologies',
        tech: ['SIEM', 'EDR', 'Zero Trust', 'Pen-Testing'],
        features: [
            '24/7 Security Operations Center (SOC) monitoring.',
            'Automated incident response and containment.',
            'Compliance auditing for GDPR, HIPAA, and SOC2.',
        ],
        side: 'right',
        accentColor: 'var(--color-teal)',
        cardType: 'cyber',
    },
    {
        tag: 'Infrastructure',
        title: 'Cloud Migration',
        desc: 'Seamlessly transition your legacy systems to modern, scalable cloud environments. We minimize downtime and optimize costs, ensuring your move to the cloud is a strategic upgrade, not just a shift.',
        techLabel: 'Platforms',
        tech: ['AWS', 'Azure', 'Google Cloud', 'Kubernetes'],
        features: [
            'Zero-downtime migration strategies.',
            'Cost-optimization and resource scaling architecture.',
            'Hybrid and multi-cloud integration support.',
        ],
        side: 'left',
        accentColor: '#3b82f6',
        cardType: 'cloud',
    },
    {
        tag: 'Design & Development',
        title: 'Digital Studio',
        desc: 'We craft immersive digital experiences that captivate users and drive conversion. From high-fidelity prototyping to full-stack development, our studio merges aesthetics with performance.',
        techLabel: 'Stack',
        tech: ['React', 'Next.js', 'Tailwind', 'Figma'],
        features: [
            'High-performance, SEO-optimized web applications.',
            'User-centric interface design and usability testing.',
            'Brand identity and digital strategy.',
        ],
        side: 'right',
        accentColor: '#a855f7',
        cardType: 'studio',
    },
]

function CyberCard() {
    return (
        <div className="pf-card pf-card--cyber">
            <div className="pf-card__header">
                <span className="pf-card__icon">🛡</span>
                <span className="pf-card__badge">SECURE: ACTIVE</span>
            </div>
            <div className="pf-card__row">
                <span className="pf-card__mono pf-card__mono--dim">Threat Level</span>
                <span className="pf-card__mono pf-card__mono--teal">Zero</span>
            </div>
            <div className="pf-card__progress" />
            <div className="pf-card__row">
                <span className="pf-card__mono pf-card__mono--dim">Encryption</span>
                <span className="pf-card__mono">AES-256</span>
            </div>
            <div className="pf-card__terminal">
                <p>{'> Monitoring traffic...'}</p>
                <p>{'> Anomalies: 0'}</p>
                <p>{'> Status: Protected'}</p>
            </div>
            <div className="pf-card__stat">
                <span className="pf-card__stat-value">99.9%</span>
                <span className="pf-card__stat-label">Threat Mitigation Rate</span>
            </div>
        </div>
    )
}

function CloudCard() {
    return (
        <div className="pf-card pf-card--cloud">
            <div className="pf-card__cloud-icon">☁</div>
            <div className="pf-card__cloud-center">
                <span className="pf-card__cloud-heading">Sync Complete</span>
                <span className="pf-card__mono pf-card__mono--teal">DATA INTEGRITY: 100%</span>
            </div>
        </div>
    )
}

function StudioCard() {
    return (
        <div className="pf-card pf-card--studio">
            <div className="pf-card__studio-bar">
                <span className="dot dot--red" />
                <span className="dot dot--yellow" />
                <span className="dot dot--green" />
                <div className="pf-card__url-bar" />
            </div>
            <div className="pf-card__studio-body">
                <div className="pf-card__studio-sidebar" />
                <div className="pf-card__studio-content" />
            </div>
            <div className="pf-card__studio-badge">UX/UI</div>
            <div className="pf-card__studio-stat">
                <span className="pf-card__mono pf-card__mono--dim">Growth Metric</span>
                <span className="pf-card__studio-value">+245%</span>
            </div>
        </div>
    )
}

const cardComponents = { cyber: CyberCard, cloud: CloudCard, studio: StudioCard }

export default function PortfolioPage() {
    const [dynamicProjects, setDynamicProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getPortfolioItems();
                if (data && data.length > 0) {
                    const cardTypes = ['cyber', 'cloud', 'studio'];
                    const sides = ['right', 'left'];
                    const accents = ['var(--color-teal)', '#3b82f6', '#a855f7'];

                    const mapped = await Promise.all(data.map(async (item, i) => {
                        let imageUrl = null;
                        try {
                            const images = await getPortfolioImages(item.id);
                            if (images && images.length > 0) imageUrl = images[0].imageUrl;
                        } catch (e) {
                            console.error(e);
                        }

                        return {
                            id: item.id,
                            tag: item.summary || 'Project',
                            title: item.title,
                            desc: item.description,
                            techLabel: 'Technologies',
                            tech: [],
                            features: [],
                            side: sides[i % 2],
                            accentColor: accents[i % 3],
                            cardType: cardTypes[i % 3],
                            imageUrl: imageUrl
                        };
                    }));
                    setDynamicProjects(mapped);
                }
            } catch (err) {
                console.error("Failed to load public portfolio items", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const displayProjects = dynamicProjects.length > 0 ? dynamicProjects : projects;

    return (
        <>
            <Navbar />
            <main className="page">
                {/* ── Hero ── */}
                <section className="portfolio-page-hero">
                    <div className="portfolio-page-hero__content">
                        <h1 className="portfolio-page-hero__title">
                            OUR <span>PORTFOLIO</span>
                        </h1>
                        <p className="portfolio-page-hero__subtitle">
                            Showcase of our digital craftsmanship. Where complex problems meet
                            elegant, high-performance solutions.
                        </p>
                    </div>
                </section>

                {/* ── Projects ── */}
                {displayProjects.map((project, i) => {
                    const CardComp = cardComponents[project.cardType] || cardComponents.cyber

                    const VisualContent = () => (
                        project.imageUrl ? (
                            <div style={{ width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${project.accentColor}33` }}>
                                <img src={project.imageUrl} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        ) : (
                            <CardComp />
                        )
                    );

                    return (
                        <section key={project.id || i} className={`pf-section pf-section--${project.side}`} style={{ '--accent': project.accentColor }}>
                            <div className="pf-section__container">
                                {project.side === 'right' ? (
                                    <>
                                        <div className="pf-section__visual"><VisualContent /></div>
                                        <div className="pf-section__info">
                                            <ProjectInfo project={project} imgCheckmark={imgCheckmark} />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="pf-section__info">
                                            <ProjectInfo project={project} imgCheckmark={imgCheckmark} />
                                        </div>
                                        <div className="pf-section__visual"><VisualContent /></div>
                                    </>
                                )}
                            </div>
                        </section>
                    )
                })}
            </main>
            <Footer />
        </>
    )
}

function ProjectInfo({ project, imgCheckmark }) {
    return (
        <>
            <span className="section-tag">{project.tag}</span>
            <h2 className="pf-section__title">{project.title}</h2>
            <p className="pf-section__desc">{project.desc}</p>
            <div className="pf-section__tech-block">
                <div className="pf-section__tech-label">
                    <span className="pf-section__tech-label-text">{project.techLabel}</span>
                </div>
                <div className="pf-section__tech-tags">
                    {project.tech.map((t, j) => (
                        <span key={j} className="tech-tag">{t}</span>
                    ))}
                </div>
            </div>
            <ul className="pf-section__features">
                {project.features.map((f, j) => (
                    <li key={j} className="pf-section__feature-item">
                        <span className="pf-section__check">✓</span>
                        {f}
                    </li>
                ))}
            </ul>
        </>
    )
}
