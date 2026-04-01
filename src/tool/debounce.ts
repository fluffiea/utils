type Debounce = <F extends (...args: any[]) => any>(
  func: F,
  delay: number,
) => (this: ThisParameterType<F>, ...args: Parameters<F>) => void

/**
 * 防抖函数
 * @param func 需要防抖的函数
 * @param delay 延迟时间，单位为毫秒
 * @returns 具有防抖功能的新函数
 * @since 0.1.0
 */
export const debounce: Debounce = (func, delay) => {
  // func 类型校验
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function for func')
  }
  // delay 类型校验
  if (typeof delay !== 'number') {
    throw new TypeError('Expected a number for delay')
  }

  let timer: ReturnType<typeof setTimeout> | null = null

  return function(this: ThisParameterType<typeof func>, ...args: Parameters<typeof func>) {
    // 清除状态
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      func.apply(this, args)
      timer = null
    }, delay);
  }
}
