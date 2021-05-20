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
import { computed, defineComponent, PropType, ref } from 'vue'
import Icon from '@/Icon'
import { createEnumsValidator, getEnumsValue } from '@/helpers/validator'
import { SIZE_TYPES, STATE_TYPES, TAG_PATTERN_TYPES } from '@/hooks/constants'
import { useLongPress } from '@/hooks/long-press'
import { noop } from '@/helpers/util'
import { SizeType, StateType, TagPatternType } from '../hooks/types'

export default defineComponent({
  name: 'fx-tag',
  components: { Icon },
  props: {
    size: {
      type: String as PropType<SizeType>,
      validator: createEnumsValidator(SIZE_TYPES),
      default: null
    },
    type: {
      type: String as PropType<StateType>,
      validator: createEnumsValidator(STATE_TYPES),
      default: null
    },
    // 款式
    pattern: {
      type: String as PropType<TagPatternType>,
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

    useLongPress(root, onLongPress)

    return {
      root,
      classNames,
      noop,
      onClose
    }
  }
})
</script>
