import type { Metadata } from 'next'
import './globals.css'
import React from 'react'
import classNames from 'classnames'
import { ibmPlexMono, spaceMono } from '@/assets/fonts'
import Layout from '@/components/layout'

export const metadata: Metadata = {
  title: 'Jacob-Z',
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={classNames(ibmPlexMono.variable, spaceMono.variable, 'bg-orange-100')}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}
