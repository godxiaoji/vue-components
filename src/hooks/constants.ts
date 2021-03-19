export const PLACEMENT_TYPES: PlacementType[] = [
  'bottom',
  'top',
  'left',
  'right'
]
export type PlacementType = 'bottom' | 'top' | 'left' | 'right'

export const STATE_TYPES: StateType[] = [
  'default',
  'primary',
  'warning',
  'danger',
  'success'
]
export type StateType =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'

export const SIZE_TYPES: SizeType[] = ['large', 'middle', 'small']
export type SizeType = 'large' | 'middle' | 'small'

export const BUTTON_SHAPE_TYPES: ButtonShapeType[] = [
  'rectangle',
  'round',
  'circle',
  'square'
]
export type ButtonShapeType = 'rectangle' | 'round' | 'circle' | 'square'

export const BUTTON_PATTERN_TYPES: ButtonPatternType[] = [
  'default',
  'solid',
  'dashed',
  'borderless',
  'gradient'
]
export type ButtonPatternType =
  | 'default'
  | 'solid'
  | 'dashed'
  | 'borderless'
  | 'gradient'

export type TagPatternType = 'light' | 'dark' | 'plain'
export const TAG_PATTERN_TYPES: TagPatternType[] = ['light', 'dark', 'plain']
