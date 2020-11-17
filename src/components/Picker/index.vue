<template>
  <drawer
    :class="[prefix + '-picker']"
    ref="drawer"
    align="bottom"
    :visible.sync="visible2"
    @show="onShow"
    @shown="onShown"
    @hide="onHide"
    @hidden="onHidden"
    @mask-click="onMaskClick"
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
      :initial-mode="initialMode"
      :initial-separator="initialSeparator"
      v-model="value2"
      :format-string="formatString"
      :options="options"
      @reset="onReset"
    ></picker-view>
  </drawer>
</template>

<script>
import PickerView from '../PickerView'
import NavBar from '../NavBar'
import Drawer from '../Drawer'
import { SDKKey } from '../../config'
import {
  cloneData,
  isArray,
  isStringNumberMixArray,
  isString,
  isNumber,
  isSameArray
} from '../../helpers/util'
import { MODE_NAMES, getDefaultFieldNames } from '../Cascader/util'

export default {
  name: SDKKey + '-picker',
  components: { PickerView, NavBar, Drawer },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    initialSeparator: {
      type: String,
      default: '/'
    },
    options: {
      type: Array,
      default() {
        return []
      }
    },
    value: {
      validator(value) {
        return (
          isStringNumberMixArray(value) || isString(value) || isNumber(value)
        )
      },
      default() {
        return []
      }
    },
    formatString: {
      type: Boolean,
      default: false
    },
    initialMode: {
      type: String,
      default: MODE_NAMES[0]
    },
    fieldNames: {
      type: Object,
      default() {
        return getDefaultFieldNames()
      }
    }
  },
  data() {
    return {
      prefix: SDKKey,
      visible2: false,
      value2: [],
      detail: { valueString: '', value: [] }
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(val) {
        if (this.visible2 != val) {
          this.visible2 = val
        }
      }
    },
    visible2: {
      handler(val) {
        if (this.visible != val) {
          this.$emit('update:visible', val)
        }
        if (val) {
          this.value2 = this.value
        }
      }
    }
  },
  model: {
    prop: 'value',
    event: '_change'
  },
  methods: {
    onCancelClick() {
      this.$emit('cancel', {})

      this.visible2 = false
    },
    onConfirmClick() {
      this.detail = this.$refs.view.getDetail()

      this.$emit('confirm', cloneData(this.detail))

      if (!this.isSameValue()) {
        // 跟picker-view不一样，改变数值时机是确定按钮
        this.$emit('_change', this.hookFormValue())
        this.$emit('change', cloneData(this.detail))
      }

      this.visible2 = false
    },
    isSameValue() {
      return (
        (isArray(this.value) && isSameArray(this.value, this.detail.value)) ||
        (!isArray(this.value) && this.value == this.detail.valueString)
      )
    },
    onShow(res) {
      this.$emit('show', res)
    },
    onShown(res) {
      this.$emit('shown', res)
    },
    onHide(res) {
      this.$emit('hide', res)
    },
    onHidden(res) {
      this.$emit('hidden', res)
    },
    onMaskClick(res) {
      this.$emit('hidden', res)
    },
    destroy() {
      this.$refs.drawer.destroy()
      this.$destroy()
    },
    hookFormValue() {
      return this.$refs.view.hookFormValue()
    },
    onReset(res) {
      this.$emit('reset', res)
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-picker {
  .#{$prefix}-drawer_inner {
    height: auto;
  }
}
</style>
