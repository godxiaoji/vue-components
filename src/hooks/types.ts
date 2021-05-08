import { RuleItem, RuleType } from 'async-validator'
import { UseProps } from '../helpers/types'

export type PlacementType = 'bottom' | 'top' | 'left' | 'right'
export type StateType = 'default' | 'primary' | 'success' | 'warning' | 'danger'
export type SizeType = 'large' | 'middle' | 'small'
export type ButtonShapeType = 'rectangle' | 'round' | 'circle' | 'square'
export type ButtonPatternType =
  | 'default'
  | 'solid'
  | 'dashed'
  | 'borderless'
  | 'gradient'
export type TagPatternType = 'light' | 'dark' | 'plain'
export type AvatarShapeType = 'circle' | 'square'
export type ColorStyle =
  | 'DustRed'
  | 'Volcano'
  | 'SunsetOrange'
  | 'CalendulaGold'
  | 'SunriseYellow'
  | 'Lime'
  | 'PolarGreen'
  | 'Cyan'
  | 'DaybreakBlue'
  | 'GeekBlue'
  | 'GoldenPurple'
  | 'Magenta'

export interface OnScrollCallback {
  (
    e: Event,
    res: {
      scrollTop: number
    }
  ): void
}

export type VisibleState = 'show' | 'shown' | 'hide' | 'hidden'

export interface VisibleStateChangeArgs {
  type: string
  state: VisibleState
  [propName: string]: any
}

export interface CountTime {
  time: number
  days: string
  fullHours: string
  thousandsFullHours: string
  hours: string
  minutes: string
  seconds: string
  milliseconds: string
}

export interface FormRuleItem extends RuleItem {
  trigger?: string
}

export interface FormRules {
  [propName: string]: FormRuleItem[]
}

export type FormRuleType = RuleType

export type HookFormValue = () => any

export interface FormItemOut {
  uid: number
  getFormName: () => string
  hookFormValue: HookFormValue
  reset?: () => void
}

export interface FormGroupItemOut {
  getFormName: () => string
  validate: FormRuleValidate
}

export interface FormRuleValidate {
  (value: any, rules?: FormRuleItem[]): Promise<any>
}

export interface FormInputElement extends HTMLInputElement {
  _app_component: any
  _fxFormItemOut: FormItemOut
}

export interface FormItemProvide {
  props: UseProps
  validateAfterEventTrigger: (type: string, value: any) => void
}

export interface PopupPublicInstance {
  customCancel: (key: string, focus?: boolean) => void
  customConfirm: (res?: any, key?: string) => void
}
