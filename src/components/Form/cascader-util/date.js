const dayCountMap = {
  '1': 31,
  '2': 28,
  '3': 31,
  '4': 30,
  '5': 31,
  '6': 30,
  '7': 31,
  '8': 31,
  '9': 30,
  '10': 31,
  '11': 30,
  '12': 31
}

export function dateString2Array(string) {
  return string.match(/^(\d+)-(\d+)-(\d+)$/).splice(1, 3)
}

export function timeString2Array(string) {
  return string.match(/^(\d+):(\d+):(\d+)$/).splice(1, 3)
}

export function datetimeString2Array(string) {
  return string.match(/^(\d+)-(\d+)-(\d+)\s(\d+):(\d+):(\d+)$/).splice(1, 6)
}

function getDayCount(year, month) {
  let dayCount = dayCountMap[month]

  if (month === 2 && isLeapYear(year)) {
    dayCount = 29
  }

  return dayCount
}

/**
 * 是否闰年
 * @param {number} year
 */
function isLeapYear(year) {
  return (year % 4 == 0 && year % 100 !== 0) || year % 400 == 0
}

function getYear() {
  return new Date().getFullYear()
}

function num2Str(num) {
  return num >= 10 ? num.toString() : '0' + num
}

export function parseDateList(index, parent, options = {}) {
  const list = []
  const now = Date.now()

  if (index === 0) {
    // 年
    const year = getYear()
    const min = year - 100
    const max = year

    for (let i = max; i >= min; i--) {
      const yearStr = i.toString()

      list.push({
        label: yearStr,
        value: yearStr,
        labels: [yearStr],
        values: [yearStr],
        hasChildren: true
      })
    }
  } else if (index === 1) {
    // 月
    const min = 1
    const max = 12

    const d = new Date()
    d.setFullYear(parseInt(parent.values[0]))
    d.setDate(1)
    d.setHours(0)
    d.setMinutes(0)
    d.setSeconds(0)
    d.setMilliseconds(0)

    for (let i = min; i <= max; i++) {
      d.setMonth(i - 1)
      if (d.getTime() > now) {
        break
      }

      const monthStr = num2Str(i.toString())

      list.push({
        label: monthStr,
        value: monthStr,
        labels: parent.labels.concat(monthStr),
        values: parent.values.concat(monthStr),
        hasChildren: true
      })
    }
  } else if (index === 2) {
    // 日
    const min = 1
    const max = getDayCount(
      parseInt(parent.values[0]),
      parseInt(parent.values[1])
    )

    const d = new Date()
    d.setFullYear(parseInt(parent.values[0]))
    d.setMonth(parseInt(parent.values[1]) - 1)
    d.setHours(0)
    d.setMinutes(0)
    d.setSeconds(0)
    d.setMilliseconds(0)

    for (let i = min; i <= max; i++) {
      d.setDate(i)
      if (d.getTime() > now) {
        break
      }

      const dayStr = num2Str(i.toString())

      list.push({
        label: dayStr,
        value: dayStr,
        labels: parent.labels.concat(dayStr),
        values: parent.values.concat(dayStr),
        hasChildren: options.isDatetime ? true : false
      })
    }
  }

  return list
}

export function parseTimeList(index) {
  const list = []

  function getMax(index) {
    if (index === 2 || index === 1) {
      return 60
    } else if (index === 0) {
      return 24
    }
    return 0
  }

  for (let i = 0, max = getMax(index); i < max; i++) {
    const numStr = num2Str(i.toString())

    list.push({
      label: numStr,
      value: numStr,
      hasChildren: index >= 2 ? false : true
    })
  }

  return list
}

export function parseDatetimeList(index, parent) {
  if (index < 3) {
    return parseDateList(index, parent, {
      isDatetime: true
    })
  } else {
    return parseTimeList(index - 3)
  }
}

export function getDate(values) {
  const d = new Date()

  if (values[0]) {
    d.setFullYear(parseInt(values[0]))
  }
  if (values[1]) {
    d.setMonth(parseInt(values[1]) - 1)
  }
  if (values[2]) {
    d.setDate(parseInt(values[2]))
  }

  d.setHours(values[3] ? parseInt(values[3]) : 0)
  d.setMinutes(values[4] ? parseInt(values[4]) : 0)
  d.setSeconds(values[5] ? parseInt(values[5]) : 0)
  d.setMilliseconds(0)

  return d
}

export function getDateValues() {
  const d = new Date()

  return [
    d.getFullYear().toString(),
    num2Str(d.getMonth() + 1),
    num2Str(d.getDate())
  ]
}

export function getTimeValues() {
  const d = new Date()

  return [
    num2Str(d.getHours()),
    num2Str(d.getMinutes()),
    num2Str(d.getSeconds())
  ]
}

export function getDatetimeValues() {
  return getDateValues().concat(getTimeValues())
}
