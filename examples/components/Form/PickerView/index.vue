<template>
  <div>
    <fx-group title="基础用法">
      <fx-picker-view
        :options="options"
        @change="onChange"
        v-model="viewValue"
      ></fx-picker-view>
    </fx-group>
    <fx-group title="多列">
      <fx-picker-view
        :options="multiOptions"
        @change="onChange"
        v-model="multiViewValue"
      ></fx-picker-view>
    </fx-group>
    <fx-group title="级联">
      <fx-picker-view
        :options="cascadeOptions"
        @change="onChange"
      ></fx-picker-view>
    </fx-group>
  </div>
</template>

<script>
import { cloneData } from '@/helpers/util'
import { cascadeOptions, multiOptions, options } from '../Picker/data'

export default {
  name: 'PickerView',
  props: {},
  data() {
    return {
      options,
      multiOptions,
      cascadeOptions,
      viewValue: [],
      multiViewValue: []
    }
  },
  created() {
    const options = []
    for (let i = 2000; i <= 2020; i++) {
      options.push(i)
    }

    this.options = cloneData(options)
    this.multiOptions = [cloneData(options), ['春', '夏', '秋', '冬']]
  },
  methods: {
    onChange(res) {
      console.log('change', res)
    }
  }
}
</script>
