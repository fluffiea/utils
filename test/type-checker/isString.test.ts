import { describe, it, expect } from 'vitest'
import { isString } from '../../src'

describe('isString', () => {
  // 应返回 true 的场景
  describe('should return true for strings', () => {
    it('普通字符串', () => {
      expect(isString('')).toBe(true)
      expect(isString('hello')).toBe(true)
      expect(isString('123')).toBe(true)
      expect(isString('true')).toBe(true)
    })

    it('包含特殊字符的字符串', () => {
      expect(isString('hello@#$%')).toBe(true)
      expect(isString('   ')).toBe(true) // 空格字符串
      expect(isString('\n\t')).toBe(true) // 转义字符
    })

    it('Unicode 和 emoji', () => {
      expect(isString('中文')).toBe(true)
      expect(isString('😀🎉')).toBe(true)
      expect(isString('こんにちは')).toBe(true)
    })

    it('模板字符串', () => {
      const name = 'world'
      expect(isString(`hello ${name}`)).toBe(true)
    })

    it('String 包装对象', () => {
      // 注意：由于使用 Object.prototype.toString，String 对象也会被识别为字符串
      expect(isString(new String('hello'))).toBe(true)
      expect(isString(Object('hello'))).toBe(true)
    })

    it('字符串形式的数字', () => {
      expect(isString('42')).toBe(true)
      expect(isString('3.14')).toBe(true)
      expect(isString('-100')).toBe(true)
    })
  })

  // 应返回 false 的场景
  describe('should return false for non-strings', () => {
    it('数字', () => {
      expect(isString(42)).toBe(false)
      expect(isString(0)).toBe(false)
      expect(isString(-42)).toBe(false)
      expect(isString(3.14)).toBe(false)
      expect(isString(NaN)).toBe(false)
      expect(isString(Infinity)).toBe(false)
    })

    it('布尔值', () => {
      expect(isString(true)).toBe(false)
      expect(isString(false)).toBe(false)
    })

    it('null 和 undefined', () => {
      expect(isString(null)).toBe(false)
      expect(isString(undefined)).toBe(false)
    })

    it('对象和数组', () => {
      expect(isString({})).toBe(false)
      expect(isString([])).toBe(false)
      expect(isString([1, 2, 3])).toBe(false)
      expect(isString({ name: 'test' })).toBe(false)
      expect(isString(new Date())).toBe(false)
      expect(isString(/regex/)).toBe(false)
    })

    it('函数', () => {
      expect(isString(() => {})).toBe(false)
      expect(isString(function() {})).toBe(false)
      expect(isString(String)).toBe(false) // String 构造函数本身
    })

    it('Symbol 和 BigInt', () => {
      expect(isString(Symbol())).toBe(false)
      expect(isString(Symbol('test'))).toBe(false)
      expect(isString(42n)).toBe(false)
    })
  })
})