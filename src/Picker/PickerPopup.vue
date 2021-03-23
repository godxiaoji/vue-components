<template>
  <drawer
    class="fx-picker-popup"
    placement="bottom"
    :visible="visible"
    :showCancel="true"
    :showConfirm="true"
    @visible-state-change="onVisibleStateChange"
    @cancel="onCancel"
    @confirm="onConfirm"
    @update:visible="onUpdateVisible"
    ref="popup"
  >
    <picker-view
      ref="view"
      :modelValue="modelValue"
      :initial-mode="initialMode"
      :initial-separator="initialSeparator"
      :format-string="formatString"
      :options="options"
      :field-names="fieldNames"
    />
  </drawer>
</template>

<script>
import PickerView from './PickerView.vue'
import Drawer from '../Drawer'
import { cloneData, isSameArray } from '../helpers/util'
import popupExtendMixin from '../util/popup-extend-mixin'
import multiSelectorPropsMixin from '../util/multi-selector/props-mixin'
import { getDefaultDetail } from '../util/multi-selector'

export default {
  name: 'fx-picker-popup',
  components: { PickerView, Drawer },
  mixins: [popupExtendMixin, multiSelectorPropsMixin],
  props: {
    title: {
      type: String,
      default: ''
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
    },
    visible: {
      handler(val) {
        if (val) {
          this.$refs.view.updatePos()
        }
      }
    }
  },
  model: {
    prop: 'modelValue',
    event: 'update:modelValue'
  },
  methods: {
    updateValue(val) {
      this.detail = this.$refs.view.updateValue(val)

      return cloneData(this.detail)
    },

    onConfirm() {
      const detail = this.$refs.view.getDetail()
      const oldDetail = this.detail
      this.detail = detail

      const confirmDetail = this.getDetail()
      this.$emit('confirm', confirmDetail)
      this.afterConfirm(confirmDetail)

      if (!isSameArray(oldDetail.value, detail.value)) {
        // 跟picker-view不一样，改变数值时机是确定按钮
        this.$emit('update:modelValue', this.hookFormValue())
        this.$emit('change', cloneData(detail))
        this.afterChange(cloneData(detail))
      }
    },

    afterChange() {},

    hookFormValue() {
      const { value, valueString } = this.getDetail()
      return this.formatString ? valueString : value
    },

    getDetail() {
      return cloneData(this.detail)
    }
  }
}
</script>
