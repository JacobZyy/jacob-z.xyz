'use client'
import type { PropsWithChildren } from 'react'
import React, { useState } from 'react'
import classNames from 'classnames'
import Header from './Header'
import { ibmPlexMono, spaceMono } from '@/assets/fonts'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<'retro' | 'coffee'>('retro')

  return (
    <body className={classNames(ibmPlexMono.variable, spaceMono.variable, 'w-full h-full')} data-theme={currentTheme}>
      <div className="flex flex-col items-center">
        <Header setCurrentTheme={setCurrentTheme} currentTheme={currentTheme} />
        <main>{children}</main>
      </div>
    </body>

  )
}
export default Layout
