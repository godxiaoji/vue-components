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

export interface Validator {
  (value: any): boolean
  _type: string
}

export type DomSelector = HTMLElement | string | Document

export type EventElement = HTMLElement | Document

export interface EventCallback {
  (e: Event, $el: HTMLElement): void
}

export interface MixEventCallback {
  (res: { type: string } & DataObject<any>): void
}

export type EasingType = 'linear' | 'swing'
