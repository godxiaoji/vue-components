<template>
  <div>
    <fx-notice-bar
      class="top-notice-bar"
      title="具体展示参数可以参考 PickerView"
    >
    </fx-notice-bar>
    <fx-group title="Picker">
      <fx-form-item name="picker" label="单列">
        <fx-picker :options="options" @change="onChange"></fx-picker>
      </fx-form-item>
      <fx-form-item name="picker" label="多列">
        <fx-picker :options="multiOptions" @change="onChange"></fx-picker>
      </fx-form-item>
      <fx-form-item name="picker" label="级联">
        <fx-picker :options="cascadeOptions" @change="onChange"></fx-picker>
      </fx-form-item>
      <fx-form-item name="picker" label="地区">
        <fx-picker
          :options="regionOptions"
          :field-names="{ value: 'label' }"
          :format-string="true"
          v-model="regionValue"
          @change="onChange"
        />
      </fx-form-item>
      <fx-form-item name="picker" label="禁用">
        <fx-picker
          :modelValue="disableValue"
          :options="multiOptions"
          disabled
        />
      </fx-form-item>
    </fx-group>
    <fx-group title="PickerPopup">
      <fx-cell
        label="基础"
        isLink
        @click="visible = true"
        :content="value"
      ></fx-cell>
    </fx-group>
    <fx-group title="PickerPopup Event">
      <fx-cell
        label="change"
        isLink
        @click=";(changeEvent = true), (visible = true)"
      ></fx-cell>
      <fx-cell
        label="confirm/cancel"
        isLink
        @click=";(clickEvent = true), (visible = true)"
      ></fx-cell>
      <fx-cell
        label="visible-state-change"
        isLink
        @click=";(otherEvent = true), (visible = true)"
      ></fx-cell>
    </fx-group>
    <fx-group title="API">
      <fx-cell label="showPicker" isLink @click="onCallApi"></fx-cell>
    </fx-group>
    <fx-picker-popup
      v-model:visible="visible"
      :title="title"
      :options="multiOptions"
      :format-string="true"
      v-model="value"
      @change="onChange"
      @confirm="onConfirm"
      @cancel="onCancel"
      @visible-state-change="onVisibleStateChange"
    >
    </fx-picker-popup>
  </div>
</template>

<script>
import { cascadeOptions, multiOptions, options, regionOptions } from './data'

export default {
  components: {},
  name: 'Picker',
  props: {},
  data() {
    return {
      regionValue: [],
      disableValue: [2000, '春'],
      value: '2000/夏',
      visible: false,
      title: 'Picker',
      regionTitle: '选择地区',
      multiOptions,
      options,
      cascadeOptions,
      regionOptions
    }
  },
  methods: {
    onChange(res) {
      console.log('change', res)
      this.changeEvent && this.$showToast(`值改为 ${res.labelString}`)
    },
    onConfirm(res) {
      console.log('confirm', res)
      this.clickEvent && this.$showToast(`点击确定按钮`)
    },
    onCancel(res) {
      console.log('cancel', res)
      if (this.clickEvent) {
        if (res.cancelClick) {
          this.$showToast('点击了取消按钮')
        } else if (res.maskClick) {
          this.$showToast('点击了蒙层')
        }
      }
    },
    onVisibleStateChange({ state }) {
      if (this.otherEvent) {
        this.$showToast(`${state} 事件触发`)
      }

      if (state === 'hidden') {
        this.clickEvent = false
        this.otherEvent = false
        this.changeEvent = false
      }
    },
    onCallApi() {
      this.$showPicker({
        title: this.title,
        options: multiOptions,
        success: res => {
          console.log(res)
          if (res.cancel) {
            this.$showToast('取消了')
          } else {
            this.$showToast(`选择了 ${res.detail.labelString}`)
          }
        }
      })
    }
  }
}
</script>
