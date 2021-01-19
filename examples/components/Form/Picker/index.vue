<template>
  <div>
    <fx-notice-bar
      class="top-notice-bar"
      title="具体展示参数可以参考 PickerView"
    >
    </fx-notice-bar>
    <fx-group title="Picker">
      <fx-cell label="单列">
        <fx-picker :options="options" @change="onChange"></fx-picker>
      </fx-cell>
      <fx-cell label="多列">
        <fx-picker :options="multiOptions" @change="onChange"></fx-picker>
      </fx-cell>
      <fx-cell label="级联">
        <fx-picker :options="cascadeOptions" @change="onChange"></fx-picker>
      </fx-cell>
      <fx-cell label="时间">
        <fx-picker initial-mode="datetime" @change="onChange" />
      </fx-cell>
      <fx-cell label="地区">
        <fx-picker
          initial-mode="region"
          :format-string="true"
          v-model="pickerValue"
          @change="onChange"
        />
      </fx-cell>
      <fx-cell label="禁用">
        <fx-picker :placeholder="regionTitle" initial-mode="region" disabled />
      </fx-cell>
    </fx-group>
    <fx-group title="PickerPopup">
      <fx-cell
        label="基础"
        clickable
        @click="visible = true"
        :content="value"
      ></fx-cell>
      <fx-cell
        label="Event:change"
        clickable
        @click=";(changeEvent = true), (visible = true)"
      ></fx-cell>
      <fx-cell
        label="Event:confirm/cancel"
        clickable
        @click=";(clickEvent = true), (visible = true)"
      ></fx-cell>
      <fx-cell
        label="Event:show/shown/hide/hidden"
        clickable
        @click=";(otherEvent = true), (visible = true)"
      ></fx-cell>
    </fx-group>
    <fx-group title="API">
      <fx-cell label="showPicker" clickable @click="onCallApi()"></fx-cell>
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
      @show="onOtherEvent('show')"
      @shown="onOtherEvent('shown')"
      @hide="onOtherEvent('hide')"
      @hidden="onOtherEvent('hidden')"
    >
    </fx-picker-popup>
  </div>
</template>

<script>
import { cascadeOptions, multiOptions, options } from './picker-util.js'

export default {
  components: {},
  name: 'Picker',
  props: {},
  data() {
    return {
      pickerValue: [],
      value: '2000/夏',
      visible: false,
      title: 'Picker',
      regionTitle: '选择地区',
      multiOptions,
      options,
      cascadeOptions
    }
  },
  created() {},
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
    onOtherEvent(type) {
      // console.log(`${type} 事件触发`)

      if (this.otherEvent) {
        this.$showToast(`${type} 事件触发`)
      }

      if (type === 'hidden') {
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
