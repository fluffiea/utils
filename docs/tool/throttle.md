# throttle

节流函数，生成一个支持节流的函数

## 引入

```ts
import { throttle } from '@fluffiea/utils'
```

## 使用

```ts
import { throttle } from '@fluffiea/utils'

const fn = (value) => {
    console.log(`${value} * 2 is ${value * 2}`)
}

const throttled = throttle(fn, 1000)
throttled(1)
throttled(2)
throttled(3)

// 打印结果为第一次调用的结果，即 out >> 3 * 2 is 6
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