import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './navbar/page'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'QryptShield Ver 0.1.0',
  description: 'A Quantum Vulnerability Analysis Tool from Quniverse',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
