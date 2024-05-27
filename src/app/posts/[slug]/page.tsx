'use server'
import { readFile, readdir } from 'fs/promises'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkSmartpants from 'remark-smartypants'
import rehypePrettyCode from 'rehype-pretty-code'
import overnight from 'overnight/themes/Overnight-Slumber.json'
import { remarkAdjustImagePaths } from '@/utils'

import './index.css'

overnight.colors['editor.background'] = 'var(--code-block-bg-color)'

interface BlogDetailProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const entries = await readdir('./public/', { withFileTypes: true })
  const dirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
  return dirs.map((dir) => ({ slug: dir }))
}

async function BlogDetail({ params: { slug } }: BlogDetailProps) {
  const filename = `./public/${slug}/index.md`
  const file = await readFile(filename, 'utf8')
  // let postComponents = {}
  // try {
  //   postComponents = await import(
  //     `../../public/${slug}/components.js`
  //   )
  // }
  // catch (e) {
  //   console.error(e)
  // }
  const { content } = matter(file)
  return (
    <div className="markdown">
      <MDXRemote
        source={content}
        // components={{
        //   ...postComponents,
        // }}
        options={{
          mdxOptions: {
            useDynamicImport: true,
            remarkPlugins: [
              // @ts-expect-error 插件没做ts适配
              remarkSmartpants,
              [remarkAdjustImagePaths, slug],
            ],
            rehypePlugins: [
              [
                // @ts-expect-error 插件没做ts适配
                rehypePrettyCode,
                {
                  theme: overnight,
                },
              ],
            ],
          },
        }}
      />
    </div>
  )
}

export default BlogDetail
