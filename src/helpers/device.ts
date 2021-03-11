export const isMobile =
  /(iPhone|iPod|Android|ios)/i.test(navigator.userAgent) ||
  'ontouchstart' in document.documentElement

export const isIOS = /(iPhone|iPod|ios)/i.test(navigator.userAgent)
