export type PopupVisibleState = 'show' | 'shown' | 'hide' | 'hidden'

export interface PopupVisibleStateChangeArgs {
  state: PopupVisibleState
}

export interface PopupConfirmArgs {
  selected?: boolean
  confirm?: boolean
  [propName: string]: any
}

export interface PopupCancelArgs {
  [propName: string]: boolean
}

export type StateType = 'default' | 'primary' | 'success' | 'warning' | 'danger'

export type PlacementType = 'bottom' | 'top' | 'left' | 'right'
