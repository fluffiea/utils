import { DataType } from "../constant"
import { getType } from "./getType"

/**
 * 判断是否为字符串类型
 * @param {unknown} value 需要判断的数据
 * @returns {boolean} 是否为字符串类型
 */
export const isString = (value: unknown): boolean => {
  return getType(value) === DataType.String
}