import { useState } from 'react'

const SERVICE_CONFIG = {
    '': {
        fields: [],
    },
    'Web Development': {
        tag: '// web_dev',
        fields: [
            {
                id: 'website_type',
                label: 'Website Type',
                type: 'select',
                options: ['E-Commerce Store', 'Portfolio / Branding', 'Corporate / Business', 'SaaS Platform', 'Custom Web App'],
                placeholder: 'Select website type',
            },
            {
                id: 'budget',
                label: 'Budget Range',
                type: 'select',
                options: ['< $1,000', '$1,000 – $5,000', '$5,000 – $15,000', '$15,000 – $50,000', '$50,000+'],
                placeholder: 'Select your budget',
            },
            {
                id: 'timeline',
                label: 'Project Timeline',
                type: 'select',
                options: ['ASAP (< 1 month)', '1 – 3 months', '3 – 6 months', '6 months+', 'Flexible'],
                placeholder: 'Select timeline',
            },
        ],
    },
    'Digital Marketing': {
        tag: '// marketing',
        fields: [
            {
                id: 'channels',
                label: 'Current Marketing Channels',
                type: 'select',
                options: ['None yet', 'Social Media only', 'SEO / Blog', 'Paid Ads (Google/Meta)', 'Email Marketing', 'Multiple channels'],
                placeholder: 'Select current channels',
            },
            {
                id: 'monthly_budget',
                label: 'Monthly Marketing Budget',
                type: 'select',
                options: ['< $500', '$500 – $2,000', '$2,000 – $10,000', '$10,000+'],
                placeholder: 'Select monthly budget',
            },
            {
                id: 'target',
                label: 'Primary Target Audience',
                type: 'text',
                placeholder: 'e.g. Small businesses in the US, 25-40 year olds',
            },
        ],
    },
    'Data Analytics': {
        tag: '// analytics',
        fields: [
            {
                id: 'data_sources',
                label: 'Primary Data Sources',
                type: 'select',
                options: ['Spreadsheets / CSV', 'SQL Database', 'Cloud Data Warehouse', 'Multiple systems', 'Not sure yet'],
                placeholder: 'Select data sources',
            },
            {
                id: 'team_size',
                label: 'Team / Company Size',
                type: 'select',
                options: ['1 – 10', '11 – 50', '51 – 200', '200+'],
                placeholder: 'Select team size',
            },
            {
                id: 'goal',
                label: 'Primary Analytics Goal',
                type: 'select',
                options: ['Reporting Dashboards', 'Predictive Modeling', 'Business Intelligence (BI)', 'Real-time Monitoring', 'Data Pipeline / ETL'],
                placeholder: 'Select primary goal',
            },
        ],
    },
    'Mobile Dev': {
        tag: '// mobile',
        fields: [
            {
                id: 'platform',
                label: 'Target Platform',
                type: 'select',
                options: ['iOS (Apple)', 'Android (Google)', 'Both iOS & Android', 'Cross-platform (React Native / Flutter)'],
                placeholder: 'Select platform',
            },
            {
                id: 'app_type',
                label: 'App Type',
                type: 'select',
                options: ['Consumer App', 'Business / Enterprise App', 'E-Commerce', 'On-demand / Delivery', 'Social / Community', 'Other'],
                placeholder: 'Select app type',
            },
            {
                id: 'backend',
                label: 'Existing Backend / API?',
                type: 'select',
                options: ['Yes — we have one', 'No — need full stack', 'Partially built', 'Not sure'],
                placeholder: 'Select backend status',
            },
        ],
    },
}

const SERVICES = Object.keys(SERVICE_CONFIG).filter(k => k !== '')

export default function Contact() {
    const [selectedService, setSelectedService] = useState('')
    const [formData, setFormData] = useState({})
    const [submitted, setSubmitted] = useState(false)

    const config = SERVICE_CONFIG[selectedService] || { fields: [] }

    function handleChange(e) {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    function handleServiceChange(e) {
        setSelectedService(e.target.value)
        setFormData(prev => ({ name: prev.name, email: prev.email, company: prev.company, message: prev.message }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        setSubmitted(true)
    }

    return (
        <section className="contact" id="contact">
            <div className="contact__container">

                {/* Header */}
                <div className="contact__header fade-in">
                    <span className="contact__eyebrow">{'> CONTACT_MODULE'}</span>
                    <h2 className="contact__title">
                        Initiate <span>Communication</span>
                    </h2>
                    <p className="contact__subtitle">
                        Select the service you're interested in and we'll route your inquiry to the right specialist team.
                    </p>
                </div>

                {/* Form + Info layout */}
                <div className="contact__body fade-in">

                    {/* Form */}
                    <div className="contact__form-wrap">
                        {submitted ? (
                            <div className="contact__success">
                                <div className="contact__success-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                </div>
                                <h3>Message Transmitted</h3>
                                <p>We've received your inquiry and will respond within 24 hours.</p>
                                <button className="contact__reset" onClick={() => { setSubmitted(false); setFormData({}); setSelectedService('') }}>
                                    Send Another →
                                </button>
                            </div>
                        ) : (
                            <form className="contact__form" onSubmit={handleSubmit} noValidate>

                                {/* Base fields */}
                                <div className="form-row form-row--2">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="name">Name</label>
                                        <input
                                            className="form-input"
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="John Smith"
                                            value={formData.name || ''}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="email">Email</label>
                                        <input
                                            className="form-input"
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="john@company.com"
                                            value={formData.email || ''}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="company">Company / Organisation</label>
                                    <input
                                        className="form-input"
                                        id="company"
                                        name="company"
                                        type="text"
                                        placeholder="ACME Corp"
                                        value={formData.company || ''}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Service selector */}
                                <div className="form-group">
                                    <label className="form-label" htmlFor="service">
                                        Service Enquiry
                                        <span className="form-label-required">*</span>
                                    </label>
                                    <div className="form-select-wrap">
                                        <select
                                            className="form-select"
                                            id="service"
                                            name="service"
                                            value={selectedService}
                                            onChange={handleServiceChange}
                                            required
                                        >
                                            <option value="">— Select a service —</option>
                                            {SERVICES.map(s => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                        <svg className="form-select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>
                                    </div>
                                </div>

                                {/* Dynamic service-specific fields */}
                                {selectedService && (
                                    <div className="form-dynamic-section">
                                        <div className="form-dynamic-tag">{config.tag}</div>
                                        <div className="form-dynamic-fields">
                                            {config.fields.map(field => (
                                                <div className="form-group" key={field.id}>
                                                    <label className="form-label" htmlFor={field.id}>{field.label}</label>
                                                    {field.type === 'select' ? (
                                                        <div className="form-select-wrap">
                                                            <select
                                                                className="form-select"
                                                                id={field.id}
                                                                name={field.id}
                                                                value={formData[field.id] || ''}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">{field.placeholder}</option>
                                                                {field.options.map(o => (
                                                                    <option key={o} value={o}>{o}</option>
                                                                ))}
                                                            </select>
                                                            <svg className="form-select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>
                                                        </div>
                                                    ) : (
                                                        <input
                                                            className="form-input"
                                                            id={field.id}
                                                            name={field.id}
                                                            type="text"
                                                            placeholder={field.placeholder}
                                                            value={formData[field.id] || ''}
                                                            onChange={handleChange}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Message */}
                                <div className="form-group">
                                    <label className="form-label" htmlFor="message">Requirements / Message</label>
                                    <textarea
                                        className="form-textarea"
                                        id="message"
                                        name="message"
                                        rows={4}
                                        placeholder="Describe your project or requirements in detail..."
                                        value={formData.message || ''}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button className="form-submit" type="submit">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                                        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                                    </svg>
                                    TRANSMIT MESSAGE
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Info panel */}
                    <div className="contact__info-panel">
                        <div className="contact__info-card">
                            <div className="contact__info-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                                </svg>
                            </div>
                            <div>
                                <div className="contact__info-label">Email</div>
                                <div className="contact__info-value">hello@j-neon.com</div>
                                <div className="contact__info-value">support@j-neon.com</div>
                            </div>
                        </div>

                        <div className="contact__info-card">
                            <div className="contact__info-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.18 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l1.06-1.06a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                                </svg>
                            </div>
                            <div>
                                <div className="contact__info-label">Voice</div>
                                <div className="contact__info-value">+1 (555) 123-4567</div>
                                <div className="contact__info-value">+1 (555) 987-6543</div>
                            </div>
                        </div>

                        <div className="contact__info-card">
                            <div className="contact__info-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <div>
                                <div className="contact__info-label">HQ Location</div>
                                <div className="contact__info-value">123 Technology Drive</div>
                                <div className="contact__info-value">Innovation District</div>
                                <div className="contact__info-value">Tech City, TC 12345</div>
                            </div>
                        </div>

                        {/* Response time badge */}
                        <div className="contact__response-badge">
                            <span className="contact__response-dot" />
                            <span>We respond within <strong>24 hours</strong></span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
