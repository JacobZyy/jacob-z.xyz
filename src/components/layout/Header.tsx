'use client'
import type { Dispatch, SetStateAction } from 'react'
import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { pacifico } from '@/assets/fonts'

interface HeaderProps {
  currentTheme: 'retro' | 'coffee'
  setCurrentTheme: Dispatch<SetStateAction<'retro' | 'coffee'>>
}

interface HeaderListType {
  title: string
  path: string
}

interface HeaderIconsType {
  icon: string
  href: string
}

const headerList: HeaderListType[] = [{
  title: 'Posts',
  path: '/posts',
}]

const headerIcons: HeaderIconsType[] = [
  {
    icon: 'icon-[lucide--github]',
    href: 'https://github.com/JacobZyy',
  },
]

const Header: React.FC<HeaderProps> = ({ currentTheme, setCurrentTheme }) => {
  const handleChangeTheme = () => {
    setCurrentTheme((prev) => {
      return prev === 'coffee' ? 'retro' : 'coffee'
    })
  }

  // const themeIcon = currentTheme === 'coffee' ? 'icon-[lucide--moon]' :

  return (
    <div
      className="flex h-14 w-full max-w-3xl items-center justify-between font-bold"
    >
      <div className={classNames(pacifico.className)}>
        <Link
          className="bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-left-bottom bg-no-repeat text-4xl transition-all hover:bg-[length:100%_2px]"
          href="/"
        >
          Jacob
        </Link>
      </div>
      <div className="flex h-full gap-1 p-4 text-base">
        {headerList.map(({ title, path }) => {
          return (
            <div className="text-center" key={path}>
              <Link href={path}>{title}</Link>
            </div>
          )
        })}
        {headerIcons.map(({ icon, href }) => (
          <Link key={href} href={href} target="_blank">
            <span className={classNames(icon, 'w-6 h-6')}></span>
          </Link>
        ))}
        {/* <div className={classNames(themeIcon, 'w-6 cursor-pointer h-6')} onClick={handleChangeTheme} /> */}
        <label className="swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" checked={currentTheme === 'retro'} onChange={handleChangeTheme} />
          {/* sun icon */}
          <span className="swap-off fill-current w-6 h-6 icon-[lucide--sun]" />
          {/* moon icon */}
          <span className="swap-on fill-current w-6 h-6 icon-[lucide--moon]" />
        </label>
      </div>
    </div>

  )
}

export default Header
