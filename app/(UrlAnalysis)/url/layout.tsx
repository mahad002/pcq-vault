"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '../../navbar/page'
import { Provider } from 'react-redux'
import store from '../../store/store'

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body className={inter.className}><Provider store = {store}>{children}</Provider></body>
    </html>
  )
}
