import { DataType } from "../constant"
import { getType } from "./getType"

/**
 * 判断是否为数字类型
 * @param {unknown} value 需要判断的数据
 * @returns {boolean} 是否为数字类型
 */
export const isNumber = (value: unknown): boolean => {
  return getType(value) === DataType.Number
}