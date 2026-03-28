import { describe, it, expect } from 'vitest'
import { isNumber } from '../../src'

describe('isNumber', () => {
  // 应返回 true 的场景
  describe('should return true for numbers', () => {
    it('整数', () => {
      expect(isNumber(42)).toBe(true)
      expect(isNumber(0)).toBe(true)
      expect(isNumber(-42)).toBe(true)
    })

    it('浮点数', () => {
      expect(isNumber(3.14)).toBe(true)
      expect(isNumber(-0.5)).toBe(true)
    })

    it('特殊数字', () => {
      expect(isNumber(NaN)).toBe(true)
      expect(isNumber(Infinity)).toBe(true)
      expect(isNumber(-Infinity)).toBe(true)
      expect(isNumber(-0)).toBe(true)
    })

    it('Number 包装对象', () => {
      expect(isNumber(new Number(42))).toBe(true)
    })

    it('其他进制表示', () => {
      expect(isNumber(0xFF)).toBe(true)      // 十六进制
      expect(isNumber(0o77)).toBe(true)      // 八进制
      expect(isNumber(0b1010)).toBe(true)    // 二进制
      expect(isNumber(1e5)).toBe(true)       // 科学计数法
    })
  })

  // 应返回 false 的场景
  describe('should return false for non-numbers', () => {
    it('字符串', () => {
      expect(isNumber('')).toBe(false)
      expect(isNumber('123')).toBe(false)
      expect(isNumber('abc')).toBe(false)
      expect(isNumber('3.14')).toBe(false)
    })

    it('布尔值', () => {
      expect(isNumber(true)).toBe(false)
      expect(isNumber(false)).toBe(false)
    })

    it('null 和 undefined', () => {
      expect(isNumber(null)).toBe(false)
      expect(isNumber(undefined)).toBe(false)
    })

    it('对象和数组', () => {
      expect(isNumber({})).toBe(false)
      expect(isNumber([])).toBe(false)
      expect(isNumber([1, 2, 3])).toBe(false)
      expect(isNumber(new Date())).toBe(false)
      expect(isNumber(/regex/)).toBe(false)
    })

    it('函数', () => {
      expect(isNumber(() => {})).toBe(false)
      expect(isNumber(function() {})).toBe(false)
    })

    it('Symbol 和 BigInt', () => {
      expect(isNumber(Symbol())).toBe(false)
      expect(isNumber(42n)).toBe(false)
    })
  })
})