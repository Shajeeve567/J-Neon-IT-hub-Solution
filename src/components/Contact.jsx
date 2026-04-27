import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.includes('@')) {
      setStatus('error');
      return;
    }
    setLoading(true);
    setStatus(null);
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
      });

      if (!response.ok) {
          throw new Error('Failed to send');
      }

      setStatus('success');
      setFormData({ name: '', email: '', service: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
    setLoading(false);
  };

  const benefits = [
    "Free initial consultation",
    "Custom architecture & roadmap",
    "Enterprise-grade security",
    "Transparent pricing model"
  ];

  return (
    <section className="contact section fade-in" id="contact">
      <div className="container contact__container">
        
        <div className="contact__content">
          <div className="contact__kicker">
            <span>WHY</span>
            <span>WHERE</span>
            <span>WITH US</span>
          </div>
          <h2 className="contact__title">Engineering Solutions That Scale</h2>
          <p className="contact__desc">
            Whether you need cybersecurity, cloud migration, or full-scale product development, our team delivers secure, scalable, and future-proof systems.
          </p>
          
          <ul className="contact__benefits">
            {benefits.map((text, i) => (
              <li key={i}>
                <Check color="#2ebfa5" size={18} className="contact__check" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="contact__form-wrapper">
          <form className="contact__form" onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="contact__input" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="contact__input" required />
            
            <div className="contact__select-wrapper">
              <select name="service" value={formData.service} onChange={handleChange} className="contact__input contact__select" required>
                <option value="" disabled hidden>Select Project Type</option>
                <option value="Cyber Defense">Cyber Defense</option>
                <option value="Cloud Migration">Cloud Migration</option>
                <option value="Digital Studio">Digital Studio</option>
                <option value="Other">Other</option>
              </select>
              <ChevronDown className="contact__select-icon" size={20} color="#6b7280" />
            </div>

            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe your project requirements..." 
              className="contact__input contact__textarea"
              rows={4}
              required
            ></textarea>
            
            <button type="submit" className="contact__submit" disabled={loading}>
              {loading ? 'Sending...' : 'Request Consultation'}
            </button>

            {status === 'success' && (
                <p className="form-success" style={{ marginTop: '1rem', color: '#2ebfa5' }}>
                    Message sent successfully!
                </p>
            )}
            {status === 'error' && (
                <p className="form-error" style={{ marginTop: '1rem', color: '#ef4444' }}>
                    Something went wrong. Please try again.
                </p>
            )}
          </form>
        </div>

      </div>
    </section>
  );
}
