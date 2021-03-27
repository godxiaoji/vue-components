/**
 * 格式化文件大小值，最多保留1位小数，如：10MB，10.8KB
 * @param number 值
 * @returns string
 */
export const formatFileSize = (number: number) => {
  const map: [number, string][] = [
    [1073741824, 'GB'],
    [1048576, 'MB'],
    [1024, 'KB'],
    [0, 'bytes']
  ]

  let size = 0
  let unit = 'bytes'

  for (let i = 0; i < map.length; i++) {
    if (number >= map[i][0]) {
      size = i < map.length - 1 ? number / map[i][0] : number
      unit = map[i][1]
      break
    }
  }

  size = Math.round(size * 10) / 10

  return size + unit
}
