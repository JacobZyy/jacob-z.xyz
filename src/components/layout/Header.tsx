'use client'
import React from 'react'
import { Nav } from '@douyinfe/semi-ui'
import Link from 'next/link'
import classNames from 'classnames'
import { Logo } from '@/components'

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
    <Nav
      mode="horizontal"
      header={{
        logo: (
          <Link href="/">
            <Logo />
          </Link>
        ),
      }}
      footer={(
        <div className="flex flex-col items-center">
          {headerIcons.map(({ icon, href }) => {
            return (
              <Link key={`${icon}-${href}`} href={href} className="leading-none">
                <div className={classNames(icon, 'text-xl')} />
              </Link>
            )
          })}
        </div>
      )}
      className="h-16 w-full"
    >
      {headerList.map(({ title, path }) => {
        return (
          <Link key={path} href={path}>
            <Nav.Item itemKey={title} text={title} />
          </Link>
        )
      })}
    </Nav>

  )
}
