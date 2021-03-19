export interface DetailObject {
  value: Date[]
  label: string
  rangeCount: number
}

export type CalendarType = 'single' | 'range'

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
