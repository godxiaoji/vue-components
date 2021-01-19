<template>
  <div>
    <!-- <input type="radio" name="" id="test" /> -->
    <fx-group title="基础用法">
      <fx-cell label="默认">
        <fx-radio />
      </fx-cell>
      <fx-cell label="带文案">
        <fx-radio v-model:checked="value">勾选</fx-radio>
      </fx-cell>
      <fx-cell label="默认激活">
        <fx-radio checked>勾选</fx-radio>
      </fx-cell>
      <fx-cell label="禁用">
        <fx-radio disabled>勾选</fx-radio>
      </fx-cell>
    </fx-group>
    <fx-group title="RadioGroup">
      <fx-cell label="默认">
        <fx-radio-group v-model="groupValue">
          <fx-radio value="man">男</fx-radio>
          <fx-radio value="woman">女</fx-radio>
        </fx-radio-group>
      </fx-cell>
      <fx-cell label="内联">
        <fx-radio-group inline>
          <fx-radio value="man">男</fx-radio>
          <fx-radio value="woman">女</fx-radio>
        </fx-radio-group>
      </fx-cell>
    </fx-group>
    <fx-group title="事件监听">
      <fx-cell label="change">
        <fx-radio-group @change="onChange">
          <fx-radio value="man">男</fx-radio>
          <fx-radio value="woman">女</fx-radio>
        </fx-radio-group>
      </fx-cell>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'Radio',
  props: {},
  data() {
    return { value: null, groupValue: 'man' }
  },
  methods: {
    onChange({ value }) {
      this.$showToast(`Change Value: ${value}`)
    }
  }
}
</script>
