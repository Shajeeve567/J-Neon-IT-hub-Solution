import { useState } from 'react'
import { Link } from 'react-router-dom'
import useServices from '../hooks/useServices'

function ServiceRow({ service }) {
    const [open, setOpen] = useState(false)

    return (
        <div className={`service-row ${open ? 'active' : ''}`}>
            <div className="service-row__header" onClick={() => setOpen(o => !o)}>
                <span className="service-row__name">{service.title}</span>
                <div className="service-row__meta">
                    <span className="service-row__tag">{service.slug}</span>
                    <div className="service-row__icon">
                        {open ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <path d="M18 12H6" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <path d="M12 6v12M6 12h12" />
                            </svg>
                        )}
                    </div>
                </div>
            </div>

            <div className="service-row__panel">
                <div className="service-row__panel-inner">
                    <div className="service-row__panel-card">
                        <div className="service-panel-dots">
                            <span /><span /><span />
                        </div>
                        <p className="service-panel-desc">{service.shortDescription}</p>
                        <Link to={`/services/${service.slug}`} className="service-panel-link">View Details →</Link>
                    </div>
                    {service.stat && (
                        <div className="service-panel-stat">
                            <span className="service-panel-stat__value">{service.stat.value}</span>
                            <span className="service-panel-stat__label">{service.stat.label}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default function Services({ limit, showViewAll }) {
    const { services, loading, error, refetch } = useServices()

    // Normalize services to always be an array
    const serviceArray = Array.isArray(services)
        ? services
        : Array.isArray(services?.data)
            ? services.data
            : []

    const displayed = limit ? serviceArray.slice(0, limit) : serviceArray

    return (
        <section className="services" id="services">
            <div className="services__container">
                <div className="services__header fade-in">
                    <h2 className="services__title">
                        OUR <span>SERVICES</span>
                    </h2>
                    <p className="services__subtitle">
                        We offer comprehensive services that help businesses scale, secure, and optimize their digital infrastructure.
                    </p>
                </div>

                {loading ? (
                    <div className="fade-in services-loading">
                        <div className="services-spinner"></div>
                        <p>Loading services...</p>
                    </div>
                ) : error ? (
                    <div className="fade-in services-error">
                        <p>{error}</p>
                        <button onClick={refetch} className="retry-button">
                            Try Again
                        </button>
                    </div>
                ) : displayed.length === 0 ? (
                    <div className="fade-in" style={{ padding: '40px 0', textAlign: 'center' }}>
                        <p>No services found</p>
                    </div>
                ) : (
                    <div className="fade-in" style={{ transitionDelay: '0.15s' }}>
                        {displayed.map((s) => (
                            <ServiceRow key={s.id} service={s} />
                        ))}
                    </div>
                )}

                {showViewAll && !loading && !error && displayed.length > 0 && (
                    <div className="view-all-row fade-in">
                        <Link to="/services" className="view-all-btn">
                            VIEW ALL SERVICES
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