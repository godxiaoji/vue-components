import { App } from 'vue'

export type SFCWithInstall<T> = T & { install(app: App): void }

export interface DataObject<T = any> {
  [propName: string]: T
}

export type StyleObject = DataObject<string>

export type UseProps = Readonly<DataObject<any>>

/**
 * Scroll
 */
export interface ScrollToOptions {
  offset: number
}
export interface ScrollToIndexOptions {
  index: number
  animated?: boolean
  viewPosition?: string | number
}
export interface ScrollToOffsetOptions {
  offset: number
  animated?: boolean
}
