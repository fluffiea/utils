# isNotEmpty

判断数据是否非空，以下数据会被判定为空，`isNotEmpty`会返回`false`

-   `null`
-   `undefined`
-   `''` - 空字符串
-   `[]` - 空数组
-   `{}` - 空对象
-   空 `Set`
-   空 `Map`

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
| `returns` | `boolean` |                |

