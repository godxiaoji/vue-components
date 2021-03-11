import { DataObject } from '../utils/types'

export interface UserFieldNames {
  label?: string
  value?: string
  children?: string
}

export interface FieldNames {
  label: string
  value: string
  children: string
}

export type Values = (string | number)[]
export type Labels = string[]

export interface ExtraData extends DataObject<any> {}

export interface DetailObject {
  valueString: string
  labelString: string
  value: Values
  label: Labels
  extraData: ExtraData[]
}

export interface UserOptionItem extends DataObject<any> {}

export interface OptionItem {
  label: string
  value: string | number
  children: OptionItem[]
  disabled: boolean
  extraData: ExtraData
}

export interface ColRow {
  label: string
  value: string | number
  hasChildren: boolean
  indexes: number[]
  values?: Values
  disabled?: boolean
  selected?: boolean
}

export type ModeNames = 'multiSelector' | 'date' | 'time' | 'datetime'
