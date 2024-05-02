'use server'
import type { PropsWithChildren } from 'react'
import React from 'react'
import classNames from 'classnames'
import { cookies } from 'next/headers'
import Header from './Header'
import { ibmPlexMono, pacifico, spaceMono } from '@/assets/fonts'
import { ThemeEnum } from '@/types'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const curCookie = cookies().get('next-js-color-scheme')?.value || ThemeEnum.light
  return (
    <html lang="en" className="w-full h-full transition-colors" data-theme={curCookie}>
      {/* <Script dangerouslySetInnerHTML={""} /> */}
      <body className={classNames(ibmPlexMono.variable, spaceMono.variable, pacifico.variable)}>
        <div className="flex flex-col items-center">
          <Header />
          <main className="max-w-2xl">{children}</main>
        </div>
      </body>
    </html>
  )
}
export default Layout
