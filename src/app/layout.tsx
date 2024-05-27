import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Layout } from '@/components'
import './globals.css'
import './semi-overwrite.scss'

export const metadata: Metadata = {
  title: 'Jacob-Z',
}

export const viewport: Viewport = {
  themeColor: 'black',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Layout>
      {children}
    </Layout>

  )
}
