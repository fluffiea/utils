import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { debounce } from '../../src'

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  describe('基本功能', () => {
    it('应该在延迟时间后执行函数', () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn, 1000)

      debouncedFn()
      expect(fn).not.toHaveBeenCalled()

      vi.advanceTimersByTime(1000)
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('应该在多次调用时只执行最后一次', () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn, 1000)

      debouncedFn(1)
      debouncedFn(2)
      debouncedFn(3)

      vi.advanceTimersByTime(1000)
      expect(fn).toHaveBeenCalledTimes(1)
      expect(fn).toHaveBeenCalledWith(3)
    })

    it('应该传递正确的参数', () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn, 1000)

      debouncedFn('hello', 123, { key: 'value' })
      vi.advanceTimersByTime(1000)

      expect(fn).toHaveBeenCalledWith('hello', 123, { key: 'value' })
    })

    it('应该返回一个函数', () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn, 1000)

      expect(typeof debouncedFn).toBe('function')
      expect(debouncedFn).not.toBe(fn)
    })
  })

  describe('this 绑定', () => {
    it('使用 call 调用时应该正确绑定 this', () => {
      const obj = { name: 'test' }
      let actualThis: unknown = null
      
      function fn(this: unknown) {
        actualThis = this
      }
      
      const debouncedFn = debounce(fn, 1000)
      debouncedFn.call(obj)
      vi.advanceTimersByTime(1000)

      expect(actualThis).toBe(obj)
    })

    it('使用 apply 调用时应该正确绑定 this', () => {
      const obj = { name: 'test' }
      let actualThis: unknown = null
      
      function fn(this: unknown) {
        actualThis = this
      }
      
      const debouncedFn = debounce(fn, 1000)
      debouncedFn.apply(obj)
      vi.advanceTimersByTime(1000)

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
      const debouncedFn = debounce(obj.fn, 1000)

      // 作为对象方法调用
      const objWithDebounced = {
        ...obj,
        debouncedFn
      }
      objWithDebounced.debouncedFn()
      vi.advanceTimersByTime(1000)

      expect(spy).toHaveBeenCalled()
      expect(actualThis).toBe(objWithDebounced)
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
      
      const debouncedFn = debounce(spy, 1000)
      debouncedFn.call(instance)
      vi.advanceTimersByTime(1000)

      expect(actualValue).toBe(42)
    })
  })

  describe('边界场景', () => {
    it('延迟时间为 0 时应该延迟执行（异步）', () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn, 0)

      debouncedFn()
      expect(fn).not.toHaveBeenCalled()

      vi.advanceTimersByTime(0)
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('延迟时间为负数时应该立即执行（异步）', () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn, -100)

      debouncedFn()
      expect(fn).not.toHaveBeenCalled()

      vi.advanceTimersByTime(0)
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('在延迟时间内再次调用会重置计时器', () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn, 1000)

      debouncedFn()
      vi.advanceTimersByTime(500)
      expect(fn).not.toHaveBeenCalled()
      
      debouncedFn()
      vi.advanceTimersByTime(500)
      expect(fn).not.toHaveBeenCalled()
      
      vi.advanceTimersByTime(500)
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('不同的防抖函数实例应该独立工作', () => {
      const fn1 = vi.fn()
      const fn2 = vi.fn()
      const debouncedFn1 = debounce(fn1, 500)
      const debouncedFn2 = debounce(fn2, 500)

      debouncedFn1()
      debouncedFn2()
      
      vi.advanceTimersByTime(500)
      expect(fn1).toHaveBeenCalledTimes(1)
      expect(fn2).toHaveBeenCalledTimes(1)
    })
  })

  describe('异常处理', () => {
    it('当 func 不是函数时应该抛出错误', () => {
      expect(() => debounce(null as any, 1000)).toThrow('Expected a function for func')
      expect(() => debounce(undefined as any, 1000)).toThrow('Expected a function for func')
      expect(() => debounce('not a function' as any, 1000)).toThrow('Expected a function for func')
      expect(() => debounce({} as any, 1000)).toThrow('Expected a function for func')
      expect(() => debounce(123 as any, 1000)).toThrow('Expected a function for func')
    })

    it('当 delay 不是数字时应该抛出错误', () => {
      expect(() => debounce(() => {}, null as any)).toThrow('Expected a number for delay')
      expect(() => debounce(() => {}, undefined as any)).toThrow('Expected a number for delay')
      expect(() => debounce(() => {}, '1000' as any)).toThrow('Expected a number for delay')
      expect(() => debounce(() => {}, {} as any)).toThrow('Expected a number for delay')
    })

    it('当参数正确时不应该抛出错误', () => {
      expect(() => debounce(() => {}, 1000)).not.toThrow()
      expect(() => debounce(function() {}, 500)).not.toThrow()
    })
  })

  describe('实际使用场景', () => {
    it('搜索输入框防抖', () => {
      const searchApi = vi.fn()
      const debouncedSearch = debounce(searchApi, 500)
      
      debouncedSearch('a')
      vi.advanceTimersByTime(100)
      debouncedSearch('ap')
      vi.advanceTimersByTime(100)
      debouncedSearch('app')
      vi.advanceTimersByTime(100)
      debouncedSearch('appl')
      vi.advanceTimersByTime(100)
      debouncedSearch('apple')
      
      vi.advanceTimersByTime(500)
      
      expect(searchApi).toHaveBeenCalledTimes(1)
      expect(searchApi).toHaveBeenCalledWith('apple')
    })

    it('窗口 resize 事件防抖', () => {
      const handleResize = vi.fn()
      const debouncedResize = debounce(handleResize, 200)
      
      for (let i = 0; i < 10; i++) {
        debouncedResize()
        vi.advanceTimersByTime(50)
      }
      
      vi.advanceTimersByTime(200)
      expect(handleResize).toHaveBeenCalledTimes(1)
    })

    it('按钮防抖（防止重复提交）', () => {
      const submitForm = vi.fn()
      const debouncedSubmit = debounce(submitForm, 1000)
      
      debouncedSubmit()
      debouncedSubmit()
      debouncedSubmit()
      
      vi.advanceTimersByTime(1000)
      expect(submitForm).toHaveBeenCalledTimes(1)
    })
  })
})