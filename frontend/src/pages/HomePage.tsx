import Features from "../components/Features"
import SectionBanner from "../components/SectionBanner"
import NeighborhoodGrid from "../components/NeighborhoodGrid"
import ServicesSection from '../components/ServicesSection'
import BlogSection from '../components/BlogSection'
import NewsletterSignup from '../components/NewsletterSignup'
import Hero from '../components/Hero'
import SearchBar from '../components/SearchBar'

const HomePage = () => {

  return (
    <div>
        <Hero />
        <div className='container mx-auto'>
            <SearchBar />
        </div>
        <Features />
        <SectionBanner />
        <NeighborhoodGrid />
        <ServicesSection />
        <BlogSection />
        <NewsletterSignup />
    </div>
  )
}

export default HomePage