import Exception from '@/helpers/exception'
import {
  getCurrentInstance,
  ref,
  onBeforeUnmount,
  ComponentInternalInstance
} from 'vue'
import { kebabCase2CamelCase } from '@/helpers/util'

type ListUpdateCallback = ($items: HTMLElement[]) => void

/**
 * 创建默认更新方法，带错误提示
 * @param name 横杆形式
 */
export function createUpdateInItem(name: string) {
  name = kebabCase2CamelCase(name)
  return function(lazy = 17) {
    new Exception(`${name}Item is not in ${name}`, Exception.TYPE.DEFAULT, name)
  }
}

export function useList(name: string, updateCallback: ListUpdateCallback) {
  const instance = getCurrentInstance()
  const list = ref<HTMLElement>()
  let updateTimer: number

  function update(lazy = 17) {
    if (!(instance as ComponentInternalInstance).isMounted) {
      return
    }

    clearTimeout(updateTimer)
    updateTimer = window.setTimeout(() => {
      if (!(instance as ComponentInternalInstance).isUnmounted) {
        updateCallback(getItems())
      }
    }, lazy)
  }

  function getItems(): HTMLElement[] {
    return list.value
      ? [].slice.call(list.value.querySelectorAll(`.fx-${name}-item`), 0)
      : []
  }

  onBeforeUnmount(() => clearTimeout(updateTimer))

  return {
    list,
    getItems,
    update
  }
}
