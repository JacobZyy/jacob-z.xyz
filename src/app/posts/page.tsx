import React from 'react'
import { getPosts } from '@/utils'
import { BlogListSection } from '@/components'

export default async function PostList() {
  const posts = await getPosts()

  return (
    <div>
      {Array.from(posts.entries()).toSorted(([a], [b]) => Number(b) - Number(a)).map(([year, posts]) => (
        <BlogListSection key={year} posts={posts} year={year} />
      ))}
    </div>
  )
}
