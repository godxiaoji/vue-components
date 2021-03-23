<template>
  <drawer
    class="fx-calendar-popup"
    placement="bottom"
    :visible="visible"
    :title="title || null"
    :show-close="showClose"
    @visible-state-change="onVisibleStateChange"
    @cancel="onCancel"
    @confirm="onConfirm"
    @update:visible="onUpdateVisible"
    ref="popup"
  >
    <calendar-view
      ref="view"
      @select="onSelect"
      :min-date="minDate"
      :max-date="maxDate"
      :initial-type="initialType"
      :allow-same-day="allowSameDay"
      :max-range="maxRange"
      :day-handler="dayHandler"
    />
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

<script>
import CalendarView from './CalendarView.vue'
import Drawer from '../Drawer'
import FxButton from '../Button'
import popupExtendMixin from '../util/popup-extend-mixin'
import mixin from './mixin'
import { getDefaultDetail, cloneDetail } from './util'

export default {
  name: 'fx-calendar-popup',
  components: { CalendarView, Drawer, FxButton },
  mixins: [popupExtendMixin, mixin],
  provide() {
    return {
      appCalendarPopup: this
    }
  },
  props: {
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
  data() {
    return {
      detail: getDefaultDetail()
    }
  },
  watch: {
    modelValue: {
      handler(val) {
        this.updateValue(val)
      }
    }
  },
  methods: {
    // updateValue(val) {
    //   this.detail = this.$refs.view.updateValue(
    //     this.$refs.view.parseValues(val)
    //   )
    //   return this.getDetail()
    // },
    initialized() {},

    onSelect(detail) {
      this.detail = detail

      if (!this.showConfirm) {
        this.customConfirm({})
      }
    },

    onConfirm() {
      this.detail = this.$refs.view.getDetail()

      this.$emit('update:modelValue', this.getDetail().value)

      const confirmDetail = this.getDetail()
      this.$emit('confirm', confirmDetail)
      this.afterConfirm(confirmDetail)
    },

    afterConfirm() {},

    onConfirmClick() {
      this.customConfirm({})
    },

    getDetail() {
      return cloneDetail(this.detail)
    }
  }
}
</script>
