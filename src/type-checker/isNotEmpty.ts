import { getType } from "./getType"
import { DataType } from "../constant"

/**
 * 判断数据非空
 * @description
 * 以下数据会被判定为 false
 * 1. `null`
 * 2. `undefined`
 * 3. `''` - 空字符串
 * 4. `[]` - 空数组
 * 5. `{}` - 空对象
 * @param {unknown} value 要判断的值
 * @returns {boolean} 如果值非空则返回 true，否则返回 false
 */
export const isNotEmpty = (value: unknown): boolean => {
  const type = getType(value)

  switch (type) {
    case DataType.Null:
      return false
    case DataType.Undefined:
      return false
    case DataType.String:
      return value !== ''
    case DataType.Array:
      return (value as unknown[]).length > 0
    case DataType.Object:
      return Object.keys(value as object).length > 0
    default:
      return true
  }
}