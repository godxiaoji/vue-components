<template>
  <div
    class="fx-calendar"
    :class="[
      {
        disabled
      }
    ]"
  >
    <div
      class="fx-input"
      :class="{ 'has--value': formLabel, disabled }"
      @click="onFieldClick"
    >
      <div class="fx-input_input" :class="{ placeholder: !formLabel }">
        {{ formLabel || placeholder }}
      </div>
      <icon class="fx-input_arrow" icon="RightOutlined" />
      <input
        class="fx-input_cover"
        type="text"
        readonly
        :name="formName"
        :disabled="disabled"
        :value="formLabel"
        ref="input"
      />
    </div>
    <calendar-popup
      v-bind="$props"
      :title="placeholder"
      v-model:visible="popupVisible"
      v-if="isInitPopup"
      @confirm="onConfirm"
      ref="popup"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  shallowRef,
  ComponentPublicInstance,
  reactive,
  ref,
  watch
} from 'vue'
import Icon from '@/Icon'
import CalendarPopup from '@/CalendarPopup'
import {
  cloneDetail,
  getDefaultDetail,
  getDetail as _getDetail,
  isSameDateArray,
  parseValues,
  TYPE_NAMES
} from '@/Calendar/util'
import { isFunction, isUndefined } from '@/helpers/util'
import dayjs from 'dayjs'
import commonProps from '@/Calendar/props'
import { formItemEmits, formItemProps, useFormItem } from '@/hooks/form'
import { getEnumsValue } from '@/helpers/validator'
import { DetailObject } from './types'

export default defineComponent({
  name: 'fx-calendar',
  components: { Icon, CalendarPopup },
  props: {
    ...commonProps,
    ...formItemProps,
    placeholder: {
      type: String,
      default: ''
    },
    formatter: {
      type: Function,
      default: null
    },
    showConfirm: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: false
    }
  },
  emits: [...formItemEmits],
  setup(props, ctx) {
    const { emit } = ctx
    const isInitPopup = ref(false)
    const popupVisible = ref(true)
    const formLabel = ref('')
    const formValue = reactive<Date[]>([])
    const popup = shallowRef<ComponentPublicInstance<typeof CalendarPopup>>()

    const type = getEnumsValue(TYPE_NAMES, props.initialType)
    let detail = getDefaultDetail()
    let _changeValue: any = null

    function updateValue(val: unknown) {
      if (popup.value) {
        return updateDetail(popup.value.updateValue(val))
      } else {
        return updateDetail(_getDetail(parseValues(val, type), type))
      }
    }

    function updateDetail(_detail: DetailObject) {
      detail = _detail
      formLabel.value = _detail.label
      formValue.splice(0, Infinity, ...getDetail().value)

      return getDetail()
    }

    function onFieldClick() {
      if (!props.disabled) {
        if (!isInitPopup.value) {
          isInitPopup.value = true
        } else {
          popupVisible.value = true
        }
      }
    }

    function getDetail() {
      return cloneDetail(detail)
    }

    function onConfirm(_detail: DetailObject) {
      if (isSameDateArray(detail.value, _detail.value)) {
        return
      }

      updateDetail(_detail)
      const formatValue = hookFormValue()
      _changeValue = formatValue
      emit('update:modelValue', formatValue)
      emit('change', getDetail())

      validateAfterEventTrigger('change', formatValue)
    }

    const { formName, validateAfterEventTrigger, hookFormValue } = useFormItem<
      Date
    >(props, ctx, {
      formValue,
      hookFormValue() {
        const newValue = cloneDetail(detail).value
        if (isFunction(props.formatter)) {
          return props.formatter(newValue, function formatter(
            template: string
          ) {
            return newValue.map(date => {
              return dayjs(date).format(template)
            })
          })
        }
        return newValue
      },
      hookResetValue: () => updateValue(defaultValue).value
    })
    watch(
      () => props.modelValue,
      val => {
        if (!isUndefined(_changeValue) && _changeValue == val) {
          //
        } else {
          updateValue(val)
        }

        _changeValue = null
      }
    )

    updateValue(props.modelValue)

    const defaultValue = cloneDetail(detail).value

    return {
      isInitPopup,
      popupVisible,
      formName,
      formLabel,
      formValue,
      popup,
      hookFormValue,
      validateAfterEventTrigger,
      onFieldClick,
      onConfirm,
      defaultValue
    }
  }
})
</script>
