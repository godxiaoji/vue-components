import {
  PlacementType,
  SizeType,
  StateType,
  ButtonShapeType,
  ButtonPatternType,
  TagPatternType,
  AvatarShapeType,
  ColorStyle
} from './types'

export const PLACEMENT_TYPES: PlacementType[] = [
  'bottom',
  'top',
  'left',
  'right'
]

export const STATE_TYPES: StateType[] = [
  'default',
  'primary',
  'warning',
  'danger',
  'success'
]

export const SIZE_TYPES: SizeType[] = ['large', 'middle', 'small']

export const BUTTON_SHAPE_TYPES: ButtonShapeType[] = [
  'rectangle',
  'round',
  'circle',
  'square'
]

export const BUTTON_PATTERN_TYPES: ButtonPatternType[] = [
  'default',
  'solid',
  'dashed',
  'borderless',
  'gradient'
]

export const TAG_PATTERN_TYPES: TagPatternType[] = ['light', 'dark', 'plain']

export const AVATAR_SHAPE_TYPES: AvatarShapeType[] = ['circle', 'square']

export const COlOR_STYLES: ColorStyle[] = [
  'DustRed',
  'Volcano',
  'SunsetOrange',
  'CalendulaGold',
  'SunriseYellow',
  'Lime',
  'PolarGreen',
  'Cyan',
  'DaybreakBlue',
  'GeekBlue',
  'GoldenPurple',
  'Magenta'
]
