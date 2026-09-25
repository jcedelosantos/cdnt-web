import { Header } from '@/components/site/header'
import { HeroSection } from '@/components/site/hero-section'
import { AboutSection } from '@/components/site/about-section'
import { ServicesSection } from '@/components/site/services-section'
import { ProductsSection } from '@/components/site/products-section'
import { WhyUsSection } from '@/components/site/why-us-section'
import { ProjectsSection } from '@/components/site/projects-section'
import { ProcessSection } from '@/components/site/process-section'
import { CtaSection } from '@/components/site/cta-section'
import { ContactSection } from '@/components/site/contact-section'
import { Footer } from '@/components/site/footer'
import { WhatsAppButton } from '@/components/site/whatsapp-button'

export default function Home() {
  return (
    <main id="contenido" className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProductsSection />
      <WhyUsSection />
      <ProjectsSection />
      <ProcessSection />
      <CtaSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
