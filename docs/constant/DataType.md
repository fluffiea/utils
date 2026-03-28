# 数据类型

`enum DataType`

基本数据类型

-   `String`
-   `Number`
-   `Boollean`
-   `Null`
-   `Undefined`
-   `Symbol`
-   `BigInt`

复杂数据类型

-   `Object`
-   `Array`

> [!NOTE]
> 为什么添加了这么多类型？
> 
> 因为这里的 `DataType` 主要是和 `getType` 对齐的，而`getType`的实现主要是`Object.prototype.toString.call`

## 引入

```ts
import { DataType } from '@fluffiea/utils'
```

## 使用

可以直接使用

```ts
import { DataType } from '@fluffiea/utils'

console.log(DataType.String)
```

可以搭配 getType 实现类型判断

```ts
import { DataType, getType } from '@fluffiea/utils'

if (getType(value) === DataType.String) {
    console.log('It is a string')
}
```

