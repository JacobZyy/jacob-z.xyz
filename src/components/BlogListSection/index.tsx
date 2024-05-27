import React from 'react'
import dayjs from 'dayjs'
import BlogListItem from './BlogListItem'
import type { BlogListItemType } from '@/utils'

import './index.scss'

interface Props { posts: BlogListItemType[], year: string }

export async function BlogListSection({ posts, year }: Props) {
  return (
    <ul className="px-10 pt-20 relative">
      <div className="year-title">{year}</div>
      {posts.toSorted((a, b) => dayjs(a.date).isBefore(b.date) ? 1 : -1).map((post, index) => {
        return (
          <BlogListItem key={post.slug} {...post} orderIdx={index} />
        )
      })}

    </ul>
  )
}
