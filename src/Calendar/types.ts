export interface DetailObject {
  value: Date[]
  valueArray: number[][]
  formatted: string
  rangeCount: number
}

export type CalendarMode = 'single' | 'range'

export interface DayInfo {
  cover?: boolean
  topHighlight?: boolean
  topText?: string
  state: string
  bottomHighlight?: boolean
  bottomText?: string
  text: string
  dateString: string
  date?: Date
  timestamp: number
}

export type DayHandler = (dayInfo: DayInfo) => DayInfo

export type CalendarValue = Date | Date[] | number[] | string[] | string
