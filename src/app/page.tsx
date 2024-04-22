'use server'
import React from 'react'
import Link from 'next/link'
import { getPosts } from '@/utils'
import BlogListItem from '@/components/BlogListItem'

export default async function Home() {
  const posts = await getPosts()
  return (
    <div>
      <ul>
        <div className="select-none relative h20 pointer-events-none">
          <span className="color-transparent absolute left-12 top-8 font-bold text-[8em]">2024</span>
        </div>
        {posts.map((post) => {
          return (
            <Link key={post.slug} href={`/${post.slug}`}>
              <BlogListItem {...post} />
            </Link>
          )
        })}

      </ul>
    </div>
  )
}
