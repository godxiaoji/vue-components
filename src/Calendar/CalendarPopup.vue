<template>
  <drawer
    class="fx-calendar-popup"
    placement="bottom"
    :visible="visible"
    :title="title || null"
    :show-close="showClose"
    @visible-state-change="onVisibleStateChange"
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
import CalendarView from './CalendarView.vue'
import Drawer from '../Drawer'
import FxButton from '../Button'
import { getDefaultDetail, cloneDetail } from './util'
import commonProps from './props'
import {
  usePopupExtend,
  popupExtendEmits,
  popupExtendProps
} from '../utils/popup'
import { DetailObject } from './types'

export default defineComponent({
  name: 'fx-calendar-popup',
  components: { CalendarView, Drawer, FxButton },
  provide() {
    return {
      appCalendarPopup: this
    }
  },
  props: {
    ...commonProps,
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
    const { emit } = ctx
    const calendarView = shallowRef<
      ComponentPublicInstance<typeof CalendarView>
    >()
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

      emit('update:modelValue', getDetail().value)

      const confirmDetail = getDetail()
      ctx.emit('confirm', confirmDetail)
      popup.customConfirm(confirmDetail)
    }

    function getDetail() {
      return cloneDetail(detail)
    }

    function updateDetail(_detail: DetailObject) {
      detail.value.splice(0, Infinity, ..._detail.value)
      detail.label = _detail.label
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
