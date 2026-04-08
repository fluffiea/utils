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
      { text: 'Docs', link: '/notes/' },
      { text: 'Changelog', link: '/changelog/' },
    ],

    sidebar: {
      '/notes/': [
        {
          text: '简介',
          items: [
            { text: '这是什么？', link: '/notes/' }
          ]
        },
        {
          text: '类型检查',
          link: '/notes/type-checker/',
          collapsed: false,
          items: [
            { text: 'getType', link: '/notes/type-checker/getType' },
            { text: 'isEmpty', link: '/notes/type-checker/isEmpty' },
            { text: 'isNotEmpty', link: '/notes/type-checker/isNotEmpty' },
            { text: 'isNumber', link: '/notes/type-checker/isNumber' },
            { text: 'isString', link: '/notes/type-checker/isString' }
          ]
        },
        {
          text: '工具函数',
          link: '/notes/tool/',
          collapsed: false,
          items: [
            { text: 'debounce', link: '/notes/tool/debounce' },
            { text: 'throttle', link: '/notes/tool/throttle' },
            { text: 'formatDate', link: '/notes/tool/formatDate' },
          ]
        }
      ],
      '/changelog/': [
        { text: '更新日志', link: '/changelog/' },
        { text: 'v0.1.0', link: '/changelog/v0.1.0' },
        { text: 'v0.0.1', link: '/changelog/v0.0.1' },
      ],
    },

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
