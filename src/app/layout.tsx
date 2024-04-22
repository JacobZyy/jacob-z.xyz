import type { Metadata } from 'next'
import './globals.css'
import React from 'react'
import Layout from '@/components/layout'

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Jacob-Z',
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="w-full h-full">
      <Layout>
        {children}
      </Layout>
    </html>
  )
}
