import { describe, it, expect } from 'vitest'
import { isNotEmpty } from '../../src'

describe('isNotEmpty', () => {
  // 应返回 false 的场景（空值）
  describe('should return false for empty values', () => {
    it('null 和 undefined', () => {
      expect(isNotEmpty(null)).toBe(false)
      expect(isNotEmpty(undefined)).toBe(false)
    })

    it('空字符串', () => {
      expect(isNotEmpty('')).toBe(false)
    })

    it('空数组', () => {
      expect(isNotEmpty([])).toBe(false)
    })

    it('空对象', () => {
      expect(isNotEmpty({})).toBe(false)
    })
  })

  // 应返回 true 的场景（非空值）
  describe('should return true for non-empty values', () => {
    it('非空字符串', () => {
      expect(isNotEmpty('hello')).toBe(true)
      expect(isNotEmpty('0')).toBe(true)
      expect(isNotEmpty(' ')).toBe(true) // 空格字符串
      expect(isNotEmpty('\n')).toBe(true) // 换行符
      expect(isNotEmpty('false')).toBe(true)
    })

    it('非空数组', () => {
      expect(isNotEmpty([1])).toBe(true)
      expect(isNotEmpty([null])).toBe(true)
      expect(isNotEmpty([undefined])).toBe(true)
      expect(isNotEmpty([''])).toBe(true)
      expect(isNotEmpty([1, 2, 3])).toBe(true)
    })

    it('非空对象', () => {
      expect(isNotEmpty({ key: 'value' })).toBe(true)
      expect(isNotEmpty({ key: null })).toBe(true)
      expect(isNotEmpty({ key: undefined })).toBe(true)
      expect(isNotEmpty({ '': 'empty key' })).toBe(true)
      expect(isNotEmpty({ a: 1, b: 2 })).toBe(true)
    })

    it('数字', () => {
      expect(isNotEmpty(42)).toBe(true)
      expect(isNotEmpty(0)).toBe(true)
      expect(isNotEmpty(-42)).toBe(true)
      expect(isNotEmpty(3.14)).toBe(true)
      expect(isNotEmpty(NaN)).toBe(true)
      expect(isNotEmpty(Infinity)).toBe(true)
    })

    it('布尔值', () => {
      expect(isNotEmpty(true)).toBe(true)
      expect(isNotEmpty(false)).toBe(true)
    })

    it('函数', () => {
      expect(isNotEmpty(() => {})).toBe(true)
      expect(isNotEmpty(function() {})).toBe(true)
    })

    it('Symbol 和 BigInt', () => {
      expect(isNotEmpty(Symbol())).toBe(true)
      expect(isNotEmpty(Symbol('test'))).toBe(true)
      expect(isNotEmpty(42n)).toBe(true)
    })

    it('Date 对象', () => {
      expect(isNotEmpty(new Date())).toBe(true)
    })

    it('正则表达式', () => {
      expect(isNotEmpty(/regex/)).toBe(true)
    })

    it('包装对象', () => {
      expect(isNotEmpty(new String('hello'))).toBe(true)
      expect(isNotEmpty(new Number(42))).toBe(true)
      expect(isNotEmpty(new Boolean(true))).toBe(true)
    })
  })

  // 边界场景测试
  describe('edge cases', () => {
    it('包含空值的数组应该返回 true', () => {
      expect(isNotEmpty([null])).toBe(true)
      expect(isNotEmpty([undefined])).toBe(true)
      expect(isNotEmpty([''])).toBe(true)
      expect(isNotEmpty([{}])).toBe(true)
    })

    it('包含空键值的对象应该返回 true', () => {
      expect(isNotEmpty({ '': 'value' })).toBe(true)
      expect(isNotEmpty({ key: '' })).toBe(true)
    })

    it('数组长度为 0 应该返回 false', () => {
      expect(isNotEmpty([])).toBe(false)
    })

    it('对象键数量为 0 应该返回 false', () => {
      expect(isNotEmpty({})).toBe(false)
    })

    it('只有原型链属性的对象应该返回 false', () => {
      const obj = Object.create({ inherited: 'value' })
      expect(isNotEmpty(obj)).toBe(false) // 自身没有属性
    })

    it('具有不可枚举属性的对象应该返回 false', () => {
      const obj = {}
      Object.defineProperty(obj, 'hidden', {
        value: 'secret',
        enumerable: false
      })
      // Object.keys 只返回可枚举属性，所以长度为 0
      expect(isNotEmpty(obj)).toBe(false)
    })
  })
})