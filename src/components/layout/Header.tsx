import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { ThemeTrigger } from './ThemeTrigger'

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

export default function Header() {
  return (
    <div
      className="flex h-14 w-full max-w-3xl items-center justify-between font-bold"
    >
      <div className="font-pacifico">
        <Link
          className="bg-gradient-to-r from-base-content bg-[length:0%_2px] bg-left-bottom bg-no-repeat text-4xl transition-all hover:bg-[length:100%_2px] to-base-content"
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
        <ThemeTrigger />
      </div>
    </div>

  )
}
