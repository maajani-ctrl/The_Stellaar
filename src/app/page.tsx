import Hero from '@/components/Hero'
import About from '@/components/About'
import Facilities from '@/components/Gallery'
import Membership from '@/components/Newsletter'
import Affiliation from '@/components/Affiliation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Facilities />
      <Membership />
      <Affiliation />
      <Footer />
    </main>
  )
}
