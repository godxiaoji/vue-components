import URLHandler from '@godxiaoji/url-handler'

export function queryString(queryName, defaultValue) {
  const myUrl = new URLHandler(window.location.href)

  return myUrl.query[queryName] || defaultValue
}
