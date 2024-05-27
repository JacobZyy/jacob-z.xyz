import { readFile, readdir } from 'fs/promises'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { dir } from '@iconify/json'
import dayjs from 'dayjs'

export interface BlogListItemType {
  slug: string
  title: string
  date: string
  readingTime: string
}

export async function getPosts(): Promise<Map<string, BlogListItemType[]>> {
  const entries = await readdir('./public/', { withFileTypes: true })
  const dirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
  const fileContents = await Promise.all(
    dirs.map((dir) => readFile(`./public/${dir}/index.md`, 'utf8')),
  )
  const blogsMap = new Map<string, BlogListItemType[]>()

  for (let idx = 0; idx < fileContents.length; idx++) {
    const slug = dir[idx]
    const fileContent = fileContents[idx]
    const { data } = matter(fileContent)
    const matterInfo = data as Omit<BlogListItemType, 'readingTime' | 'slug'>
    const { minutes } = readingTime(fileContent)
    const blogListItem: BlogListItemType = {
      slug,
      readingTime: `${Math.round(minutes)} min`,
      ...matterInfo,
    }
    const year = dayjs(matterInfo.date).format('YYYY')
    const prevList = blogsMap.get(year) ?? []
    blogsMap.set(year, [...prevList, blogListItem])
  }

  return blogsMap
  // const posts = dirs.map((slug, idx) => {
  //   const fileContent = fileContents[idx]
  //   const { data } = matter(fileContent)
  //   const { minutes } = readingTime(fileContent)
  //   return { slug, readingTime: `${Math.round(minutes)} min`, ...data } as BlogListItemType
  // })
  // posts.sort((a, b) => {
  //   return dayjs(a.date).isBefore(b.date) ? 1 : -1
  // })
  // return posts.reduce<BlogListItemType[]>((acc, cur) => {
  //   const { date } = cur
  //   const year = Number(dayjs(date).format('YYYY'))
  //
  //   return acc
  // }, [])
  // return posts
}
