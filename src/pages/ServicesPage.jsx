import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import reactLogo from '../assets/image.png'
import { fetchAllServices, fetchServiceById } from '../services/services.api'

const imgEllipse = reactLogo
const defaultIcon = reactLogo

export default function ServicesPage() {
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchAllServices();
                setServices(res);
                setLoading(false);
            } catch (error) {
                setError(error);
                console.log(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [])

    return (
        <>
            <Navbar />
            <main className="page">
                <section className="services-page-hero">
                    <div className="services-page-hero__content">
                        <h1 className="services-page-hero__title">
                            OUR <span>SERVICES</span>
                        </h1>
                        <p className="services-page-hero__subtitle">
                            Choose from our range of solutions. Each plan comes with flexible pricing options.
                        </p>
                    </div>
                </section>

                <div className="services-page-tagline">
                    <h2 className="services-page-tagline__heading">
                        Choose what's <span className="gradient-text">best</span> for you
                    </h2>
                    <p className="services-page-tagline__sub">
                        Flexible packages designed for startups, growing businesses, and enterprise-grade applications.
                    </p>
                </div>

                <section className="services-page-grid">
                    <div className="services-page-grid__container">
                        {loading && <div className="loading-state">Loading services...</div>}
                        {/* {error && <div className="error-state" style={{ color: 'red' }}>Error: {error}</div>} */}
                        {!loading && services.map(service => (
                            <div key={service.id} className="svc-card">
                                <div
                                    className="svc-card__ellipse"
                                    style={{ backgroundImage: `url(${imgEllipse})` }}
                                    aria-hidden="true"
                                />
                                <div className="svc-card__icon-wrap">
                                    <img
                                        src={service.icon || defaultIcon}
                                        alt={service.title}
                                        className="svc-card__icon"
                                        onError={e => { e.target.src = defaultIcon }}
                                    />
                                </div>
                                <div className="svc-card__body">
                                    <h3 className="svc-card__title">{service.title}</h3>
                                    <p className="svc-card__desc">{service.shortDescription}</p>
                                    <Link
                                        to={`/services/${service.id}`}
                                        className="svc-card__cta"
                                        onClick={() => localStorage.setItem('selectedService', JSON.stringify(service))}
                                    >
                                        Get Your Quote
                                        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                                            <path d="M4 10h12M10 4l6 6-6 6" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}