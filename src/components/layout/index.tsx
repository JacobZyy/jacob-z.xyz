import type { PropsWithChildren } from 'react'
import React from 'react'
import Header from './Header'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <main>{children}</main>
    </div>
  )
}
export default Layout
