<template>
  <picker-view
    class="fx-date-picker-view"
    :handlers="handlers"
    @update:modelValue="onUpdateValue"
    @change="onChange"
  >
  </picker-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PickerView from '@/PickerView'
import { viewEmits } from '@/Picker/view'
import { datePickerProps, useDatePicker } from '@/DatePicker/date-picker'
import { ChangeArgs, DateDetailObject } from './types'

export default defineComponent({
  name: 'fx-date-picker-view',
  components: { PickerView },
  props: {
    ...datePickerProps
  },
  emits: [...viewEmits],
  setup(props, ctx) {
    const { emit } = ctx
    const { handlers } = useDatePicker(props, ctx)

    function onChange(e: DateDetailObject) {
      emit(
        'change',
        Object.assign(
          {
            type: 'change'
          },
          e
        ) as ChangeArgs
      )
    }

    function onUpdateValue(e: any) {
      emit('update:modelValue', e)
    }

    return {
      handlers,
      onChange,
      onUpdateValue
    }
  }
})
</script>
