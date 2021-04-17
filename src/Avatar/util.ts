import { isNumber } from '@/helpers/util'
import { getEnumsValue } from '@/helpers/validator'

const SIZE_TYPES = ['middle', 'large', 'small']

export const avatarProps = {
  size: {
    type: [String, Number],
    default: SIZE_TYPES[0]
  }
}

export function getAvatarSize(size: number | string) {
  if (isNumber(size)) {
    return size as number
  }

  return getEnumsValue(SIZE_TYPES, size)
}
