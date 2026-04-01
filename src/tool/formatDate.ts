type DateType = string | number | Date

// 月份
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

// 星期
const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

/**
 * 根据模板字符串格式化时间数据
 * @param value 需要格式化的时间数据
 * @param template 格式化模板
 * @returns 格式化后的字符串
 * @since 0.1.0
 */
export const formatDate = (value: DateType, template='YYYY/MM/DD HH:mm:ss'): string => {
  let time: Date | null = null
  // 统一数据类型
  if (value instanceof Date) {
    time = value
  } else {
    time = new Date(value)
  }
  // 读取数据
  const year = time.getFullYear()            // 年份
  const month = time.getMonth()              // 月份
  const date = time.getDate()                // 日期
  const day = time.getDay()                  // 星期
  const hour = time.getHours()               // 时
  const minute = time.getMinutes()           // 分
  const second = time.getSeconds()           // 秒
  const millisecond = time.getMilliseconds() // 毫秒

  if (template === '') {
    return ''
  }
  // 年份
  template = template.replaceAll('YYYY', String(year))
  template = template.replaceAll('YY', String(year % 100))
  // 月份
  template = template.replaceAll('MMMM', '\uE004')
  template = template.replaceAll('MMM', '\uE003')
  template = template.replaceAll('MM', '\uE002')
  template = template.replaceAll('M', '\uE001')

  template = template.replaceAll('\uE004', MONTHS[month])                      // 完整月份名
  template = template.replaceAll('\uE003', MONTHS[month].slice(0, 3))          // 缩写月份名
  template = template.replaceAll('\uE002', String(month + 1).padStart(2, '0')) // 2位数字月份
  template = template.replaceAll('\uE001', String(month + 1))                  // 不补0
  // 日期
  template = template.replaceAll('DD', String(date).padStart(2, '0'))
  // template = template.replaceAll('Do', '') // 带序号后缀
  template = template.replaceAll('D', String(date))
  // 星期
  template = template.replaceAll('dddd', '\uE004')
  template = template.replaceAll('ddd', '\uE003')
  template = template.replaceAll('dd', '\uE002')
  template = template.replaceAll('d', '\uE001')

  template = template.replaceAll('\uE004', DAYS[day])                          // 完整星期名
  template = template.replaceAll('\uE003', DAYS[day].slice(0, 3))              // 缩写星期名
  template = template.replaceAll('\uE002', DAYS[day].slice(0, 2))              // 最简星期名
  template = template.replaceAll('\uE001', String(day === 0 ? 7 : day))        // 数字星期
  // 小时
  template = template.replaceAll('HH', String(hour).padStart(2, '0'))          // 24小时制
  template = template.replaceAll('H', String(hour))
  template = template.replaceAll('hh', String(hour % 12).padStart(2, '0'))     // 12小时
  template = template.replaceAll('h', String(hour % 12))
  // 分钟
  template = template.replaceAll('mm', String(minute).padStart(2, '0'))
  template = template.replaceAll('m', String(minute))
  // 秒钟
  template = template.replaceAll('ss', String(second).padStart(2, '0'))
  template = template.replaceAll('s', String(second))
  // 毫秒
  template = template.replaceAll('SSS', String(millisecond).padStart(3, '0'))

  return template
}