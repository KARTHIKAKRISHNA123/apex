import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/home/Hero'
import Banner from '../components/home/Banner'
import Features from '../components/home/Features'
import Testimonial from '../components/home/Testimonial'
import CallToAction from '../components/home/CallToAction'
import Footer from '../components/home/Footer'

const Home = () => {
  const location = useLocation()

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [location])

  return (
    <div className="min-h-screen bg-transparent text-foreground selection:bg-white/20">
      <Navbar />
      
      <main>
        <Hero />
        <Banner />
        <Features />
        <div id="testimonials">
          <Testimonial />
        </div>
        <CallToAction />
      </main>

      <div id="contact">
        <Footer />
      </div>
    </div>
  )
}

export default Home