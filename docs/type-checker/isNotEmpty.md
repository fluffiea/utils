# isNotEmpty

判断数据是否非空，以下数据会被判定为空，`isNotEmpty`会返回`false`

-   `null`
-   `undefined`
-   `''` - 空字符串
-   `[]` - 空数组
-   `{}` - 空对象

## 引入

```ts
import { isNotEmpty } from '@fluffiea/utils'
```

## 使用

```ts
import { isNotEmpty } from '@fluffiea/utils'

isNotEmpty(value)
```

## 参数

| 属性名   | 类型      | 描述           |
| -------- | --------- | -------------- |
| `value`  | `unknown` | 需要判断的类型 |
| `return` | `boolean` |                |

