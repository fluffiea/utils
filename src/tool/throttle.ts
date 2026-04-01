type Throttle = <F extends (...args: any[]) => any>(
  func: F,
  delay: number,
) => (...args: Parameters<F>) => void

/**
 * 节流函数
 * @param func 需要节流的函数
 * @param delay 延迟时间，单位为毫秒
 * @returns 具有节流功能的新函数
 * @since 0.1.0
 */
export const throttle: Throttle = (func, delay) => {
  // func 类型校验
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function for func')
  }
  // delay 类型校验
  if (typeof delay !== 'number') {
    throw new TypeError('Expected a number for delay')
  }

  let isThrottled = false
  let timer: ReturnType<typeof setTimeout> | null = null

  return function(this: ThisParameterType<typeof func>, ...args: Parameters<typeof func>) {
    // 节流开关关闭且延迟时间大于 0 的时候才启动拦截
    if (isThrottled && delay > 0) {
      return
    }
    // 清除状态
    if (timer) {
      clearTimeout(timer)
    }
    isThrottled = true
    // 立即执行
    func.apply(this, args)
    timer = setTimeout(() => {
      isThrottled = false
      timer = null
    }, delay)
  }
}