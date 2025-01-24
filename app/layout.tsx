"use client";

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Provider } from 'react-redux'
import store from './store/store'

const inter = Inter({ subsets: ['latin'] })

// Metadata needs to be in a separate constant since we're using 'use client'
const metadata = {
  title: 'QryptShield Ver 0.1.0',
  description: 'A Quantum Vulnerability Analysis Tool from Quniverse',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  )
}