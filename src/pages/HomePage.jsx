import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import useScrollFadeIn from '../hooks/useScrollFadeIn'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import Services from '../components/Services'
import StrategicFlow from '../components/StrategicFlow'
import Portfolio from '../components/Portfolio'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Chatbot from '../components/Chatbot'

export default function HomePage() {
    useScrollFadeIn()

    return (
        <div style={{ position: 'relative', overflowX: 'hidden' }}>
            <Navbar />
            <main>
                <Hero />
                <Stats />
                <Services limit={2} showViewAll={true} />
                <StrategicFlow />
                <Portfolio limit={2} showViewAll={true} />
                <Contact />
            </main>
            <Footer />
            <Chatbot />
        </div>
    )
}
