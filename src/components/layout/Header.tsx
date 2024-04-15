import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { pacifico } from '@/assets/fonts'

interface HeaderListType {
  title: string
  path: string
}

const headerList: HeaderListType[] = [{
  title: 'Posts',
  path: '/posts',
}]

const Header: React.FC = () => {
  return (
    <div
      className="flex h-14 w-full max-w-3xl content-between items-center font-bold"
    >
      <div className={classNames(pacifico.className)}>
        <Link className="bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-left-bottom bg-no-repeat text-4xl transition-all hover:bg-[length:100%_2px]" href="/">Jacob</Link>
      </div>
      <div className="flex gap-1">
        {headerList.map(({ title, path }) => {
          return (
            <div key={path}>
              <Link href={path}>{title}</Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Header
