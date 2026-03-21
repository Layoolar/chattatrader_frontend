import { useState, useEffect } from 'react';
import LandingNav from '../../reuseables/LandingNav';
import { Hero } from '../../reuseables/hero';
import { About } from '../../reuseables/About';
import { HowItWorks } from '../../reuseables/HowItWorks';
import { Cta } from '../../reuseables/Cta';
import Banner from '../../reuseables/Banner';
import { Pricing } from '../../reuseables/Pricing';
import { Services } from '../../reuseables/Services';
import { Features } from '../../reuseables/Features';
import { FAQ } from '../../reuseables/FAQ';
import Footer from '../../reuseables/Footer';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className='bg-white min-h-screen'>
      <LandingNav />

      {/* Flowing announcement banner */}
      <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 overflow-hidden'>
        <div className='animate-marquee whitespace-nowrap'>
          <span className='text-sm font-medium mx-4'>
            📢 Notice: We currently do not have any crypto tokens available at
            this time. Stay tuned for updates!
          </span>
          <span className='text-sm font-medium mx-4'>
            📢 Notice: We currently do not have any crypto tokens available at
            this time. Stay tuned for updates!
          </span>
          <span className='text-sm font-medium mx-4'>
            📢 Notice: We currently do not have any crypto tokens available at
            this time. Stay tuned for updates!
          </span>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <main className='space-y-8'>
          <Hero />
          <About />
          <HowItWorks />
        </main>
        <div className='space-y-8'>
          <Cta />
          <Banner />
          <Pricing />
          <Services />
          <Features />
          <FAQ />
        </div>
      </div>
      <Footer />
    </div>
  );
}
