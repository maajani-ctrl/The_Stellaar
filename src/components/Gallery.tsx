'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const facilities = [
  { 
    id: 1, 
    src: '/assets/Swimming_Pool.jpeg', 
    title: 'Swimming Pool', 
    description: 'Pristine waters for relaxation and fitness. Nagpur’s most premium aquatic experience.',
    tag: 'NOW OPEN' 
  },
  { 
    id: 2, 
    src: '/assets/Gym.jpeg', 
    title: 'Modern Gymnasium', 
    description: 'State-of-the-art equipment and professional training. Your fitness journey starts here.',
    tag: 'NOW OPEN' 
  },
  { 
    id: 3, 
    src: '/assets/Roof_Top.jpeg', 
    title: 'Rooftop Restaurant', 
    description: 'Fine dining with a view. Experience exquisite flavors under the stars.',
    tag: 'COMING SOON' 
  },
  { 
    id: 4, 
    src: '/assets/Salon.jpeg', 
    title: 'Luxury Salon', 
    description: 'Refined grooming and beauty services. Style that speaks before you do.',
    tag: 'UPGRADING' 
  },
  { 
    id: 5, 
    src: '/assets/Cafe.jpeg', 
    title: 'Elite Café', 
    description: 'A perfect space for networking and relaxation over premium brews.',
    tag: 'COMING SOON' 
  },
  { 
    id: 6, 
    src: '/assets/Admin_counter.jpeg', 
    title: 'Membership Concierge', 
    description: 'Our dedicated team is here to assist you with a seamless club experience.',
    tag: 'NOW OPEN' 
  },
]

export default function Facilities() {
  return (
    <section id="facilities" className="py-32 px-6 md:px-12 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="max-w-2xl">
            <h2 className="text-sm font-mono text-[#D4AF37] uppercase tracking-[0.5em] mb-4">World-Class Amenities</h2>
            <h3 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">LUXURY REDEFINED</h3>
            <p className="text-zinc-500 text-lg leading-relaxed">
              At Stellaar, every detail is crafted to bring together luxury, wellness, dining, entertainment, and community under one roof.
            </p>
          </div>
          <div className="mt-8 md:mt-0">
            <span className="text-6xl font-bold text-zinc-900 select-none">EST. 2026</span>
          </div>
        </div>

        {/* Tour of Stellaar Video Section - Side by Side Layout */}
        <div className="mb-40 grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-3 relative group"
          >
            <div className="mb-6">
              <h4 className="text-xl font-bold tracking-widest text-[#D4AF37] uppercase">Tour of Stellaar</h4>
            </div>
            <div className="w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
              <video
                controls
                className="max-w-full h-auto"
                poster="/assets/Poster_1.jpeg"
              >
                <source src="/assets/STELLAAR CLUB.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#D4AF37]/10 blur-[40px] rounded-full pointer-events-none" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h4 className="text-[#D4AF37] font-mono text-sm tracking-widest uppercase mb-4">The Experience</h4>
            <h5 className="text-3xl font-bold mb-6 tracking-tight">A CINEMATIC JOURNEY</h5>
            <p className="text-zinc-400 text-lg leading-relaxed mb-6">
              Step inside Nagpur's most exclusive lifestyle destination. This tour showcases the meticulous craftsmanship and world-class amenities that define Stellaar.
            </p>
            <p className="text-zinc-500 mb-8 leading-relaxed">
              From our state-of-the-art wellness zones to our refined dining spaces, discover why Stellaar is the new benchmark for premium family living and elite networking.
            </p>
            <div className="flex items-center gap-4 text-[#D4AF37]">
              <div className="w-12 h-[1px] bg-[#D4AF37]" />
              <span className="text-xs uppercase font-bold tracking-widest">Experience the standard</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-[#D4AF37]/30 transition-colors">
                <Image
                  src={facility.src}
                  alt={facility.title}
                  width={1200}
                  height={750}
                  className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-[#D4AF37] text-black text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">
                    {facility.tag}
                  </span>
                </div>
              </div>
              <div className="mt-8 flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-semibold mb-3 group-hover:text-[#D4AF37] transition-colors">{facility.title}</h3>
                  <p className="text-zinc-500 max-w-md leading-relaxed">{facility.description}</p>
                </div>
                <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-12 h-12 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
