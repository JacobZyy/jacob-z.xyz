import { visit } from 'unist-util-visit'

export function remarkAdjustImagePaths(slug: string) {
  return (tree: any) => {
    visit(tree, 'image', (node) => {
      // console.log('node.url', options, node.url)
      // // 只修改相对路径
      if (!node.url.startsWith('http') && !node.url.startsWith('/'))
        node.url = `/${slug}/${node.url}`
    })
  }
}
