<template>
  <drawer
    :class="[prefix + '-picker-popup']"
    ref="popup"
    placement="bottom"
    :visible.sync="visible2"
    @show="onShow"
    @shown="onShown"
    @hide="onHide"
    @hidden="onHidden"
    @cancel="onCancel"
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
import PickerView from './View.vue'
import NavBar from '../NavBar'
import Drawer from '../Drawer'
import { SDKKey } from '../../config'
import { cloneData, isSameArray } from '../../helpers/util'
import popupExtendMixin from '../util/popup-extend-mixin'
import mulitSelectorPropsMixin from '../util/mulit-selector/props-mixin'
import { getDefaultDetail } from '../util/mulit-selector'

export default {
  name: SDKKey + '-picker-popup',
  components: { PickerView, NavBar, Drawer },
  mixins: [popupExtendMixin, mulitSelectorPropsMixin],
  props: {
    title: {
      type: String,
      default: ''
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
    },
    visible2: {
      handler(val) {
        if (val) {
          this.$refs.view.updatePos()
        }
      }
    }
  },
  model: {
    prop: 'modelValue',
    event: '_change'
  },
  methods: {
    updateValue(val) {
      this.detail = this.$refs.view.updateValue(val)

      return cloneData(this.detail)
    },

    onConfirmClick() {
      const detail = this.$refs.view.getDetail()

      const confirmDetail = this.getDetail()
      this.$emit('confirm', confirmDetail)
      this.afterConfirm(confirmDetail)

      if (!isSameArray(this.detail.value, detail.value)) {
        this.detail = detail
        // 跟picker-view不一样，改变数值时机是确定按钮
        this.$emit('_change', this.hookFormValue())
        this.$emit('change', cloneData(detail))
        this.afterChange(cloneData(detail))
      } else {
        this.detail = detail
      }

      this.visible2 = false
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

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-picker-popup {
  .#{$prefix}-nav-bar {
    --nav-bar-height: 48px;
  }
}
</style>
