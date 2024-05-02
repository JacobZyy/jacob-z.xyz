'use server'
import React from 'react'
import { getPosts } from '@/utils'
import BlogListItem from '@/components/BlogListItem'

export default async function Home() {
  const posts = await getPosts()
  return (
    <div>
      <ul>
        <div className="w-full h-8 pt-16 pointer-events-none select-none box-content" />
        {posts.map((post, index) => {
          return (
            <BlogListItem key={post.slug} {...post} orderIdx={index} />
          )
        })}

      </ul>
    </div>
  )
}
