<template>
  <div>
    <fx-group title="基础用法">
      <fx-cell label="家电">
        <fx-cascader :options="options" placeholder="选择家电" />
      </fx-cell>
      <fx-cell label="地区">
        <fx-cascader
          :options="regionOptions"
          :field-names="{ value: 'label' }"
          placeholder="选择地区"
        />
      </fx-cell>
      <fx-cell label="v-model">
        <fx-cascader
          :options="options"
          placeholder="选择家电"
          v-model="value"
        />
      </fx-cell>
    </fx-group>
    <fx-group title="内置选择器">
      <fx-cell label="mode=date"><fx-cascader initial-mode="date"/></fx-cell>
      <fx-cell label="mode=time"><fx-cascader initial-mode="time"/></fx-cell>
      <fx-cell label="mode=datetime">
        <fx-cascader initial-mode="datetime" />
      </fx-cell>
    </fx-group>
    <fx-group title="事件监听">
      <fx-cell label="家电">
        <fx-cascader
          :options="options"
          placeholder="选择家电"
          @change="onChange"
        />
      </fx-cell>
    </fx-group>
    <fx-group title="API">
      <fx-cell label="showCascader" isLink @click="onCallApi()"></fx-cell>
    </fx-group>
  </div>
</template>

<script>
import { cascadeOptions, regionOptions } from '../Picker/data'

export default {
  name: 'Cascader',
  props: {},
  data() {
    return {
      options: cascadeOptions,
      regionOptions,
      value: ['bingxiang', 'duikaimen']
    }
  },
  methods: {
    onChange(res) {
      console.log('change', res)

      this.$showDialog({
        title: '选择了',
        showCancel: false,
        content: `label: '${res.labelString}'\nvalue: ${res.valueString}`
      })
    },
    onCallApi() {
      this.$showCascader({
        title: '家电',
        options: cascadeOptions,
        success: res => {
          console.log('success', res)
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
