import './globals.css'
import SmartAppBanner from '../components/SmartAppBanner'

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
        <footer className="bg-primary text-white py-8 text-center text-sm">
          <p>� {new Date().getFullYear()} Mandar Community Ecosystem. All rights reserved.</p>
        </footer>
      </body>
    </html>
  )
}
