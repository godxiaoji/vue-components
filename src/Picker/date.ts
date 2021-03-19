import type { ColRow, Values } from './types'
import dayjs from 'dayjs'

export function dateString2Array(string: string) {
  return string.match(/^(\d+)-(\d+)-(\d+)$/)?.splice(1, 3) || []
}

export function timeString2Array(string: string) {
  return string.match(/^(\d+):(\d+):(\d+)$/)?.splice(1, 3) || []
}

export function datetimeString2Array(string: string) {
  return (
    string.match(/^(\d+)-(\d+)-(\d+)\s(\d+):(\d+):(\d+)$/)?.splice(1, 6) || []
  )
}

function num2Str(num: number) {
  return num >= 10 ? num.toString() : '0' + num
}

export function parseDateList(
  index: number,
  parent?: ColRow,
  extraOptions?: any
): ColRow[] {
  const rows: ColRow[] = []
  const now = Date.now()

  if (index === 0) {
    // 年
    const year = new Date().getFullYear()
    const min = year - 100
    const max = year

    for (let i = max, j = 0; i >= min; i--, j++) {
      const yearStr = i.toString()

      rows.push({
        label: yearStr,
        value: yearStr,
        indexes: [j],
        values: [yearStr],
        hasChildren: true
      })
    }
  } else if (index === 1) {
    parent = parent as ColRow

    // 月
    const min = 1
    const max = 12

    const d = dayjs(parent.value).toDate()

    for (let i = min, j = 0; i <= max; i++, j++) {
      d.setMonth(i - 1)
      if (d.getTime() > now) {
        break
      }

      const monthStr = num2Str(i)

      rows.push({
        label: monthStr,
        value: monthStr,
        indexes: [...parent.indexes, j],
        values: [parent.value, monthStr],
        hasChildren: true
      })
    }
  } else if (index === 2) {
    parent = parent as ColRow
    // 日

    const parentValues = parent.values as Values
    const djs = dayjs(parentValues.join('-'))
    const min = 1
    const max = djs.daysInMonth()

    const d = djs.toDate()

    for (let i = min, j = 0; i <= max; i++, j++) {
      d.setDate(i)
      if (d.getTime() > now) {
        break
      }

      const dayStr = num2Str(i)

      rows.push({
        label: dayStr,
        value: dayStr,
        values: [...parentValues, dayStr],
        indexes: [...parent.indexes, j],
        hasChildren: extraOptions?.isDatetime || false
      })
    }
  }

  return rows
}

export function parseTimeList(index: number, parent?: ColRow): ColRow[] {
  const list = []
  const parentIndexes = parent?.indexes || []
  const parentValues = parent?.values || []

  function getMax(index: number) {
    if (index === 2 || index === 1) {
      return 60
    } else if (index === 0) {
      return 24
    }
    return 0
  }

  for (let i = 0, max = getMax(index); i < max; i++) {
    const numStr = num2Str(i)

    list.push({
      label: numStr,
      value: numStr,
      values: [...parentValues, numStr],
      indexes: [...parentIndexes, i],
      hasChildren: index >= 2 ? false : true
    })
  }

  return list
}

export function parseDatetimeList(index: number, parent?: ColRow): ColRow[] {
  if (index < 3) {
    return parseDateList(index, parent, {
      isDatetime: true
    })
  } else {
    return parseTimeList(index - 3, parent)
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
