# debounce

防抖函数，生成一个支持防抖的函数

## 引入

```ts
import { debounce } from '@fluffiea/utils'
```

## 使用

```ts
import { debounce } from '@fluffiea/utils'

const fn = (value) => {
    console.log(`${value} * 2 is ${value * 2}`)
}

const debounced = debounce(fn, 1000)
debounced(1)
debounced(2)
debounced(3)

// 打印结果为最后一次调用的结果，即 out >> 3 * 2 is 6
```

## 参数

```ts
/**
 * @param func
 * @param delay
 * @returns
 * @since 0.1.0
 */
```



| 属性名    | 类型       | 描述                 |
| --------- | ---------- | -------------------- |
| `func`    | `function` | 需要防抖的函数       |
| `delay`   | `number`   | 防抖阈值，单位为毫秒 |
| `returns` | `function` | 具有防抖功能的新函数 |
