import { getType } from './getType'

/**
 * 判断是否为空
 * @description
 * 以下数据会被判定为 true
 * 1. `null`
 * 2. `undefined
 * 3. `''` - 空字符串
 * 4. `[]` - 空数组
 * 5. `{}` - 空对象
 * 6. `空 Set`
 * 7. `空 Map`
 * @param {unknown} value 要判断的值
 * @returns {boolean} 是否为空
 * @since 0.2.0
 */
export const isEmpty = (value: unknown): boolean => {
  const type = getType(value)

  switch (type) {
    case "Null":
      return true
    case 'Undefined':
      return true
    case 'String':
      return (value as string).length === 0
    case 'Array':
      return (value as unknown[]).length === 0
    case 'Object':
      return Object.keys(value as Object).length === 0
    case 'Set':
      return (value as Set<unknown>).size === 0
    case 'Map':
      return (value as Map<unknown, unknown>).size === 0
    default:
      return false
  }
}