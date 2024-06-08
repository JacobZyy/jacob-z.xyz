// noinspection JSUnresolvedReference

import semiBase from '@douyinfe/semi-next'

/** @type {import('@douyinfe/semi-next').SemiNextOptions} */
const semiConfig = {
  omitCss: true,
}

const semi = semiBase.default(semiConfig)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // output: 'export',
}

export default semi(nextConfig)
