import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { throttle } from '../../src'

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  describe('基本功能', () => {
    it('第一次调用应该立即执行', () => {
      const fn = vi.fn()
      const throttledFn = throttle(fn, 1000)

      throttledFn()
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('在延迟时间内再次调用不应该执行', () => {
      const fn = vi.fn()
      const throttledFn = throttle(fn, 1000)

      throttledFn()
      expect(fn).toHaveBeenCalledTimes(1)

      throttledFn()
      expect(fn).toHaveBeenCalledTimes(1)

      vi.advanceTimersByTime(500)
      throttledFn()
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('延迟时间结束后应该可以再次执行', () => {
      const fn = vi.fn()
      const throttledFn = throttle(fn, 1000)

      throttledFn()
      expect(fn).toHaveBeenCalledTimes(1)

      vi.advanceTimersByTime(1000)
      throttledFn()
      expect(fn).toHaveBeenCalledTimes(2)
    })

    it('应该传递正确的参数', () => {
      const fn = vi.fn()
      const throttledFn = throttle(fn, 1000)

      throttledFn('hello', 123, { key: 'value' })
      expect(fn).toHaveBeenCalledWith('hello', 123, { key: 'value' })
    })

    it('应该返回一个函数', () => {
      const fn = vi.fn()
      const throttledFn = throttle(fn, 1000)

      expect(typeof throttledFn).toBe('function')
      expect(throttledFn).not.toBe(fn)
    })
  })

  describe('this 绑定', () => {
    it('使用 call 调用时应该正确绑定 this', () => {
      const obj = { name: 'test' }
      let actualThis: unknown = null

      function fn(this: unknown) {
        actualThis = this
      }

      const throttledFn = throttle(fn, 1000)
      throttledFn.call(obj)

      expect(actualThis).toBe(obj)
    })

    it('使用 apply 调用时应该正确绑定 this', () => {
      const obj = { name: 'test' }
      let actualThis: unknown = null

      function fn(this: unknown) {
        actualThis = this
      }

      const throttledFn = throttle(fn, 1000)
      throttledFn.apply(obj)

      expect(actualThis).toBe(obj)
    })

    it('作为对象方法调用时应该正确绑定 this', () => {
      const obj = {
        name: 'test',
        fn(this: unknown) {
          return this
        }
      }

      let actualThis: unknown = null
      const spy = vi.fn(function(this: unknown) {
        actualThis = this
      })

      obj.fn = spy
      const throttledFn = throttle(obj.fn, 1000)

      const objWithThrottled = {
        ...obj,
        throttledFn
      }
      objWithThrottled.throttledFn()

      expect(spy).toHaveBeenCalled()
      expect(actualThis).toBe(objWithThrottled)
    })

    it('类实例方法应该正确绑定 this', () => {
      class TestClass {
        public value = 42
      }

      const instance = new TestClass()
      let actualValue: number | undefined

      const spy = vi.fn(function(this: TestClass) {
        actualValue = this.value
      })

      const throttledFn = throttle(spy, 1000)
      throttledFn.call(instance)

      expect(actualValue).toBe(42)
    })
  })

  describe('边界场景', () => {
    it('延迟时间为 0 时每次调用都应该执行', () => {
      const fn = vi.fn()
      const throttledFn = throttle(fn, 0)

      throttledFn()
      expect(fn).toHaveBeenCalledTimes(1)

      throttledFn()
      expect(fn).toHaveBeenCalledTimes(2)

      throttledFn()
      expect(fn).toHaveBeenCalledTimes(3)
    })

    it('延迟时间为负数时每次调用都应该执行', () => {
      const fn = vi.fn()
      const throttledFn = throttle(fn, -100)

      throttledFn()
      expect(fn).toHaveBeenCalledTimes(1)

      throttledFn()
      expect(fn).toHaveBeenCalledTimes(2)

      throttledFn()
      expect(fn).toHaveBeenCalledTimes(3)
    })

    it('在延迟时间内多次调用只执行第一次', () => {
      const fn = vi.fn()
      const throttledFn = throttle(fn, 1000)

      throttledFn(1)
      throttledFn(2)
      throttledFn(3)

      expect(fn).toHaveBeenCalledTimes(1)
      expect(fn).toHaveBeenCalledWith(1)
    })

    it('不同的节流函数实例应该独立工作', () => {
      const fn1 = vi.fn()
      const fn2 = vi.fn()
      const throttledFn1 = throttle(fn1, 500)
      const throttledFn2 = throttle(fn2, 500)

      throttledFn1()
      throttledFn2()

      expect(fn1).toHaveBeenCalledTimes(1)
      expect(fn2).toHaveBeenCalledTimes(1)
    })

    it('延迟时间结束后才能再次执行', () => {
      const fn = vi.fn()
      const throttledFn = throttle(fn, 1000)

      throttledFn('first')
      expect(fn).toHaveBeenCalledWith('first')

      vi.advanceTimersByTime(500)
      throttledFn('second')
      expect(fn).not.toHaveBeenCalledWith('second')

      vi.advanceTimersByTime(500)
      throttledFn('third')
      expect(fn).toHaveBeenCalledWith('third')
      expect(fn).toHaveBeenCalledTimes(2)
    })
  })

  describe('异常处理', () => {
    it('当 func 不是函数时应该抛出错误', () => {
      expect(() => throttle(null as any, 1000)).toThrow('Expected a function for func')
      expect(() => throttle(undefined as any, 1000)).toThrow('Expected a function for func')
      expect(() => throttle('not a function' as any, 1000)).toThrow('Expected a function for func')
      expect(() => throttle({} as any, 1000)).toThrow('Expected a function for func')
      expect(() => throttle(123 as any, 1000)).toThrow('Expected a function for func')
    })

    it('当 delay 不是数字时应该抛出错误', () => {
      expect(() => throttle(() => {}, null as any)).toThrow('Expected a number for delay')
      expect(() => throttle(() => {}, undefined as any)).toThrow('Expected a number for delay')
      expect(() => throttle(() => {}, '1000' as any)).toThrow('Expected a number for delay')
      expect(() => throttle(() => {}, {} as any)).toThrow('Expected a number for delay')
    })

    it('当参数正确时不应该抛出错误', () => {
      expect(() => throttle(() => {}, 1000)).not.toThrow()
      expect(() => throttle(function() {}, 500)).not.toThrow()
    })
  })

  describe('实际使用场景', () => {
    it('滚动事件节流 - 第一次立即执行，后续被节流', () => {
      const handleScroll = vi.fn()
      const throttledScroll = throttle(handleScroll, 200)

      throttledScroll(1)
      expect(handleScroll).toHaveBeenCalledTimes(1)
      expect(handleScroll).toHaveBeenCalledWith(1)

      throttledScroll(2)
      throttledScroll(3)
      expect(handleScroll).toHaveBeenCalledTimes(1)

      vi.advanceTimersByTime(200)
      throttledScroll(4)
      expect(handleScroll).toHaveBeenCalledTimes(2)
      expect(handleScroll).toHaveBeenCalledWith(4)
    })

    it('按钮点击节流（防止快速重复点击）', () => {
      const handleClick = vi.fn()
      const throttledClick = throttle(handleClick, 1000)

      throttledClick()
      throttledClick()
      throttledClick()

      expect(handleClick).toHaveBeenCalledTimes(1)

      vi.advanceTimersByTime(1000)
      throttledClick()
      expect(handleClick).toHaveBeenCalledTimes(2)
    })

    it('窗口 resize 事件节流', () => {
      const handleResize = vi.fn()
      const throttledResize = throttle(handleResize, 300)

      throttledResize()
      expect(handleResize).toHaveBeenCalledTimes(1)

      throttledResize()
      expect(handleResize).toHaveBeenCalledTimes(1)

      vi.advanceTimersByTime(300)
      throttledResize()
      expect(handleResize).toHaveBeenCalledTimes(2)
    })
  })
})