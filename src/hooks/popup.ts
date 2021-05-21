import {
  computed,
  onMounted,
  SetupContext,
  ref,
  watch,
  inject,
  shallowRef,
  ComponentPublicInstance,
  provide
} from 'vue'
import { isFunction, isObject, noop } from '@/helpers/util'
import { addClassName, getScrollDom, removeClassName } from '@/helpers/dom'
import { popupZIndex } from '@/helpers/layer'
import { UseProps, DataObject } from '../helpers/types'
import { useBlur } from '@/hooks/blur'
import {
  VisibleStateChangeArgs,
  VisibleState,
  PopupPublicInstance,
  PopupCustomCancel,
  PopupCustomConfirm,
  UseEmit
} from './types'
import { PopupBridge } from '../apis/types'

interface UseOptions {
  forbidScroll?: boolean
  useBlur?: boolean
  afterConfirm?: Function
  afterCancel?: Function
  afterShow?: Function
  afterHidden?: Function
}

let zIndex = popupZIndex

export function getNewZIndex() {
  return zIndex++
}

export const popupProps = {
  visible: {
    type: Boolean,
    default: false
  },
  maskClosable: {
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
  ctx: SetupContext<any>,
  useOptions: UseOptions
) {
  const apis = inject<PopupBridge>('fxApis', {})
  const isParent = inject<boolean>('fxPopupExtend', false)

  const isShow = ref(false)
  const zIndex = ref(popupZIndex)
  const visible2 = ref(false)
  const top = ref<string | null>(null)
  const position = ref<'absolute' | null>(null)

  let isShowing = false
  let isHiding = false
  let visibleTimer: number

  const visibleBlur = useBlur(onBlur)

  function emit(event: string, res: any) {
    if (isParent || !apis.in) {
      ctx.emit(event, res)
    } else {
      apis.in(event, res)
    }
  }

  function doShow(callback: Function) {
    if (isShowing) {
      return false
    }
    isHiding = false
    isShowing = true

    clearTimeout(visibleTimer)

    // 如果禁止滚动
    if (useOptions.forbidScroll !== false) {
      addClassName(document.body, 'fx-overflow-hidden')
    } else {
      position.value = 'absolute'
      top.value = getScrollDom().scrollTop + 'px'
    }
    if (useOptions.useBlur) {
      visibleBlur.addEvent()
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

  function show(res: DataObject = {}) {
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

    visibleBlur.removeEvent()
  }

  function afterCall(lifeName: string, res: unknown) {
    if (isFunction((useOptions as any)[lifeName])) {
      ;(useOptions as any)[lifeName](res)
    }
  }

  function emitVisibleState(state: VisibleState, res: unknown) {
    // TODO: 是否合并res值得商榷
    res = Object.assign(
      {
        type: 'visible-state-change',
        state
      },
      res
    )

    emit('visible-state-change', res)
  }

  function onBlur() {
    customCancel('blur')
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

  const customCancel: PopupCustomCancel = (key, focus = false) => {
    if (isShowing && !focus) {
      return
    }

    const res = { [key]: true }

    emit('cancel', res)
    hide(res, 'afterCancel')
  }

  const customConfirm: PopupCustomConfirm = detail => {
    emit('confirm', detail)
    hide(detail, 'afterConfirm')
  }

  onMounted(() => {
    // 兼容devtools
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
      val ? show({ visible: true }) : hide({ visible: false })
    }
  )

  apis.out && apis.out('customCancel', customCancel)

  return {
    emit,
    isShow,
    visible2,
    zIndex,
    popupStyles,
    show,
    hide,
    customConfirm,
    customCancel,
    noop,
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

export function usePopupExtend(ctx: SetupContext<any>) {
  const popup = shallowRef<ComponentPublicInstance<PopupPublicInstance>>()
  const apis = inject<PopupBridge>('fxApis', {})

  const emit: UseEmit = (event: string, res: any) => {
    if (!apis.in) {
      ctx.emit(event, res)
    } else {
      apis.in(event, res)
    }
  }

  const customCancel: PopupCustomCancel = (key, focus = false) => {
    popup.value && popup.value.customCancel(key, focus)
  }

  const customConfirm: PopupCustomConfirm = detail => {
    popup.value && popup.value.customConfirm(detail)
  }

  function onVisibleStateChange(e: VisibleStateChangeArgs) {
    emit('visible-state-change', e)
  }

  function onCancelClick() {
    customCancel('cancelClick')
  }

  function onCancel(res: DataObject<boolean>) {
    emit('cancel', res)
  }

  function onConfirm(res: any) {
    emit('confirm', res)
  }

  function onUpdateVisible(value: boolean) {
    emit('update:visible', value)
  }

  provide('fxPopupExtend', true)

  return {
    emit,
    popup,
    customCancel,
    customConfirm,
    onUpdateVisible,
    onVisibleStateChange,
    onCancelClick,
    onCancel,
    onConfirm
  }
}
