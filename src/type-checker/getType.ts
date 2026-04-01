/**
 * 获取数据类型
 * @param {unknown} value 需要获取类型的数据
 * @returns {string} 数据类型
 * @since 0.0.1
 */
export const getType = (value: unknown): string => {
  return Object.prototype.toString.call(value).slice(8, -1)
}