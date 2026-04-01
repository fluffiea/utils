import { describe, it, expect } from 'vitest'
import { formatDate } from '../../src'

describe('formatDate', () => {
  const testDate = new Date(2024, 0, 15, 14, 30, 45, 123)

  describe('年份', () => {
    it('YYYY 应该输出4位年份', () => {
      expect(formatDate(testDate, 'YYYY')).toBe('2024')
    })

    it('YY 应该输出2位年份', () => {
      expect(formatDate(testDate, 'YY')).toBe('24')
    })
  })

  describe('月份', () => {
    it('MM 应该输出2位数字月份（补零）', () => {
      expect(formatDate(testDate, 'MM')).toBe('01')
    })

    it('M 应该输出不补零的月份', () => {
      expect(formatDate(testDate, 'M')).toBe('1')
    })

    it('MMM 应该输出缩写月份名', () => {
      expect(formatDate(testDate, 'MMM')).toBe('Jan')
    })

    it('MMMM 应该输出完整月份名', () => {
      expect(formatDate(testDate, 'MMMM')).toBe('January')
    })
  })

  describe('日期', () => {
    it('DD 应该输出2位日期（补零）', () => {
      expect(formatDate(testDate, 'DD')).toBe('15')
    })

    it('D 应该输出不补零的日期', () => {
      expect(formatDate(testDate, 'D')).toBe('15')
    })
  })

  describe('星期', () => {
    const monday = new Date(2024, 0, 1)
    const sunday = new Date(2024, 0, 7)

    it('dddd 应该输出完整星期名', () => {
      expect(formatDate(monday, 'dddd')).toBe('Monday')
      expect(formatDate(sunday, 'dddd')).toBe('Sunday')
    })

    it('ddd 应该输出缩写星期名', () => {
      expect(formatDate(monday, 'ddd')).toBe('Mon')
      expect(formatDate(sunday, 'ddd')).toBe('Sun')
    })

    it('dd 应该输出最简星期名', () => {
      expect(formatDate(monday, 'dd')).toBe('Mo')
      expect(formatDate(sunday, 'dd')).toBe('Su')
    })

    it('d 应该输出数字星期（0=周日）', () => {
      expect(formatDate(monday, 'd')).toBe('1')
      expect(formatDate(sunday, 'd')).toBe('7')
    })
  })

  describe('小时', () => {
    const morning = new Date(2024, 0, 15, 8, 0, 0)
    const afternoon = new Date(2024, 0, 15, 14, 0, 0)

    it('HH 应该输出2位24小时制（补零）', () => {
      expect(formatDate(morning, 'HH')).toBe('08')
      expect(formatDate(afternoon, 'HH')).toBe('14')
    })

    it('H 应该输出不补零的24小时制', () => {
      expect(formatDate(morning, 'H')).toBe('8')
      expect(formatDate(afternoon, 'H')).toBe('14')
    })

    it('hh 应该输出2位12小时制（补零）', () => {
      expect(formatDate(morning, 'hh')).toBe('08')
      expect(formatDate(afternoon, 'hh')).toBe('02')
    })

    it('h 应该输出不补零的12小时制', () => {
      expect(formatDate(morning, 'h')).toBe('8')
      expect(formatDate(afternoon, 'h')).toBe('2')
    })
  })

  describe('分钟', () => {
    const date = new Date(2024, 0, 15, 14, 5, 0)

    it('mm 应该输出2位分钟（补零）', () => {
      expect(formatDate(date, 'mm')).toBe('05')
    })

    it('m 应该输出不补零的分钟', () => {
      expect(formatDate(date, 'm')).toBe('5')
    })
  })

  describe('秒', () => {
    const date = new Date(2024, 0, 15, 14, 30, 5)

    it('ss 应该输出2位秒（补零）', () => {
      expect(formatDate(date, 'ss')).toBe('05')
    })

    it('s 应该输出不补零的秒', () => {
      expect(formatDate(date, 's')).toBe('5')
    })
  })

  describe('毫秒', () => {
    it('SSS 应该输出3位毫秒', () => {
      expect(formatDate(testDate, 'SSS')).toBe('123')
    })
  })

  describe('组合模板', () => {
    it('应该支持完整的日期时间格式', () => {
      expect(formatDate(testDate, 'YYYY-MM-DD HH:mm:ss.SSS')).toBe('2024-01-15 14:30:45.123')
    })

    it('应该支持中文格式', () => {
      expect(formatDate(testDate, 'YYYY年MM月DD日')).toBe('2024年01月15日')
    })

    it('应该支持混合格式', () => {
      expect(formatDate(testDate, 'YYYY/MM/DD dddd')).toBe('2024/01/15 Monday')
    })

    it('应该支持12小时制格式', () => {
      expect(formatDate(testDate, 'hh:mm:ss')).toBe('02:30:45')
    })
  })

  describe('边界场景', () => {
    it('应该处理2月28日', () => {
      const date = new Date(2024, 1, 28)
      expect(formatDate(date, 'YYYY-MM-DD')).toBe('2024-02-28')
    })

    it('应该处理2月29日（闰年）', () => {
      const date = new Date(2024, 1, 29)
      expect(formatDate(date, 'YYYY-MM-DD')).toBe('2024-02-29')
    })

    it('应该处理12月31日', () => {
      const date = new Date(2024, 11, 31)
      expect(formatDate(date, 'YYYY-MM-DD')).toBe('2024-12-31')
    })

    it('应该处理1月1日', () => {
      const date = new Date(2024, 0, 1)
      expect(formatDate(date, 'YYYY-MM-DD')).toBe('2024-01-01')
    })

    it('应该处理小时边界（23:59:59）', () => {
      const date = new Date(2024, 0, 1, 23, 59, 59)
      expect(formatDate(date, 'HH:mm:ss')).toBe('23:59:59')
    })

    it('应该处理小时边界（00:00:00）', () => {
      const date = new Date(2024, 0, 1, 0, 0, 0)
      expect(formatDate(date, 'HH:mm:ss')).toBe('00:00:00')
    })
  })

  describe('输入类型', () => {
    it('应该正确处理 Date 对象', () => {
      const date = new Date(2024, 0, 15)
      expect(formatDate(date, 'YYYY-MM-DD')).toBe('2024-01-15')
    })

    it('应该正确处理时间戳', () => {
      const timestamp = new Date(2024, 0, 15).getTime()
      expect(formatDate(timestamp, 'YYYY-MM-DD')).toBe('2024-01-15')
    })

    it('应该正确处理日期字符串', () => {
      expect(formatDate('2024-01-15', 'YYYY-MM-DD')).toBe('2024-01-15')
    })
  })
})