import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import Services from '../components/Services'
import Portfolio from '../components/Portfolio'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

function useScrollFadeIn() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(el => {
                    if (el.isIntersecting) {
                        el.target.classList.add('visible')
                    }
                })
            },
            { threshold: 0.12 }
        )
        const targets = document.querySelectorAll('.fade-in')
        targets.forEach(t => observer.observe(t))
        return () => targets.forEach(t => observer.unobserve(t))
    }, [])
}

export default function HomePage() {
    useScrollFadeIn()

    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <Stats />
                <Services limit={2} showViewAll={true} />
                <Portfolio limit={2} showViewAll={true} />
                {/* <Contact /> */}
            </main>
            <Footer />
        </>
    )
}
