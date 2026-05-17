import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <footer id="contact" className="py-16 md:py-24 px-6 md:px-12 border-t border-zinc-900 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12 md:gap-16">
          <div className="lg:col-span-2">
            <Image 
              src="/assets/Logo_no_Back.png" 
              alt="Stellaar Logo" 
              width={200} 
              height={70} 
              className="h-20 w-auto object-contain mb-8"
            />

            <p className="text-zinc-500 max-w-sm mb-10 leading-relaxed text-lg">
              Nagpur’s most desirable premium family club. Where wellness, community, and luxury meet.
            </p>
            <div className="flex gap-6">
              <a href="https://www.instagram.com/thestellaarnagpur" className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://www.facebook.com" className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-8.783h-2.954v-3.429h2.954v-2.527c0-2.925 1.787-4.516 4.396-4.516 1.25 0 2.324.093 2.636.134v3.057h-1.81c-1.42 0-1.694.675-1.694 1.664v2.188h3.385l-.442 3.429h-2.943v8.783h6.113c.733 0 1.325-.593 1.325-1.324v-21.351c0-.732-.592-1.325-1.325-1.325z"/></svg>
              </a>
              <a href="https://www.twitter.com" className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-6 md:mb-8">Location</h5>
            <div className="text-zinc-400 leading-loose text-sm md:text-base space-y-1">
              <p className="font-semibold text-zinc-300">A unit of Triovertical Megaventure Pvt Ltd.</p>
              <p>79, Prashant Nagar,</p>
              <p>Behind Mount Carmel School,</p>
              <p>Ajni, Nagpur</p>
              <p>Maharashtra 440015</p>
            </div>
            <a href="https://maps.google.com" className="inline-block mt-4 text-[#D4AF37] text-sm font-semibold border-b border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all pb-1">Get Directions</a>
          </div>

          <div>
            <h5 className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-6 md:mb-8">Connect</h5>
            <p className="text-zinc-400 mb-2 text-sm">Member Inquiries:</p>
            <p className="text-lg md:text-xl font-semibold mb-6">+91 8668647116</p>
            <p className="text-zinc-400 mb-2 text-sm">Support:</p>
            <p className="text-lg md:text-xl font-semibold">+91 7888005995</p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-16 md:mt-24 pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-600 text-xs md:text-sm text-center md:text-left">© 2026 Triovertical Megaventure Pvt Ltd. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-zinc-400 text-[9px] md:text-[10px] uppercase tracking-widest font-bold">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
      
      {/* Sticky WhatsApp Button */}
      <a 
        href="https://wa.me/917888005995" 
        target="_blank" 
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-[100]"
      >
        <svg width="32" height="32" fill="white" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946-0-6.556 5.332-11.888 11.888-11.888 3.176 0 6.161 1.237 8.404 3.48s3.481 5.229 3.481 8.404c0 6.556-5.332 11.888-11.888 11.888-2.016 0-3.995-.512-5.756-1.487l-6.229 1.696zm6.136-4.22c1.604.953 3.146 1.455 4.717 1.455 5.394 0 9.782-4.388 9.782-9.782 0-2.612-1.017-5.067-2.862-6.913-1.846-1.846-4.301-2.863-6.913-2.863-5.394 0-9.783 4.388-9.783 9.782 0 1.954.582 3.518 1.682 5.067l-1.008 3.682 3.787-.991zM11.9 14.1c-.2-.1-.4-.1-.6-.2-.4-.2-.8-.4-1.1-.7-.3-.3-.6-.7-.8-1.1-.1-.2-.2-.4-.2-.6 0-.2.1-.4.2-.6.1-.2.2-.4.3-.5.1-.1.2-.2.2-.3s.1-.2 0-.3c-.1-.1-.4-.9-.5-1.2-.1-.3-.2-.6-.3-.7-.1-.1-.2-.1-.3-.1s-.3 0-.5.1c-.2 0-.4.1-.6.3-.2.2-.4.4-.5.7-.1.3-.2.6-.2.9 0 .6.2 1.2.5 1.8.3.6.7 1.1 1.2 1.6.5.5 1.1.9 1.7 1.2.6.3 1.2.5 1.9.5.3 0 .6-.1.9-.2.3-.1.5-.3.7-.5.2-.2.3-.4.3-.6.1-.2.1-.4.1-.5 0-.1 0-.2-.1-.3z"/></svg>
      </a>
    </>
  )
}
