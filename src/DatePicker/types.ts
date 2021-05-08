export type ModeName =
  | 'date'
  | 'time'
  | 'datetime'
  | 'minute-second'
  | 'hour-minute'
  | 'hour-minute-second'
  | 'day-hour'
  | 'month-day'
  | 'month-day-hour'
  | 'month-day-hour-minute'
  | 'year-month'
  | 'year-month-day'
  | 'year-month-day-hour'
  | 'year-month-day-hour-minute'
  | 'year-month-day-hour-minute-second'

export interface DateDetailObject {
  value: Date | null
  valueArray: number[]
  formatted: string
}

export interface ChangeArgs extends DateDetailObject {
  type: 'change'
}

export type ColName = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'

export interface OptionFilter {
  (number: number, type: ColName): boolean
}
