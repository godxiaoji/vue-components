<template>
  <drawer
    :class="[prefix + '-calendar-popup']"
    ref="popup"
    placement="bottom"
    :visible.sync="visible2"
    :title="title || null"
    :show-close="showClose"
    @show="onShow"
    @shown="onShown"
    @hide="onHide"
    @hidden="onHidden"
    @cancel="onCancel"
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
import { SDKKey } from '../../config'
import popupExtendMixin from '../util/popup-extend-mixin'
import propsMixin from './props-mixin'
import { getDefaultDetail, cloneDetail } from './util'

export default {
  name: SDKKey + '-calendar-popup',
  components: { CalendarView, Drawer, FxButton },
  mixins: [popupExtendMixin, propsMixin],
  provide() {
    return {
      appCalendarPopup: this
    }
  },
  props: {
    title: {
      type: String,
      value: null
    },
    showConfirm: {
      type: Boolean,
      value: false
    },
    showClose: {
      type: Boolean,
      value: false
    }
  },
  data() {
    return {
      prefix: SDKKey,

      detail: getDefaultDetail()
    }
  },
  watch: {
    value: {
      handler(val) {
        this.updateValue(val)
      }
    }
  },
  model: {
    prop: 'value',
    event: '_change'
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

      this.$emit('_change', this.getDetail().value)

      const confirmDetail = this.getDetail()
      this.$emit('confirm', confirmDetail)
      this.afterConfirm(confirmDetail)

      this.afterConfirm(this.getDetail())

      this.visible2 = false
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

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-calendar-popup {
  &_confirm {
    padding: 12px 16px;
    background-color: #fff;
    display: flex;
    border-top: 1px solid $divider-color;
  }
}
</style>
