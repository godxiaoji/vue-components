/**
 * 格式化输入值为数字
 * @param {String|Number} value
 * @param {Number} decimalLength
 */
export function formatInputNumber(value, decimalLength = null) {
  if (value == null || value === '') {
    return ''
  }

  const isNegative = value.toString().indexOf('-') === 0

  const match = value.toString().match(/[\d-.]+/)

  if (match && match[0]) {
    value = match[0].replace(/\.+/g, '.').replace(/-+/g, '')

    if (decimalLength > 0) {
      const arr = value.split('.')
      if (arr[1] && arr[1].length > decimalLength) {
        value = parseFloat(value).toFixed(decimalLength)
      }
    } else if (decimalLength === 0) {
      value = parseInt(value).toString()
    }

    return (isNegative ? '-' : '') + value
  }

  return ''
}

/**
 * 格式化输入值为整数(0-9)
 * @param {String|Number} value
 */
export function formatInputDigit(value) {
  if (value == null || value === '') {
    return ''
  }

  const match = value.toString().match(/\d+/)

  return (match && match[0]) || ''
}
