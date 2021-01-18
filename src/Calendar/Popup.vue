<template>
  <drawer
    :class="[prefix + '-calendar-popup']"
    placement="bottom"
    :visible="visible"
    :title="title || null"
    :show-close="showClose"
    @show="onShow"
    @shown="onShown"
    @hide="onHide"
    @hidden="onHidden"
    @cancel="onCancel"
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
    <div :class="[prefix + '-calendar-popup_confirm']" v-if="showConfirm">
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
import CalendarView from './View.vue'
import Drawer from '../Drawer'
import FxButton from '../Button'
import { SDKKey } from '../config'
import popupExtendMixin from '../util/popup-extend-mixin'
import mixin from './mixin'
import { getDefaultDetail, cloneDetail } from './util'

export default {
  name: SDKKey + '-calendar-popup',
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
      prefix: SDKKey,

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
        this.confirm()
      }
    },

    confirm() {
      this.detail = this.$refs.view.getDetail()

      this.$emit('update:modelValue', this.getDetail().value)

      const confirmDetail = this.getDetail()
      this.$emit('confirm', confirmDetail)
      this.afterConfirm(confirmDetail)

      this.onUpdateVisible(false)
    },

    afterConfirm() {},

    onConfirmClick() {
      this.confirm()
    },

    getDetail() {
      return cloneDetail(this.detail)
    }
  }
}
</script>
