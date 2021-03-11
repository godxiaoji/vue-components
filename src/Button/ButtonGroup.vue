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
import { createEnumsValidator, getEnumsValue } from '../utils/validator'
import {
  SIZE_TYPES,
  SizeTypes,
  BUTTON_PATTERN_TYPES,
  ButtonPatternTypes,
  BUTTON_SHAPE_TYPES,
  ButtonShapeTypes
} from '../utils/constants'
import { useGroup } from '../utils/group'
import { defineComponent, PropType, provide, reactive, watch } from 'vue'

export default defineComponent({
  name: 'fx-button-group',
  props: {
    size: {
      type: String as PropType<SizeTypes>,
      validator: createEnumsValidator(SIZE_TYPES),
      default: null
    },
    pattern: {
      type: String as PropType<ButtonPatternTypes>,
      validator: createEnumsValidator(BUTTON_PATTERN_TYPES),
      default: null
    },
    shape: {
      type: String as PropType<ButtonShapeTypes>,
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
