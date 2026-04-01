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
        text: '类型检查',
        link: '/type-checker',
        collapsed: false,
        items: [
          { text: 'getType', link: '/type-checker/getType' },
          { text: 'isEmpty', link: '/type-checker/isEmpty' },
          { text: 'isNotEmpty', link: '/type-checker/isNotEmpty' },
          { text: 'isNumber', link: '/type-checker/isNumber' },
          { text: 'isString', link: '/type-checker/isString' }
        ]
      },
      {
        text: '工具函数',
        link: '/tool',
        collapsed: false,
        items: [
          { text: 'debounce', link: '/tool/debounce' },
          { text: 'throttle', link: '/tool/throttle' },
          { text: 'formatDate', link: '/tool/formatDate' },
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
