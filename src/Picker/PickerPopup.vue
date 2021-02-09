<template>
  <drawer
    class="fx-picker-popup"
    placement="bottom"
    :visible="visible"
    @visible-state-change="onVisibleStateChange"
    @cancel="onCancel"
    @update:visible="onUpdateVisible"
    ref="popup"
  >
    <nav-bar
      :title="title"
      :right-buttons="[{ icon: '', text: '确定', type: 'primary' }]"
      :left-buttons="[{ icon: '', text: '取消' }]"
      :icon-only="false"
      @left-button-click="onCancelClick"
      @right-button-click="onConfirmClick"
    >
    </nav-bar>
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
import NavBar from '../NavBar'
import Drawer from '../Drawer'
import { cloneData, isSameArray } from '../helpers/util'
import popupExtendMixin from '../util/popup-extend-mixin'
import multiSelectorPropsMixin from '../util/multi-selector/props-mixin'
import { getDefaultDetail } from '../util/multi-selector'

export default {
  name: 'fx-picker-popup',
  components: { PickerView, NavBar, Drawer },
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
  emits: ['confirm', 'update:modelValue', 'change'],
  methods: {
    updateValue(val) {
      this.detail = this.$refs.view.updateValue(val)

      return cloneData(this.detail)
    },

    onConfirmClick() {
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

      this.onUpdateVisible(false)
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
