import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ServiceContactPage() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: '',
        message: ''
    })

    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(null) // success | error

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Simple email validation
        if (!formData.email.includes('@')) {
            setStatus('error')
            return
        }

        setLoading(true)
        setStatus(null)

        try {
            const response = await fetch('http://localhost:8080/contact/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message
                })
            })

            if (!response.ok) {
                throw new Error('Failed to send')
            }

            setStatus('success')
            setFormData({
                name: '',
                email: '',
                service: '',
                message: ''
            })

        } catch (error) {
            setStatus('error')
        }

        setLoading(false)
    }

    return (
        <>
            <Navbar />

            <main className="page">
                <section className="service-contact">
                    <div className="service-contact__container">

                        {/* Left Panel */}
                        <div className="service-contact__info">
                            <span className="section-tag">Why Work With Us</span>
                            <h2 className="service-contact__heading">
                                Engineering Solutions That Scale
                            </h2>
                            <p className="service-contact__description">
                                Whether you need cybersecurity, cloud migration,
                                or full-scale product development, our team
                                delivers secure, scalable, and future-proof systems.
                            </p>

                            <ul className="service-contact__benefits">
                                <li><span>✓</span> Free initial consultation</li>
                                <li><span>✓</span> Custom architecture & roadmap</li>
                                <li><span>✓</span> Enterprise-grade security</li>
                                <li><span>✓</span> Transparent pricing model</li>
                            </ul>
                        </div>

                        {/* Form Panel */}
                        <div className="service-contact__form-wrapper">
                            <form 
                                className="service-contact__form"
                                onSubmit={handleSubmit}
                            >

                                <div className="form-row">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <select
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Service</option>
                                        <option>Cyber Defense</option>
                                        <option>Cloud Migration</option>
                                        <option>Digital Studio</option>
                                    </select>
                                </div>

                                <div className="form-row">
                                    <textarea
                                        rows="5"
                                        name="message"
                                        placeholder="Describe your project requirements..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    className="service-contact__btn"
                                    disabled={loading}
                                >
                                    {loading ? 'Sending...' : 'Request Consultation'}
                                </button>

                                {status === 'success' && (
                                    <p className="form-success">
                                        Message sent successfully!
                                    </p>
                                )}

                                {status === 'error' && (
                                    <p className="form-error">
                                        Some thing went wrong. Please try again later
                                    </p>
                                )}

                            </form>
                        </div>

                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}