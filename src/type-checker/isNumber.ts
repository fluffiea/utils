import { getType } from "./getType"

/**
 * 判断是否为数字类型
 * @param {unknown} value 需要判断的数据
 * @returns {boolean} 是否为数字类型
 * @since 0.0.1
 */
export const isNumber = (value: unknown): value is number => {
  // 快速判断
  if (typeof value === 'number') {
    return true
  }
  // 额外判断包装类型 Number
  if (typeof value === 'object') {
    return getType(value) === 'Number'
  }
  return false
}