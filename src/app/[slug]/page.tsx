'use server'
import { readdir } from 'fs/promises'

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

export default async function BlogDetail({ params }: BlogDetailProps) {
  return (
    <div>
      My Post:
      {params.slug}
    </div>
  )
}
