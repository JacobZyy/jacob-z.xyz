import { readFile, readdir } from 'fs/promises'
import matter from 'gray-matter'
import dayjs from 'dayjs'
import readingTime from 'reading-time'

export interface BlogListItemType {
  slug: string
  title: string
  date: string
  readingTime: string
}

export async function getPosts(): Promise<BlogListItemType[]> {
  const entries = await readdir('./public/', { withFileTypes: true })
  const dirs = entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
  const fileContents = await Promise.all(
    dirs.map(dir => readFile(`./public/${dir}/index.md`, 'utf8')),
  )
  const posts = dirs.map((slug, idx) => {
    const fileContent = fileContents[idx]
    const { data } = matter(fileContent)
    const { minutes } = readingTime(fileContent)

    return { slug, readingTime: `${Math.round(minutes)} min`, ...data } as BlogListItemType
  })
  posts.sort((a, b) => {
    return dayjs(a.date).isBefore(b.date) ? 1 : -1
  })
  return posts
}
