import {
  computed,
  onMounted,
  SetupContext,
  ref,
  watch,
  inject,
  shallowRef,
  ComponentPublicInstance
} from 'vue'
import { isFunction, isObject } from '@/helpers/util'
import { addClassName, getScrollDom, removeClassName } from '@/helpers/dom'
import { popupZIndex } from '@/helpers/layer'
import { UseProps, DataObject } from '@/utils/types'

interface PopupPublicInstance {
  customCancel: (key: string, focus?: boolean) => void
  customConfirm: (res?: any, key?: string) => void
}

interface UseOptions {
  forbidScroll?: boolean
  afterConfirm?: Function
  afterCancel?: Function
  afterShow?: Function
  afterHidden?: Function
}

type VisibleState = 'show' | 'shown' | 'hide' | 'hidden'

interface VisibleStateChangeRes {
  type: string
  state: VisibleState
  [propName: string]: any
}

export interface PopupBridge {
  in?: (key: string, value?: any) => void
  out?: (key: string, value: any) => void
}

export type PopupRes = {
  cancel?: boolean
  detail?: DataObject<any>
} & DataObject<any>

let puid = 1
let zIndex = popupZIndex

export function getNewZIndex() {
  return zIndex++
}

export function createPopup() {
  const $wrapper = document.createElement('div')
  const id = puid++

  return {
    id,
    $wrapper
  }
}

export const popupProps = {
  visible: {
    type: Boolean,
    default: false
  },
  maskClosable: {
    type: Boolean,
    default: true
  },
  showMask: {
    type: Boolean,
    default: true
  }
}

export const popupEmits = [
  'visible-state-change',
  'update:visible',
  'cancel',
  'confirm'
]

export function usePopup(
  props: UseProps,
  { emit }: SetupContext<any>,
  useOptions: UseOptions
) {
  const apis = inject<PopupBridge>('fxApis', {})

  const isShow = ref(false)
  const zIndex = ref(popupZIndex)
  const visible2 = ref(false)
  const top = ref<string | null>(null)
  const position = ref<string | null>(null)

  let isShowing = false
  let isHiding = false
  let visibleTimer: number

  function doShow(callback: Function) {
    if (isShowing) {
      return false
    }
    isHiding = false
    isShowing = true

    clearTimeout(visibleTimer)

    useOptions.forbidScroll !== false &&
      props.showMask &&
      addClassName(document.body, 'fx-overflow-hidden')

    if (!props.showMask) {
      position.value = 'absolute'
      top.value = getScrollDom().scrollTop + 'px'
    }

    zIndex.value = getNewZIndex()
    isShow.value = true

    visibleTimer = window.setTimeout(() => {
      visible2.value = true

      visibleTimer = window.setTimeout(() => {
        isShowing = false
        callback()
      }, 210)
    }, 17)

    if (!props.visible) {
      emit('update:visible', true)
    }

    return true
  }

  function show() {
    const res = {}

    const isSuccess = doShow(() => {
      emitVisibleState('shown', res)
    })

    if (isSuccess) {
      emitVisibleState('show', res)
      afterCall('afterShow', res)
    }
  }

  function _doHide(callback?: Function) {
    if (isHiding) {
      return false
    }
    isHiding = true
    isShowing = false
    removeClassName(document.body, 'fx-overflow-hidden')
    visible2.value = false

    clearTimeout(visibleTimer)
    visibleTimer = window.setTimeout(() => {
      isShow.value = false
      isHiding = false

      position.value = null
      top.value = null

      isFunction(callback) && (callback as Function)()
    }, 210)

    if (props.visible) {
      emit('update:visible', false)
    }

    return true
  }

  function hide(res?: unknown, lifeName?: string) {
    if (!isObject(res)) {
      res = {}
    }

    const isSuccess = _doHide(() => {
      emitVisibleState('hidden', res)
      afterCall('afterHidden', res)
    })

    if (isSuccess) {
      lifeName && afterCall(lifeName, res)
      emitVisibleState('hide', res)
    }
  }

  function afterCall(lifeName: string, res: unknown) {
    apis.in && apis.in(lifeName, res)
    if (isFunction((useOptions as any)[lifeName])) {
      ;(useOptions as any)[lifeName](res)
    }
  }

  function emitVisibleState(state: VisibleState, res: unknown) {
    emit(
      'visible-state-change',
      Object.assign(
        {
          type: 'visible-state-change',
          state
        },
        res
      )
    )
  }

  function onMaskClick() {
    if (!props.maskClosable) {
      return
    }
    customCancel('maskClick')
  }

  function onCloseClick() {
    customCancel('closeClick')
  }

  function onCancelClick() {
    customCancel('cancelClick')
  }

  function customCancel(key: string, focus = false) {
    if (isShowing && !focus) {
      return
    }

    emit('cancel', { [key]: true })
    hide({ cancel: true, [key]: true }, 'afterCancel')
  }

  function customConfirm(res: DataObject<any>, key?: string) {
    emit('confirm', res)

    const afterRes: DataObject<any> = { confirm: true, detail: res }
    key && (afterRes[key] = true)

    hide(afterRes, 'afterConfirm')
  }

  onMounted(() => {
    props.visible && show()
  })

  const popupStyles = computed(() => {
    const styles = {
      zIndex: zIndex.value,
      top: top.value,
      position: position.value
    }

    return styles
  })

  watch(
    () => props.visible,
    (val: boolean) => {
      val ? show() : hide()
    }
  )

  apis.out && apis.out('customCancel', customCancel)

  return {
    isShow,
    visible2,
    zIndex,
    popupStyles,
    show,
    hide,
    customConfirm,
    customCancel,
    noop() {},
    onMaskClick,
    onCloseClick,
    onCancelClick
  }
}

export const popupExtendEmits = [
  'confirm',
  'cancel',
  'visible-state-change',
  'update:visible'
]

export const popupExtendProps = {
  visible: {
    type: Boolean,
    default: false
  }
}

export function usePopupExtend({ emit }: SetupContext<any>) {
  const popup = shallowRef<ComponentPublicInstance<PopupPublicInstance>>()

  function customCancel(key: string, focus = false) {
    popup.value && popup.value.customCancel(key, focus)
  }

  function customConfirm(res: any, key?: string) {
    popup.value && popup.value.customConfirm(res, key)
  }

  function onVisibleStateChange(e: VisibleStateChangeRes) {
    emit('visible-state-change', e)
  }

  function onCancelClick() {
    customCancel('cancelClick')
  }

  function onCancel(res: DataObject<boolean>) {
    emit('cancel', res)
  }

  function onUpdateVisible(value: boolean) {
    emit('update:visible', value)
  }

  return {
    popup,
    customCancel,
    customConfirm,
    onUpdateVisible,
    onVisibleStateChange,
    onCancelClick,
    onCancel
  }
}
