import dayjs from 'dayjs'
import type { BlogListItemType } from '@/utils'

export default function BlogListItem(props: BlogListItemType) {
  const { title, date, readingTime } = props
  const shownDate = dayjs(date).format('MMM DD')
  return (
    <div className="item block font-normal mb-6 mt-2 no-underline">

      <h3>{title}</h3>

      <div>{shownDate}</div>
      <div>{readingTime}</div>
    </div>
  )
}
