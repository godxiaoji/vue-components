import { UseProps } from '../utils/types'
import { RuleItem, RuleType } from 'async-validator'

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
