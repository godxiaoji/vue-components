<template>
  <button
    class="fx-button"
    :class="[classNames, { 'has--icon': loading || icon, ghost: !!ghost }]"
    :disabled="disabled"
    :type="realFormType"
  >
    <icon v-if="loading" icon="LoadingOutlined" :spin="true" />
    <icon v-else-if="icon" :icon="icon" />
    <span><slot>按钮</slot></span>
  </button>
</template>

<script lang="ts">
import Icon from '@/Icon'
import {
  createEnumsValidator,
  getEnumsValue,
  iconValidator
} from '@/helpers/validator'
import {
  inject,
  defineComponent,
  computed,
  getCurrentInstance,
  PropType,
  ComponentInternalInstance
} from 'vue'
import {
  SIZE_TYPES,
  BUTTON_PATTERN_TYPES,
  BUTTON_SHAPE_TYPES,
  STATE_TYPES
} from '@/hooks/constants'
import type {
  SizeType,
  ButtonPatternType,
  ButtonShapeType,
  StateType
} from '../hooks/constants'
import { useGroupItem } from '@/hooks/group'

const FORM_TYPES = ['button', 'submit', 'reset']
type FormTypes = 'button' | 'submit' | 'reset'

export default defineComponent({
  name: 'fx-button',
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
    pattern: {
      type: String as PropType<ButtonPatternType>,
      validator: createEnumsValidator(BUTTON_PATTERN_TYPES),
      default: null
    },
    shape: {
      type: String as PropType<ButtonShapeType>,
      validator: createEnumsValidator(BUTTON_SHAPE_TYPES),
      default: null
    },
    formType: {
      type: String as PropType<FormTypes>,
      validator: createEnumsValidator(FORM_TYPES),
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      validator: iconValidator,
      default: null
    },
    ghost: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const uid = (getCurrentInstance() as ComponentInternalInstance).uid
    const buttonGroupOptions = inject('fxButtonGroupOptions', null)

    const classNames = computed(() => {
      const { size, pattern, shape } = buttonGroupOptions || props

      return [
        'type--' + getEnumsValue(STATE_TYPES, props.type),
        'pattern--' + getEnumsValue(BUTTON_PATTERN_TYPES, pattern),
        'size--' + getEnumsValue(SIZE_TYPES, size),
        'shape--' + getEnumsValue(BUTTON_SHAPE_TYPES, shape)
      ]
    })

    const realFormType = computed(() => {
      return getEnumsValue(FORM_TYPES, props.formType)
    })

    useGroupItem('button', uid)

    return {
      realFormType,
      classNames
    }
  }
})
</script>
