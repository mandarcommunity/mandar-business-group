import './globals.css'
import SmartAppBanner from '../components/SmartAppBanner'
import Link from 'next/link'

export const metadata = {
  title: 'Mandar Community Ecosystem',
  description: 'Connect with businesses, view products, and generate leads in a secure environment.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-gray-50 flex flex-col">
        <SmartAppBanner />
        <main className="flex-grow">
          {children}
        </main>
        
        <footer className="bg-slate-900 text-slate-400 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="text-white text-lg font-bold mb-2">Mandar Community</h3>
                <p className="text-sm">Connecting businesses in a secure ecosystem.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
                <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
              </div>
            </div>
            <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
              <p>&copy; {new Date().getFullYear()} Paxzillion Solutions LLP. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
