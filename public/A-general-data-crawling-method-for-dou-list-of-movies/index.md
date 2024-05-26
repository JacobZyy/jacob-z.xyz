---
title: '一种通用的豆瓣片单数据爬虫方式'
date: '2024-2-22'
---
# 一种通用的豆瓣片单数据爬虫方式

## 前言

我是前端切图仔，女朋友是统计学专业的，毕业课题是电影票房和网络口碑相关的研究，需要电影票房及评分数据。我找了一下github上相关的数据爬虫仓库，大多以python爬虫为主，或是年代久远接口失效，难以达到要求，且本人py水平仅为helloworld级的，因此选择使用ts-node重新造个爬虫轮子

## 技术选型

### 数据获取：x-crawl

* **简介:** 一个灵活的 Node.js 多功能爬虫库。灵活的使用方式和众多的功能可以帮助您快速、安全、稳定地爬取页面、接口以及文件。
* **文档：** [x-crawl](https://github.com/coder-hxl/x-crawl/blob/main/docs/cn.md)
* **选择理由:** 相较于原生的fetch或者axios等直接请求方案而言，更具有爬虫扩展性而言，后续拓展时遭遇反爬策略等也能更好处理一点，防止重复造轮子

### 页面HTML处理：cherrio

* **简介：**一个为服务端定制的，快速、灵活、实施的jQuery核心实现
* **文档：**[cheerio](https://github.com/cheeriojs/cheerio/wiki/Chinese-README)
* **选择理由：**能够以JQ的方式处理x-crawl爬取的页面HTML文档，符合前端操作习惯

## 爬取方式详解

### 基本思路

1. 获取页面的HTML
2. 解析HTML，从HTML中获取数据
3. 整理数据，输出数据文件`.csv`

### 获取页面的HTML

在片单里打开F12，点击下一页可以看到请求情况如下

![image-20240222141400391](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89ffaf8341b0403dbc9fbf54a0db735c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=960&h=924&s=157626&e=png&b=fefefe)

请求参数：

![requestParams](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e1da1ac84f246af8e8859c75e687025~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=420&h=112&s=10588&e=png&b=fcfcfc)

可以看到，豆瓣片单的请求是根据请求参数start顺序请求25项数据展示在页面上的。因此我们可以根据片单的想要爬取的开始页和结束页，以及片单对应的id，配置出一个pageUrlList

```ts
class DouListSpider {
  protected douListCode: number
  private pageList: string[]
  constructor(startPage: number, endPage: number, douListCode: number) {
    const length = startPage - endPage + 1
    this.pageList = Array.from({ length }).map((_, idx) => {
      const baseUrl = `https://www.douban.com/doulist/${douListCode}/`
      const curStartVal = (idx + startPage - 1) * 25
      const search = `?start=${curStartVal}&sort=seq&playable=0&sub_type=`
      return `${baseUrl}${search}`
    })
    this.douListCode = douListCode
  }
}
export default DouListSpider
```

为了防止被豆瓣拉黑名单，请求的时间间隔配置为3s，且配置随机的Header

```ts
export const staticHeaderList = [
  'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36 OPR/26.0.1656.60'
]
function getRandomIntInclusive(min: number, max: number) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min
}
export function getRandomHeader() {
  const max = staticHeaderList.length - 1
  const idx = getRandomIntInclusive(0, max)
  return staticHeaderList[idx]
}
```

使用x-crawl的crawlHTML方法爬取页面的DOM，最后返回HTML的列表

```ts
class DouListSpider {
  private pageList: string[]
  constructor(startPage: number, endPage: number, douListCode: number) {
    // ...
  }

  public async crawlHTMLInfos() {
    const urlList = this.pageList.map((url) => {
      const headerAgent = getRandomHeader()
      return {
        url,
        header: {
          'User-Agent': headerAgent,
        },
      }
    })
    const instance = xCrawl({
      mode: 'sync',
      intervalTime: { max: 3000, min: 1000 },
    })
    const resList = await instance.crawlHTML(urlList)
    return resList.map((res) => {
      const { data } = res ?? {}
      if (!data)
        throw new Error('no data')
      const { html: pageHtml } = data
      return pageHtml
    })
  }
}
export default DouListSpider
```

### 页面DOM结构解析

首先看片单每个元素的一些关键信息。

![listItemInfo.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a5a45514ea6a42d8b407f705bac54343~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=950&h=505&s=150186&e=png&b=faf9f9)

可以看到有以下信息：序号、电影名、评分、评价人数、简介、评语（可能是票房，可能是其他信息，也可能没有），查看DOM结构，可以拿到这些元素对应的JSPath

```js
const orderId = document.querySelector('#item735897688 > div > div.hd > span')
const name = document.querySelector('#item735897688 > div > div.bd.doulist-subject > div.title > a')
const ratingCommentInfo = document.querySelector('#item735897688 > div > div.bd.doulist-subject > div.rating')
const description = document.querySelector('#item735897688 > div > div.bd.doulist-subject > div.abstract')
const extraInfo = document.querySelector('#item735897688 > div > div.ft > div.comment-item.content > blockquote')
```

根据JSPath，写出对应的获取元素的方法如下

```ts
class DouListSpider {
  // 获取评分
  private getRateValue = (element: Cheerio<any>) => {
    const rateValue = element.find('.rating').find('.rating_nums').text()
    return Number(rateValue)
  }

  // 获取评价人数
  private getRatePersonCount = (element: Cheerio<any>) => {
    const rateInfos = element.find('.rating').children().last().text()
    const regex = /\((\d+)人评价\)/
    const match = rateInfos.match(regex) ?? []
    return Number(match[1] ?? '0')
  }

  // 获取底部信息
  private getExtraFooterInfo = (element: Cheerio<any>) => {
    const extraInfo = element.find('.ft .content .comment').text()
    const boxInfo = /[\d{.|,}]+/.exec(extraInfo)?.[0] ?? '0'
    return boxInfo.split(',').join('')
  }

  // 获取电影名称
  private getMovieNames = (element: Cheerio<any>) => {
    const target = element.find('.title a')
    const { href = '' } = target.attr() ?? {}
    if (href)
      this.urlList.push(href)
    const movieCode = Number(/\d+/.exec(href)?.[0] || '0')
    return {
      movieName: target.text().trim(),
      movieCode,
    }
  }

  // 获取orderId
  private getOrderId = (element: Cherrio<any>) => {
    return $(element).find('.mod .hd .pos').text().trim() ?? idx + 1
  }
}
export default DouListSpider
```

片单中的每一项在HTML中的结构完全相同
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/43180279f4f1479582fb1885807c83bb~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=433&h=419&s=70046&e=png&b=fefdfd)

因此选择通过类似于`document.querrySelectorAll('.doulist-item')`这种方法获取到`doulist-item`元素列表。然后遍历列表对元素进行数据提取，最后存储到数据列表中。数据结构设计如下

```ts
export interface DataListType {
  orderId: number
  movieName: string
  rateValue: number
  ratePersonCount: number
  description: string
  boxOffice: number | string

  movieCode: number
}
```

其中`movieCode`是电影的id，同步获取，方便后续的详细数据爬取拓展

```ts
class DouListSpider {
  async startCrawlPage() {
    const htmlList: string[] = await this.crawlHTMLInfos()
    htmlList.forEach((html) => {
      const $ = load(html)
      const dataItems = $('.article .doulist-item')
      if (dataItems.length === 0)
        console.log(`page get failed`)
      dataItems.each((idx, element) => {
        const orderId = $(element).find('.mod .hd .pos').text().trim() ?? idx + 1
        const movieSubject = $(element).find('.doulist-subject')
        const { movieCode, movieName } = this.getMovieNames(movieSubject)
        const rateValue = this.getRateValue(movieSubject)
        const ratePersonCount = this.getRatePersonCount(movieSubject)
        const description = this.operateDescription(movieSubject.find('.abstract').text())
        const boxOffice = this.getExtraFooterInfo($(element))
        const obj: DataListType = {
          orderId: Number(orderId),
          movieCode,
          movieName,
          rateValue: Number(rateValue),
          ratePersonCount,
          description,
          boxOffice,
        }
        this.dataList.push(obj)
      })
    })
  }
}
export default DouListSpider
```

### 数据的输出

本文采用的是拼接dataList，输出成`.csv`的方法。这个没什么好说的

```ts
class DouListSpider {
  public writeData = (fileName: string = '') => {
    const csvData = this.dataList.map(item => `${item.orderId},${item.movieCode},${item.movieName},${item.rateValue},${item.ratePersonCount},"${item.description}",${item.boxOffice}`)
    const csvString = `orderId,shouldCurId,movieName,rateValue(x/10),ratePersonCount(评价人数),description,boxOffice(票房，万美元)\n${csvData.join(
        '\n',
      )}`
    writeFileSync(`./data/data-${fileName}-${this.douListCode}.csv`, csvString, 'utf8')
  }
}
export default DouListSpider
```

考虑后续进阶的话可以采取数据库存储的方式。

## 进阶爬取展望

### 影片详情爬取

在豆瓣列表中可以获取到`movieCode`, 访问`https://movie.douban.com/subject/${movieCode}`可以获取影片详情。进一步访问子路由则可以获取更多

例如

* **影评：** `https://movie.douban.com/subject/${movieCode}/reviews`

* **短评：** `https://movie.douban.com/subject/${movieCode}/comments`

* **获奖：** `https://movie.douban.com/subject/${movieCode}/awards`

  ...

### 数据库的构建（自身学习素材）

早年间豆瓣电影有自己的公开api，但是现在似乎都难以访问。

而在页面 `https://movie.douban.com/explore`下筛选电影时会访问接口 `https://m.douban.com/rexxar/api/v2/movie/recommend`这个接口是可以爬取的。因此可以考虑通过该接口爬取电影数据，构建本地数据库。

问题的点在于该接口最大返回为500，数据很难全覆盖，所以数据完整性扔需要想办法解决

（这部分正在着手写，也属于是我自己接触后端的学习素材之一）

## 仓库地址

[douban-movie-datas-boxoffice](https://github.com/JacobZyy/douban-movie-datas-with-boxofiice)

欢迎批评建议。
