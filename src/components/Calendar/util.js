import { cloneData, isDate, isArray } from '../../helpers/util'
import dayjs from 'dayjs'

export const DEFAULT_MONTH_RANGE = 6
export const TYPE_NAMES = ['single', 'range']

export function getDefaultDetail() {
  return {
    value: [],
    label: ''
  }
}

export function cloneDetail(detail) {
  const newDetail = cloneData(detail)

  newDetail.value.forEach((v, k) => {
    newDetail.value[k] = cloneDate(v)
  })
  return newDetail
}

export function cloneDate(date) {
  return dayjs(date).toDate()
}

export function isSameDate(a, b) {
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

export function parseValues(val, type) {
  const values = []

  if (val == null || val === 0 || val === '') {
    return values
  }

  if (isArray(val)) {
    if (val[0] != null && dayjs(val[0]).isValid()) {
      values.push(
        dayjs(val[0])
          .startOf('day')
          .valueOf()
      )
    }
    if (val[1] != null && dayjs(val[1]).isValid()) {
      values.push(
        dayjs(val[1])
          .startOf('day')
          .valueOf()
      )
    }
  } else if (dayjs(val).isValid()) {
    values.push(
      dayjs(val)
        .startOf('day')
        .valueOf()
    )
  }
  if (values[0] && (!values[1] || values[1] < values[0])) {
    values[1] = dayjs(values[0])
      .add(1, 'day')
      .valueOf()
  }

  if (values.length > 0 && type !== 'range') {
    values[1] = 0
  }
  return values
}

export function getDetail([start, end], type) {
  const detail = getDefaultDetail()

  if (start) {
    if (type === 'range') {
      if (start && end) {
        detail.value.push(dayjs(start).toDate())
        detail.value.push(dayjs(end).toDate())
        if (start === end) {
          detail.label = dayjs(start).format('YYYY-MM-DD')
        } else {
          detail.label = [
            dayjs(start).format('MM-DD'),
            dayjs(end).format('MM-DD')
          ].join(' ~ ')
        }

        detail.rangeCount = Math.floor((end - start) / (24 * 3600 * 1000)) + 1
      }
    } else {
      detail.value.push(dayjs(start).toDate())
      detail.label = dayjs(start).format('YYYY-MM-DD')
      detail.rangeCount = 1
    }
  }

  return detail
}
