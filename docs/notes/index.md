# 这是什么？

`@fluffiea/utils` 是一个`JS`常用方法的工具集合

## 使用

支持`ESM`和`CommmonJS`两种导入方式

:::tabs

== ESM 
```ts
import { isNumber } from '@fluffiea/utils'

if (isNumber(22)) {
    console.log('pass')
}
```

== CommonJS
```ts
const { isNumber } = require('@fluffiea/utils')

if (isNumber(22)) {
    console.log('pass')
}
```
:::

