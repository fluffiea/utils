import { DataType } from "../constant"

/**
 * 获取数据类型
 * @param {unknown} value 需要获取类型的数据
 * @returns {DataType} 数据类型
 */
export const getType = (value: unknown): DataType => {
  const type = Object.prototype.toString.call(value).slice(8, -1)
  return type as DataType
}