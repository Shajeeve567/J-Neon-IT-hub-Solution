export default function Footer() {
    return (
        <footer className="footer" id="contact">
            <div className="footer__container">
                <div className="footer__top">
                    {/* Brand */}
                    <div>
                        <div className="footer__brand-name">
                            J-NEON <span>IT HUB</span>
                        </div>
                        <p className="footer__brand-desc">
                            Transforming businesses through innovative technology solutions.
                            Your partner in the digital age.
                        </p>
                    </div>

                    {/* Company */}
                    <div>
                        <div className="footer__col-title">Company</div>
                        <ul className="footer__col-links">
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Blog</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <div className="footer__col-title">Services</div>
                        <ul className="footer__col-links">
                            <li><a href="#services">Web Development</a></li>
                            <li><a href="#services">Cloud Solutions</a></li>
                            <li><a href="#services">Cyber Security</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <div className="footer__col-title">Contact</div>
                        <div className="footer__contact-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                            </svg>
                            <span>hello@j-neon.com</span>
                        </div>
                        <div className="footer__contact-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.18 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l1.06-1.06a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                            </svg>
                            <span>+94 77 3079 159</span>
                        </div>
                        <div className="footer__contact-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                            </svg>
                            <span>BUILDING,190/07, NALLAYAN STREET, PETTAH, MANNAR.</span>
                        </div>
                    </div>
                </div>

                <div className="footer__bottom">
                    <span className="footer__copyright">
                        © 2026 J-NEON IT HUB. All rights reserved.
                    </span>
                </div>
            </div>
        </footer>
    )
}