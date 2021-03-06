<template>
  <drawer
    class="fx-calendar-popup"
    placement="bottom"
    :visible="visible"
    :title="title || null"
    :show-close="showClose"
    @visible-state-change="onVisibleStateChange"
    @confirm="onConfirm"
    @cancel="onCancel"
    @update:visible="onUpdateVisible"
    ref="popup"
  >
    <calendar-view ref="calendarView" @select="onSelect" v-bind="$props" />
    <div class="fx-calendar-popup_confirm" v-if="showConfirm">
      <fx-button
        type="primary"
        @click="onConfirmClick"
        :disabled="detail.value.length == 0"
        >确定</fx-button
      >
    </div>
  </drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  shallowRef,
  ComponentPublicInstance,
  onMounted,
  reactive
} from 'vue'
import CalendarView from '@/CalendarView'
import Drawer from '@/Drawer'
import FxButton from '@/Button'
import { getDefaultDetail, cloneDetail } from '@/Calendar/util'
import calendarCommonProps from '@/Calendar/props'
import {
  usePopupExtend,
  popupExtendEmits,
  popupExtendProps
} from '@/hooks/popup'
import { DetailObject } from './types'

export default defineComponent({
  name: 'fx-calendar-popup',
  components: { CalendarView, Drawer, FxButton },
  props: {
    ...calendarCommonProps,
    ...popupExtendProps,
    title: {
      type: String,
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
  emits: [...popupExtendEmits, 'update:modelValue'],
  setup(props, ctx) {
    const calendarView =
      shallowRef<ComponentPublicInstance<typeof CalendarView>>()
    const detail = reactive<DetailObject>(getDefaultDetail())

    const popup = usePopupExtend(ctx)

    function onSelect(_detail: DetailObject) {
      updateDetail(_detail)

      if (!props.showConfirm) {
        confirm()
      }
    }

    function onConfirmClick() {
      confirm()
    }

    function confirm() {
      if (!calendarView.value) {
        return
      }

      updateDetail(calendarView.value.getDetail())

      popup.emit('update:modelValue', getDetail().value)

      const confirmDetail = getDetail()

      popup.customConfirm(confirmDetail)
    }

    function getDetail() {
      return cloneDetail(detail)
    }

    function updateDetail(_detail: DetailObject) {
      detail.value.splice(0, Infinity, ..._detail.value)
      detail.valueArray.splice(0, Infinity, ..._detail.valueArray)
      detail.formatted = _detail.formatted
      detail.rangeCount = _detail.rangeCount
    }

    function updateValue(val: unknown): DetailObject {
      return calendarView.value
        ? calendarView.value.updateValue(val)
        : getDefaultDetail()
    }

    onMounted(
      () => calendarView.value && updateDetail(calendarView.value.getDetail())
    )

    return {
      ...popup,
      detail,
      calendarView,
      onSelect,
      onConfirmClick,
      updateValue
    }
  }
})
</script>
