import Exception from '../helpers/exception'

export interface ApiOptionsSuccess {
  (...args: any[]): void
}

export interface ApiOptionsFail {
  (e: Exception): void
}

export interface ApiOptionsComplete {
  (): void
}

export interface ApiOptions {
  success?: ApiOptionsSuccess
  fail?: ApiOptionsFail
  complete?: ApiOptionsComplete
  [propName: string]: any
}
