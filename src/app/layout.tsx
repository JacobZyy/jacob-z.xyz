/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import type { Metadata, Viewport } from 'next'
import Layout from '@/components/layout'
import './globals.css'

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
