import { isEmpty } from "./isEmpty"

/**
 * 判断数据非空
 * @description
 * 以下数据会被判定为 false
 * 1. `null`
 * 2. `undefined
 * 3. `''` - 空字符串
 * 4. `[]` - 空数组
 * 5. `{}` - 空对象
 * 6. `空 Set`
 * 7. `空 Map`
 * @param {unknown} value 要判断的值
 * @returns {boolean} 是否非空
 * @since 0.0.1
 */
export const isNotEmpty = (value: unknown): boolean => {
  return !isEmpty(value)
}