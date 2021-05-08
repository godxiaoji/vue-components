<template>
  <drawer
    class="fx-number-keyboard"
    placement="bottom"
    :visible="visible"
    :showMask="false"
    :title="title"
    :showConfirm="showHeaderConfirm"
    @visible-state-change="onVisibleStateChange2"
    @cancel="onCancel"
    @confirm="onConfirm"
    @update:visible="onUpdateVisible"
    ref="popup"
  >
    <div @click.stop="noop">
      <div class="fx-number-keyboard_body" :class="bodyClasses">
        <ul class="fx-number-keyboard_list">
          <li
            class="fx-number-keyboard_item"
            :class="['span-' + (item.span || 1)]"
            v-for="(item, index) in numberList"
            :key="index"
          >
            <div class="fx-number-keyboard_button" @click="onNumberClick(item)">
              <icon v-if="item.icon" :icon="item.icon"></icon>
              <template v-else>{{ item.text }}</template>
            </div>
          </li>
        </ul>
        <div
          class="fx-number-keyboard_right-column"
          v-if="type === 'rightColumn'"
        >
          <div class="fx-number-keyboard_backspace">
            <div
              class="fx-number-keyboard_button"
              @click="onNumberClick({ type: 'backspace' })"
            >
              <icon icon="BackspaceOutlined"></icon>
            </div>
          </div>
          <div class="fx-number-keyboard_confirm">
            <div
              class="fx-number-keyboard_confirm-button"
              @click="onConfirmClick"
            >
              完成
            </div>
          </div>
        </div>
      </div>
    </div>
  </drawer>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import Icon from '@/Icon'
import Drawer from '@/Drawer'
import { isStringArray, isString } from '@/helpers/util'
import {
  usePopupExtend,
  popupExtendEmits,
  popupExtendProps
} from '@/hooks/popup'
import { VisibleStateChangeArgs } from '../hooks/types'
import { getEnumsValue } from '@/helpers/validator'

const TYPE_NAMES = ['default', 'rightColumn']

interface NumberKeyboardItem {
  icon?: string
  text: string
  type: 'text' | 'confirm' | 'backspace'
  span?: number
}

export default defineComponent({
  name: 'fx-number-keyboard',
  components: { Drawer, Icon },
  props: {
    ...popupExtendProps,
    modelValue: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: null
    },
    // 键盘模式
    type: {
      type: String as PropType<'default' | 'rightColumn'>,
      default: 'default'
    },
    // 自定义键盘额外的键
    customKey: {
      type: [Array, String],
      default: () => [] as string[]
    }
  },
  emits: [...popupExtendEmits, 'update:modelValue', 'close', 'input', 'delete'],
  setup(props, ctx) {
    const { emit } = ctx
    let cacheValue = ''

    const popup = usePopupExtend(ctx)

    function onVisibleStateChange2(e: VisibleStateChangeArgs) {
      popup.onVisibleStateChange(e)

      if (e.state === 'show') {
        cacheValue = (isString(props.modelValue) && props.modelValue) || ''
      }
    }

    const bodyClasses = computed(() => {
      return [
        `type--${getEnumsValue(TYPE_NAMES, props.type)}`,
        { 'has--header': showHeaderConfirm.value || props.title }
      ]
    })

    const showHeaderConfirm = computed(() => {
      return (
        props.type !== 'rightColumn' &&
        (isString(props.customKey) ||
          (isStringArray(props.customKey) && props.customKey.length > 0))
      )
    })

    const numberList = computed(() => {
      const list: NumberKeyboardItem[] = []

      for (let i = 1; i <= 9; i++) {
        list.push({
          text: i.toString(),
          type: 'text'
        })
      }

      const customKey = isString(props.customKey)
        ? [props.customKey as string]
        : isStringArray(props.customKey)
        ? (props.customKey as string[])
        : []

      if (props.type === 'rightColumn') {
        if (customKey.length > 1) {
          list.push(
            {
              text: customKey[0],
              type: 'text'
            },
            { text: '0', type: 'text' },
            {
              text: customKey[1],
              type: 'text'
            }
          )
        } else if (customKey.length > 0) {
          list.push(
            { text: '0', type: 'text', span: 2 },
            {
              text: customKey[0],
              type: 'text'
            }
          )
        } else {
          list.push({ text: '0', type: 'text', span: 3 })
        }
      } else {
        if (customKey.length > 0) {
          list.push(
            {
              text: customKey[0],
              type: 'text'
            },
            { text: '0', type: 'text' }
          )
        } else {
          list.push(
            { text: '完成', type: 'confirm', icon: 'KeyboardOutlined' },
            { text: '0', type: 'text' }
          )
        }

        list.push({
          text: '删除',
          type: 'backspace',
          icon: 'BackspaceOutlined'
        })
      }

      return list
    })

    function onNumberClick(item: NumberKeyboardItem) {
      if (item.type === 'text') {
        cacheValue += item.text
        emit('input', {
          key: item.text
        })
        emit('update:modelValue', cacheValue)
      } else if (item.type === 'backspace') {
        const deleteKey = cacheValue.substr(-1)
        cacheValue = cacheValue.substr(0, cacheValue.length - 1)
        emit('delete', { deleteKey })
        emit('update:modelValue', cacheValue)
      } else if (item.type === 'confirm') {
        popup.customConfirm({})
      }
    }

    function onConfirmClick() {
      popup.customConfirm({})
    }

    function onConfirm(res: any) {
      close(res, true)
    }

    function onCancel(res: any) {
      close(res, false)
    }

    function close(res: any, isConfirm: boolean) {
      const detail = Object.assign(
        {
          value: cacheValue
        },
        isConfirm ? { confirm: true } : { cancel: true },
        res
      )

      cacheValue = ''

      emit('close', detail)
    }

    return {
      ...popup,
      onVisibleStateChange2,
      showHeaderConfirm,
      bodyClasses,
      numberList,
      onNumberClick,
      onConfirmClick,
      onConfirm,
      onCancel
    }
  }
})
</script>
