import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import reactLogo from '../assets/image.png'

export default function ServiceDetailWebDev() {
    const { slug } = useParams()
    const [service, setService] = useState(null)
    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchServiceAndPlans = async () => {
            try {
                setLoading(true)
                
                // First, fetch all services to find the one with matching slug
                const servicesResponse = await fetch('http://localhost:8080/api/services/all')
                if (!servicesResponse.ok) throw new Error('Failed to fetch services')
                const allServices = await servicesResponse.json()
                
                // Find service by slug (if slug is actually a slug, not an ID)
                // For now, treat slug as ID since that's what you're passing
                let serviceId = slug
                let foundService = null
                
                // Try to find service by ID first (since your URL might be passing ID)
                foundService = allServices.find(s => s.id === slug)
                
                if (foundService) {
                    serviceId = foundService.id
                    setService(foundService)
                } else {
                    // If not found by ID, try to find by slug (if your services have slug field)
                    foundService = allServices.find(s => s.slug === slug)
                    if (foundService) {
                        serviceId = foundService.id
                        setService(foundService)
                    } else {
                        throw new Error(`Service with identifier "${slug}" not found`)
                    }
                }

                // Fetch plans for this service
                if (serviceId) {
                    const plansResponse = await fetch(`http://localhost:8080/api/service/plans/serviceId/${serviceId}`)
                    if (!plansResponse.ok) {
                        console.warn('Failed to fetch plans:', plansResponse.status)
                        setPlans([])
                    } else {
                        const plansData = await plansResponse.json()
                        setPlans(plansData || [])
                    }
                }
            } catch (err) {
                console.error('Fetch error:', err)
                setError(err.message)
                setService(null)
                setPlans([])
            } finally {
                setLoading(false)
            }
        }

        if (slug) {
            fetchServiceAndPlans()
        } else {
            setError('No service specified')
            setLoading(false)
        }
    }, [slug])

    // Helper function to format price
    const formatPrice = (price, currency, billingPeriod) => {
        if (!price && price !== 0) return 'Contact for pricing'
        
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency || 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        })
        
        const formattedPrice = formatter.format(price)
        return billingPeriod ? `${formattedPrice}/${billingPeriod}` : formattedPrice
    }

    // Helper function to parse features
    const parseFeatures = (features) => {
        if (!features) return []
        if (Array.isArray(features)) return features
        if (typeof features === 'string') {
            try {
                const parsed = JSON.parse(features)
                return Array.isArray(parsed) ? parsed : [features]
            } catch (e) {
                return features.split(',').map(f => f.trim()).filter(f => f)
            }
        }
        return []
    }

    // Loading state
    if (loading) {
        return (
            <>
                <Navbar />
                <main className="page">
                    <div className="loading-container" style={{ 
                        textAlign: 'center', 
                        padding: '100px 20px',
                        fontSize: '18px',
                        color: 'var(--color-text-muted)'
                    }}>
                        Loading service details...
                    </div>
                </main>
                <Footer />
            </>
        )
    }

    // Error state
    if (error || !service) {
        return (
            <>
                <Navbar />
                <main className="page">
                    <div className="error-container" style={{ 
                        textAlign: 'center', 
                        padding: '100px 20px',
                        color: '#ef4444'
                    }}>
                        <h2>Error loading service</h2>
                        <p>{error || 'Service not found'}</p>
                        <Link to="/services" style={{ 
                            color: 'var(--color-teal)',
                            textDecoration: 'underline',
                            marginTop: '20px',
                            display: 'inline-block'
                        }}>
                            ← Back to Services
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        )
    }

    // No plans state
    const hasPlans = plans && plans.length > 0

    return (
        <>
            <Navbar />
            <main className="page">
                <section className="svc-detail-hero">
                    <h1 className="svc-detail-hero__title">
                        <span>{service?.title?.toUpperCase() || 'SERVICE'}</span>
                    </h1>
                    <p className="svc-detail-hero__desc">{service?.shortDescription}</p>
                    {service?.longDescription && (
                        <p className="svc-detail-hero__long-desc">{service.longDescription}</p>
                    )}
                </section>

                <section className="svc-detail-plans">
                    <h2 className="svc-detail-plans__title">
                        {hasPlans ? 'Pricing Plans' : 'Service Information'}
                    </h2>
                    
                    {!hasPlans && !loading && (
                        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: '20px' }}>
                                No pricing plans available for this service yet.
                            </p>
                            <Link to="/services/consultation" className="plan-card__cta">
                                Contact us for pricing
                            </Link>
                        </div>
                    )}

                    {hasPlans && (
                        <div className="svc-detail-plans__grid">
                            {plans
                                .filter(plan => plan.isActive !== false)
                                .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
                                .map((plan) => {
                                    const features = parseFeatures(plan.features)
                                    const price = formatPrice(plan.price, plan.currency, plan.billingPeriod)
                                    
                                    return (
                                        <div 
                                            key={plan.id || plan.planName} 
                                            className={`plan-card ${plan.isFeatured ? 'featured-plan' : ''}`}
                                            style={plan.isFeatured ? {
                                                border: '2px solid var(--color-teal)',
                                                transform: 'scale(1.02)',
                                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                                position: 'relative'
                                            } : {}}
                                        >
                                            {plan.isFeatured && (
                                                <div className="featured-badge" style={{
                                                    position: 'absolute',
                                                    top: '12px',
                                                    right: '12px',
                                                    background: 'var(--color-teal)',
                                                    color: 'white',
                                                    padding: '4px 12px',
                                                    borderRadius: '20px',
                                                    fontSize: '12px',
                                                    fontWeight: 'bold',
                                                    zIndex: 1
                                                }}>
                                                    Featured
                                                </div>
                                            )}
                                            
                                            <div className="plan-card__header">
                                                <img 
                                                    src={service?.icon || reactLogo} 
                                                    alt={plan.planName} 
                                                    className="plan-card__icon"
                                                    style={{ width: '48px', height: '48px', objectFit: 'contain' }}
                                                    onError={e => e.target.src = reactLogo}
                                                />
                                                <h3 className="plan-card__tier">{plan.planName}</h3>
                                                <p className="plan-card__price">{price}</p>
                                                {plan.priceType === 'custom' && (
                                                    <p className="plan-card__price-type" style={{
                                                        fontSize: '12px',
                                                        color: 'var(--color-text-dim)',
                                                        marginTop: '4px'
                                                    }}>
                                                        Custom pricing available
                                                    </p>
                                                )}
                                            </div>
                                            
                                            {plan.description && (
                                                <p className="plan-card__description" style={{
                                                    fontSize: '14px',
                                                    color: 'var(--color-text-muted)',
                                                    margin: '16px 0',
                                                    padding: '0 20px',
                                                    textAlign: 'center'
                                                }}>
                                                    {plan.description}
                                                </p>
                                            )}
                                            
                                            <div className="plan-card__body">
                                                {features.length > 0 && (
                                                    <ul className="plan-card__features">
                                                        {features.map((feature, index) => (
                                                            <li key={index} className="plan-card__feature">
                                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                                                                    <path d="M13.333 4L6 11.333L2.667 8" strokeLinecap="round" strokeLinejoin="round"/>
                                                                </svg>
                                                                {feature}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                            
                                            <div className="plan-card__footer">
                                                <Link 
                                                    to={`/services/consultation?plan=${plan.id}&service=${service?.id}`} 
                                                    className="plan-card__cta"
                                                    state={{ plan, service }}
                                                >
                                                    Choose Plan
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </>
    )
}