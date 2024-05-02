'use server'
import dayjs from 'dayjs'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import type { BlogListItemType } from '@/utils'

import './index.css'

type BlogListItemProps = {
  orderIdx: number
} & BlogListItemType

export default async function BlogListItem(props: BlogListItemProps) {
  const { title, date, slug, readingTime, orderIdx } = props
  const styles: CSSProperties = {
    animationDelay: `${orderIdx * 0.05}s`,
  }
  const shownDate = dayjs(date).format('MMM DD')
  return (
    <div className="opacity-0 animate-fade-in" style={styles}>
      <Link className="blog-list-item" href={`/${slug}/`}>
        <h2 className="font-bold text-xl">{title}</h2>
        <div className="text-sm opacity-50 shrink-0">
          {`${shownDate} · ${readingTime}`}
        </div>
      </Link>
    </div>
  )
}
