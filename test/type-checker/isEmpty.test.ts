import { describe, it, expect } from 'vitest'
import { isEmpty } from '../../src'

describe('isEmpty', () => {
  // 应返回 true 的场景（空值）
  describe('should return true for empty values', () => {
    it('null 和 undefined', () => {
      expect(isEmpty(null)).toBe(true)
      expect(isEmpty(undefined)).toBe(true)
    })

    it('空字符串', () => {
      expect(isEmpty('')).toBe(true)
    })

    it('空数组', () => {
      expect(isEmpty([])).toBe(true)
    })

    it('空对象', () => {
      expect(isEmpty({})).toBe(true)
    })

    it('空 Set', () => {
      expect(isEmpty(new Set())).toBe(true)
    })

    it('空 Map', () => {
      expect(isEmpty(new Map())).toBe(true)
    })
  })

  // 应返回 false 的场景（非空值）
  describe('should return false for non-empty values', () => {
    it('非空字符串', () => {
      expect(isEmpty('hello')).toBe(false)
      expect(isEmpty('0')).toBe(false)
      expect(isEmpty(' ')).toBe(false) // 空格字符串
      expect(isEmpty('\n')).toBe(false) // 换行符
      expect(isEmpty('false')).toBe(false)
    })

    it('非空数组', () => {
      expect(isEmpty([1])).toBe(false)
      expect(isEmpty([null])).toBe(false)
      expect(isEmpty([undefined])).toBe(false)
      expect(isEmpty([''])).toBe(false)
      expect(isEmpty([1, 2, 3])).toBe(false)
    })

    it('非空对象', () => {
      expect(isEmpty({ key: 'value' })).toBe(false)
      expect(isEmpty({ key: null })).toBe(false)
      expect(isEmpty({ key: undefined })).toBe(false)
      expect(isEmpty({ '': 'empty key' })).toBe(false)
      expect(isEmpty({ a: 1, b: 2 })).toBe(false)
    })

    it('非空 Set', () => {
      expect(isEmpty(new Set([1]))).toBe(false)
      expect(isEmpty(new Set([null]))).toBe(false)
      expect(isEmpty(new Set(['']))).toBe(false)
      expect(isEmpty(new Set([1, 2, 3]))).toBe(false)
    })

    it('非空 Map', () => {
      const map1 = new Map()
      map1.set('key', 'value')
      expect(isEmpty(map1)).toBe(false)

      const map2 = new Map()
      map2.set('key', null)
      expect(isEmpty(map2)).toBe(false)

      const map3 = new Map()
      map3.set(1, 'one')
      map3.set(2, 'two')
      expect(isEmpty(map3)).toBe(false)
    })

    it('数字', () => {
      expect(isEmpty(42)).toBe(false)
      expect(isEmpty(0)).toBe(false)
      expect(isEmpty(-42)).toBe(false)
      expect(isEmpty(3.14)).toBe(false)
      expect(isEmpty(NaN)).toBe(false)
      expect(isEmpty(Infinity)).toBe(false)
    })

    it('布尔值', () => {
      expect(isEmpty(true)).toBe(false)
      expect(isEmpty(false)).toBe(false)
    })

    it('函数', () => {
      expect(isEmpty(() => {})).toBe(false)
      expect(isEmpty(function() {})).toBe(false)
    })

    it('Symbol 和 BigInt', () => {
      expect(isEmpty(Symbol())).toBe(false)
      expect(isEmpty(Symbol('test'))).toBe(false)
      expect(isEmpty(42n)).toBe(false)
    })

    it('Date 对象', () => {
      expect(isEmpty(new Date())).toBe(false)
    })

    it('正则表达式', () => {
      expect(isEmpty(/regex/)).toBe(false)
    })

    it('包装对象', () => {
      expect(isEmpty(new String('hello'))).toBe(false)
      expect(isEmpty(new Number(42))).toBe(false)
      expect(isEmpty(new Boolean(true))).toBe(false)
    })
  })

  // 边界场景测试
  describe('edge cases', () => {
    it('包含空值的数组应该返回 false', () => {
      expect(isEmpty([null])).toBe(false)
      expect(isEmpty([undefined])).toBe(false)
      expect(isEmpty([''])).toBe(false)
      expect(isEmpty([{}])).toBe(false)
    })

    it('包含空值的 Set 应该返回 false', () => {
      expect(isEmpty(new Set([null]))).toBe(false)
      expect(isEmpty(new Set([undefined]))).toBe(false)
      expect(isEmpty(new Set(['']))).toBe(false)
    })

    it('包含空值的 Map 应该返回 false', () => {
      const map1 = new Map()
      map1.set('key', null)
      expect(isEmpty(map1)).toBe(false)

      const map2 = new Map()
      map2.set('key', undefined)
      expect(isEmpty(map2)).toBe(false)

      const map3 = new Map()
      map3.set('key', '')
      expect(isEmpty(map3)).toBe(false)
    })

    it('包含空键值的对象应该返回 false', () => {
      expect(isEmpty({ '': 'value' })).toBe(false)
      expect(isEmpty({ key: '' })).toBe(false)
    })

    it('只有原型链属性的对象应该返回 true', () => {
      const obj = Object.create({ inherited: 'value' })
      expect(isEmpty(obj)).toBe(true) // 自身没有属性
    })

    it('具有不可枚举属性的对象应该返回 true', () => {
      const obj = {}
      Object.defineProperty(obj, 'hidden', {
        value: 'secret',
        enumerable: false
      })
      // Object.keys 只返回可枚举属性，所以长度为 0
      expect(isEmpty(obj)).toBe(true)
    })

    it('Set 和 Map 的长度判断', () => {
      const set = new Set()
      set.add(1)
      set.delete(1)
      expect(isEmpty(set)).toBe(true)

      const map = new Map()
      map.set('key', 'value')
      map.delete('key')
      expect(isEmpty(map)).toBe(true)
    })
  })
})