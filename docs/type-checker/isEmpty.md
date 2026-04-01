# isEmpty

判断数据是否非空，以下数据会被判定为空，`isEmpty`会返回`true`

-   `null`
-   `undefined`
-   `''` - 空字符串
-   `[]` - 空数组
-   `{}` - 空对象
-   空 `Set`
-   空 `Map`

## 引入

```ts
import { isEmpty } from '@fluffiea/utils'
```

## 使用

```ts
import { isEmpty } from '@fluffiea/utils'

isEmpty(value)
```

## 参数

```ts
/**
 * @param value
 * @returns
 * @since 0.1.0
 */
```



| 属性名    | 类型      | 描述           |
| --------- | --------- | -------------- |
| `value`   | `unknown` | 需要判断的类型 |
| `returns` | `boolean` |                |

