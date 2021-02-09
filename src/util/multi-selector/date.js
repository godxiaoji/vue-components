import dayjs from 'dayjs'

export function dateString2Array(string) {
  return string.match(/^(\d+)-(\d+)-(\d+)$/).splice(1, 3)
}

export function timeString2Array(string) {
  return string.match(/^(\d+):(\d+):(\d+)$/).splice(1, 3)
}

export function datetimeString2Array(string) {
  return string.match(/^(\d+)-(\d+)-(\d+)\s(\d+):(\d+):(\d+)$/).splice(1, 6)
}

function num2Str(num) {
  return num >= 10 ? num.toString() : '0' + num
}

export function parseDateList(index, parent, options = {}) {
  const list = []
  const now = Date.now()

  if (index === 0) {
    // 年
    const year = new Date().getFullYear()
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

    const d = dayjs(parent.values[0]).toDate()

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
    let d = dayjs(parent.values.join('-'))
    const min = 1
    const max = d.daysInMonth()

    d = d.toDate()

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
