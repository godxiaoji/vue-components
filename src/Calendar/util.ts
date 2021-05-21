import { cloneData, isDate, isArray } from '@/helpers/util'
import dayjs from '@/helpers/day'
import { CalendarMode, DetailObject } from './types'

export const DEFAULT_MONTH_RANGE = 6
export const MODE_NAMES: CalendarMode[] = ['single', 'range']

export function getDefaultDetail(): DetailObject {
  return {
    value: [],
    valueArray: [],
    formatted: '',
    rangeCount: 0
  }
}

export function cloneDetail(detail: DetailObject) {
  const newDetail = cloneData(detail)

  newDetail.value.forEach((v, k) => {
    newDetail.value[k] = cloneDate(v)
  })
  return newDetail
}

export function cloneDate(date: Date) {
  return dayjs(date).toDate()
}

export function isSameDateArray(a: Date[], b: Date[]) {
  if (a.length === b.length) {
    for (let i = 0; i < a.length; i++) {
      if (
        !(isDate(a[i]) && isDate(b[i]) && a[i].getTime() === b[i].getTime())
      ) {
        return false
      }
    }
  } else {
    return false
  }

  return true
}

export function parseValues(val: any, mode: CalendarMode) {
  const values: number[] = []

  if (val == null || val === 0 || val === '') {
    return values
  }

  if (isArray(val)) {
    if (val[0] != null && dayjs(val[0]).isValid()) {
      values.push(dayjs(val[0]).startOf('day').valueOf())
    }
    if (val[1] != null && dayjs(val[1]).isValid()) {
      values.push(dayjs(val[1]).startOf('day').valueOf())
    }
  } else if (dayjs(val).isValid()) {
    values.push(dayjs(val).startOf('day').valueOf())
  }
  if (values[0] && (!values[1] || values[1] < values[0])) {
    values[1] = dayjs(values[0]).add(1, 'day').valueOf()
  }

  if (values.length > 0 && mode !== 'range') {
    values[1] = 0
  }
  return values
}

export function getDetail(timeArray: number[], mode: CalendarMode) {
  const detail = getDefaultDetail()
  const start = timeArray[0]
  const end = timeArray[1]

  if (start) {
    const startDjs = dayjs(start)

    if (mode === 'range') {
      if (start && end) {
        const endDjs = dayjs(end)

        detail.value.push(startDjs.toDate())
        detail.value.push(endDjs.toDate())
        detail.valueArray.push(startDjs.toArray().slice(0, 3))
        detail.valueArray.push(endDjs.toArray().slice(0, 3))

        if (start === end) {
          detail.formatted = startDjs.format('YYYY-MM-DD')
        } else {
          detail.formatted = [
            startDjs.format('MM-DD'),
            endDjs.format('MM-DD')
          ].join(' ~ ')
        }

        detail.rangeCount = Math.floor((end - start) / (24 * 3600 * 1000)) + 1
      }
    } else {
      detail.value.push(startDjs.toDate())
      detail.valueArray.push(startDjs.toArray().slice(0, 3))
      detail.formatted = startDjs.format('YYYY-MM-DD')
      detail.rangeCount = 1
    }
  }

  return detail
}
