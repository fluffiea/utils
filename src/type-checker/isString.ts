import { getType } from "./getType"

/**
 * 判断是否为字符串类型
 * @param {unknown} value 需要判断的数据
 * @returns {boolean} 是否为字符串类型
 * @since 0.0.1
 */
export const isString = (value: unknown): boolean => {
  // 快速判断
  if (typeof value === 'string') {
    return true
  }
  // 额外判断包装类型
  if (typeof value === 'object') {
    return getType(value) === 'String'
  }
  return false
}