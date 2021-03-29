<template>
  <div
    class="fx-rate"
    :class="{ disabled: !!disabled, readonly: !!readonly }"
    ref="root"
  >
    <input
      :name="formName"
      type="hidden"
      :value="formValue"
      :disabled="disabled"
      ref="input"
    />
    <div
      class="fx-rate_item"
      :class="{
        active: num - 0.5 <= formValue,
        half: formValue - num === -0.5
      }"
      v-for="num in max"
      :key="num"
      :data-value="num"
    >
      <i class="fx-rate_icon">
        <icon :icon="iconPattern + 'Outlined'" />
      </i>
      <i class="fx-rate_active-icon">
        <icon :icon="iconPattern + 'Filled'" :style="iconStyles" />
      </i>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, PropType, watch } from 'vue'
import Icon from '@/Icon'
import { capitalize, isInteger, isNumeric } from '@/helpers/util'
import { rangeInteger } from '@/helpers/util'
import { createEnumsValidator, getEnumsValue } from '@/helpers/validator'
import { useFormItem, formItemEmits, formItemProps } from '@/hooks/form'
import type { StyleObject } from '../helpers/types'
import { useTouch, UseTouchCoords, UseTouchEvent } from '@/hooks/touch'

interface RateCoords extends UseTouchCoords {
  size: number
  offsetX: number
  startX: number
  current: number
}

const ALLOW_ICONS = ['star', 'heart']

const isIntegerOrHalf = (val: number | string) => {
  if (isNumeric(val)) {
    if (isInteger(val) || (parseFloat(val as string) * 10) % 5 === 0) {
      return true
    }
  }
  return false
}

export default defineComponent({
  name: 'fx-rate',
  components: { Icon },
  props: {
    ...formItemProps,
    pattern: {
      type: String as PropType<'star' | 'heart'>,
      validator: createEnumsValidator(ALLOW_ICONS),
      default: null
    },
    modelValue: {
      type: [Number, String],
      validator: isIntegerOrHalf,
      default: null
    },
    count: {
      type: [String, Number],
      default: 5
    },
    allowHalf: {
      type: Boolean,
      default: false
    },
    activeColor: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  emits: formItemEmits,
  setup(props, ctx) {
    const { emit } = ctx
    const root = ref<HTMLElement>()
    const formValue = ref(0)
    let defaultValue: number

    const {
      formName,
      validateAfterEventTrigger,
      hookFormValue,
      eventEmit
    } = useFormItem<number>(props, ctx, {
      formValue,
      hookResetValue: () => defaultValue
    })

    function change(value: number, isHalf = false) {
      if (props.allowHalf && isHalf) {
        value -= 0.5
      }

      if (value !== formValue.value) {
        formValue.value = value

        emit('update:modelValue', value)

        eventEmit('change')
      }
    }

    function onHalfClick(num: number) {
      if (props.readonly || props.disabled) {
        return
      }

      if (props.allowHalf) {
        num -= 0.5
      }

      change(num)
    }

    function onItemClick(num: number) {
      if (props.readonly || props.disabled) {
        return
      }

      change(num)
    }

    const iconPattern = computed(() =>
      capitalize(getEnumsValue(ALLOW_ICONS, props.pattern))
    )

    const iconStyles = computed(() => {
      const styles: StyleObject = {}

      if (props.activeColor && !props.disabled) {
        styles.fill = props.activeColor
      }

      return styles
    })

    const max = computed(() => {
      return isNumeric(props.count) && Math.round(props.count as number) > 0
        ? Math.round(props.count as number)
        : 5
    })

    let coords: RateCoords | null

    useTouch({
      el: root,
      onTouchStart(e: UseTouchEvent) {
        const { clientX } = e.touchObject

        let $target = e.target as HTMLElement
        while ($target.tagName !== 'DIV') {
          $target = $target.parentElement as HTMLElement
        }
        const value = parseInt($target.dataset.value as string)
        const rects = $target.getClientRects()[0]

        coords = {
          size: rects.height,
          offsetX: clientX - rects.left,
          startX: clientX,
          current: value
        }
        coords.isHalf = coords.offsetX < coords.size / 2

        change(value, coords.isHalf)

        e.preventDefault()
      },
      onTouchMove(e: UseTouchEvent) {
        if (!coords) {
          return
        }

        const { clientX } = e.touchObject
        const { startX, size, offsetX, current } = coords

        const x = clientX - startX

        let offsetCount = 0

        if (x > 0) {
          offsetCount =
            Math.floor(x / size) + (x % size > size - offsetX ? 1 : 0)
        } else if (x < 0) {
          offsetCount = -Math.floor(-x / size) + (-x % size > offsetX ? -1 : 0)
        }

        const isHalf = (offsetX + x) % size < size / 2

        coords.isChange = true

        change(rangeInteger(current + offsetCount, 1, max.value), isHalf)

        e.stopPropagation()
      },
      onTouchEnd(e) {
        if (coords) {
          coords = null
          e.stopPropagation()
        }
      }
    })

    function updateValue() {
      if (!isIntegerOrHalf(props.modelValue)) {
        return
      }

      const value = parseFloat(props.modelValue as string)

      if (value === formValue.value) {
        return
      }

      if (value < 0 || value > max.value) {
        return
      }

      if (!props.allowHalf && !isInteger(value)) {
        return
      }

      formValue.value = value
    }

    updateValue()
    defaultValue = formValue.value

    watch(() => props.modelValue, updateValue)

    watch(max, val => val < defaultValue && (defaultValue = 0))

    return {
      root,
      formName,
      formValue,
      hookFormValue,
      validateAfterEventTrigger,
      iconPattern,
      iconStyles,
      max,
      onHalfClick,
      onItemClick
    }
  }
})
</script>
