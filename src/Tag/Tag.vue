<template>
  <div
    class="fx-tag"
    :class="[classNames, { disabled: !!disabled }]"
    ref="root"
  >
    <slot></slot>
    <icon
      icon="CloseOutlined"
      :class="{ disabled: !!disabled }"
      @mousedown.stop="noop"
      @touchstart.stop="noop"
      @click="onClose"
      v-if="closable"
    />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref
} from 'vue'
import Icon from '@/Icon'
import { createEnumsValidator, getEnumsValue } from '@/utils/validator'
import { addLongPressEvent } from '@/helpers/events'
import {
  SizeTypes,
  SIZE_TYPES,
  StateTypes,
  STATE_TYPES,
  TagPatternTypes,
  TAG_PATTERN_TYPES
} from '@/utils/constants'

export default defineComponent({
  name: 'fx-tag',
  components: { Icon },
  props: {
    size: {
      type: String as PropType<SizeTypes>,
      validator: createEnumsValidator(SIZE_TYPES),
      default: null
    },
    type: {
      type: String as PropType<StateTypes>,
      validator: createEnumsValidator(STATE_TYPES),
      default: null
    },
    // 款式
    pattern: {
      type: String as PropType<TagPatternTypes>,
      validator: createEnumsValidator(TAG_PATTERN_TYPES),
      default: null
    },
    // 可关闭的
    closable: {
      type: Boolean,
      default: false
    },
    // 禁用的
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'click', 'long-press'],
  setup(props, { emit }) {
    const root = ref<HTMLElement>()
    let longPressOff: Function

    function onClose() {
      if (!props.disabled) {
        emit('close', {
          type: 'close'
        })
      }
    }

    function onLongPress(e: { type: string }) {
      if (!props.disabled) {
        emit(e.type as 'click' | 'long-press', e)
      }
    }

    const classNames = computed(() => {
      return [
        'type--' + getEnumsValue(STATE_TYPES, props.type),
        'size--' + getEnumsValue(SIZE_TYPES, props.size),
        'pattern--' + getEnumsValue(TAG_PATTERN_TYPES, props.pattern)
      ]
    })

    onMounted(
      () =>
        (longPressOff = addLongPressEvent(
          root.value as HTMLElement,
          onLongPress
        ))
    )

    onBeforeUnmount(() => longPressOff())

    return {
      root,
      classNames,
      noop() {},
      onClose
    }
  }
})
</script>
