<template>
  <div>
    <fx-group title="基础用法">
      <fx-cell label="默认">
        <fx-stepper />
      </fx-cell>
      <fx-cell label="步长设置">
        <fx-stepper :step="2" />
      </fx-cell>
      <fx-cell label="限制输入范围">
        <fx-stepper :min="5" :max="10" />
      </fx-cell>
      <fx-cell label="限制输入整数">
        <fx-stepper :allow-decimal="false" />
      </fx-cell>
      <fx-cell label="禁用状态">
        <fx-stepper :disabled="true" />
      </fx-cell>
      <fx-cell label="禁用输入框">
        <fx-stepper :disabled-input="true" />
      </fx-cell>
      <fx-cell label="固定小数位">
        <fx-stepper :decimal-length="1" :step="0.2" />
      </fx-cell>
      <fx-cell label="change事件监听">
        <fx-stepper @change="onChange" v-model="value" />
      </fx-cell>
      <fx-cell label="其他事件监听">
        <fx-stepper
          @plus-click="onPlusClick"
          @minus-click="onMinusClick"
          @focus="onFocus"
          @blur="onBlur"
          @input="onInput"
        />
      </fx-cell>
    </fx-group>
  </div>
</template>

<script>
import Toast from '@/Toast'

export default {
  name: 'Stepper',
  data() {
    return { value: '1' }
  },
  methods: {
    onChange({ value }) {
      Toast.showToast(`值改变为：${value}`)
    },
    onInput({ value }) {
      Toast.showToast(`当前值为：${value}`)
    },
    onPlusClick() {
      Toast.showToast('点击 + 按钮')
    },
    onMinusClick() {
      Toast.showToast('点击 - 按钮')
    },
    onFocus() {
      Toast.showToast('聚焦 focus')
    },
    onBlur() {
      Toast.showToast('失焦 blur')
    }
  }
}
</script>
