<template>
  <div
    class="fx-button-group"
    :class="[
      'size--' + options.size,
      'pattern--' + options.pattern,
      'shape--' + options.shape,
      'count--' + (children.length || 1)
    ]"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { createEnumsValidator, getEnumsValue } from '@/helpers/validator'
import {
  SIZE_TYPES,
  BUTTON_PATTERN_TYPES,
  BUTTON_SHAPE_TYPES,
} from '@/hooks/constants'
import type {
  SizeType,
  ButtonPatternType,
  ButtonShapeType,
} from '../hooks/constants'
import { useGroup } from '@/hooks/group'
import { defineComponent, PropType, provide, reactive, watch } from 'vue'

export default defineComponent({
  name: 'fx-button-group',
  props: {
    size: {
      type: String as PropType<SizeType>,
      validator: createEnumsValidator(SIZE_TYPES),
      default: null
    },
    pattern: {
      type: String as PropType<ButtonPatternType>,
      validator: createEnumsValidator(BUTTON_PATTERN_TYPES),
      default: null
    },
    shape: {
      type: String as PropType<ButtonShapeType>,
      validator: createEnumsValidator(BUTTON_SHAPE_TYPES),
      default: null
    }
  },
  setup(props) {
    const { children } = useGroup('button')

    const options = reactive({
      size: '',
      pattern: '',
      shape: ''
    })

    watch(
      props,
      val => {
        options.size = getEnumsValue(SIZE_TYPES, val.size)
        options.pattern = getEnumsValue(BUTTON_PATTERN_TYPES, val.pattern)
        options.shape = getEnumsValue(BUTTON_SHAPE_TYPES, val.shape)
      },
      {
        immediate: true
      }
    )

    provide('fxButtonGroupOptions', options)

    return { children, options }
  }
})
</script>
