# getType

获取数据的数据类型

## 引入

```ts
import { getType } from '@fluffiea/utils'
```

## 使用

```ts
import { getType } from '@fluffiea/utils'

console.log(getType(''))   // out >> String
console.log(getType(12))   // out >> Number
console.log(getType(true)) // out >> Boolean
...
```

## 参数

```ts
/**
 * @param value
 * @returns
 * @since 0.0.1
 */
```

| 属性名    | 类型      | 描述           |
| --------- | --------- | -------------- |
| `value`   | `unknown` | 需要判断的类型 |
| `returns` | `string`  |                |