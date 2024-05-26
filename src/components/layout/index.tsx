'use server'
import type { PropsWithChildren } from 'react'
import React from 'react'
import classNames from 'classnames'
import Header from './Header'
import { ibmPlexMono, jbMono, pacifico } from '@/assets/fonts'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={classNames(ibmPlexMono.variable, jbMono.variable, pacifico.variable)} theme-mode="dark">
        <div className="flex flex-col items-center">
          <Header />
          <main className="max-w-3xl">{children}</main>
        </div>
      </body>
    </html>
  )
}
export default Layout
