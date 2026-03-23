export default function Stats() {
    const stats = [
        { value: '99.9%', label: 'Security Uptime' },
        { value: '24/7', label: 'Expert Support' },
        { value: '500+', label: 'Projects Delivered' },
    ]

    return (
        <section className="stats" id="stats">
            <div className="stats__container">
                <h2 className="stats__heading fade-in">
                    WE BRING{' '}
                    <span className="underline-text">VALUE</span>
                    <br />
                    TO BUSINESSES!
                </h2>

                <div className="stats__cards">
                    {stats.map((s, i) => (
                        <div className="stat-card fade-in" key={i} style={{ transitionDelay: `${i * 0.12}s` }}>
                            <div className="stat-card__value">{s.value}</div>
                            <div className="stat-card__label">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
