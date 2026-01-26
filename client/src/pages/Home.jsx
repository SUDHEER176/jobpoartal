import { Button } from '../components/ui'
import { AppleSpotlight } from '../components/ui/apple-spotlight'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Search, MapPin } from 'lucide-react'
import { MinimalHero } from '../components/MinimalHero'
import { LogosMarquee } from '../components/LogosMarquee'
import { JobCategories } from '../components/JobCategories'
import { RecentJobs } from '../components/RecentJobs'
import { CompanyStats } from '../components/CompanyStats'
import { WhyChooseUs } from '../components/WhyChooseUs'
import { RecruiterFeatures } from '../components/RecruiterFeatures'
import { HowItWorks } from '../components/HowItWorks'
import { FAQSection } from '../components/FAQSection'
import { TestimonialsSection } from '../components/TestimonialsSection'
import { BlogSection } from '../components/BlogSection'
import { HeroSearchBar } from '../components/HeroSearchBar'
import { useAuth } from '@/context/AuthContext'

export default function Home() {
    const { dbUser } = useAuth();
    const [spotlightOpen, setSpotlightOpen] = useState(false);

    useEffect(() => {
        const down = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setSpotlightOpen((open) => !open)
            }
        }
        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [])

    return (
        <div className="min-h-screen bg-white dark:bg-black overflow-x-hidden transition-colors duration-300">
            {/* Dynamic Hero Section */}
            <MinimalHero badge="#1 Job Platform" title1="Find Your Next" title2="Career Move">
                {/* Search Box Trigger - Hidden for Recruiters */}
                {dbUser?.role !== 'recruiter' && <HeroSearchBar />}
            </MinimalHero>

            {/* Trusted Companies Marquee */}
            <LogosMarquee />

            {/* Popular Categories */}
            <JobCategories />

            {/* Recent Jobs */}
            <RecentJobs />

            {/* Company Stats (Good Life Info Block) */}
            <CompanyStats />

            {/* Benefits Section for Seekers */}
            <WhyChooseUs />

            {/* Benefits Section for Recruiters */}
            <RecruiterFeatures />

            {/* Unified Process Section */}
            <HowItWorks />

            {/* FAQ Section */}
            <FAQSection />

            {/* Testimonials Section */}
            <TestimonialsSection />

            {/* News & Blogs Section */}
            <BlogSection />

            <AppleSpotlight isOpen={spotlightOpen} handleClose={() => setSpotlightOpen(false)} />
        </div >
    )
}

