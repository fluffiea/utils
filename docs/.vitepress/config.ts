import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/utils/",
  title: "@fluffiea/utils docs",
  description: "一个 JS 工具包",
  head: [['link', { rel: 'icon', href: '/utils/logo.svg' }]],
  themeConfig: {
    // 网站 Logo
    logo: '/logo.svg',

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/constant' }
    ],

    sidebar: [
      {
        text: '简介',
        link: '/introduction',
        collapsed: false,
        items: [
          { text: '这是什么？', link: '/introduction' }
        ]
      },
      {
        text: '常量值',
        link: '/constant',
        collapsed: false,
        items: [
          { text: '数据类型', link: '/constant/DataType' }
        ]
      },
      {
        text: '类型检查',
        link: '/type-checker',
        collapsed: false,
        items: [
          { text: 'isNotEmpty', link: '/type-checker/isNotEmpty' },
          { text: 'isNumber', link: '/type-checker/isNumber' },
          { text: 'isString', link: '/type-checker/isString' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fluffiea/utils' }
    ]
  },
  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin)
    }
  }
})
