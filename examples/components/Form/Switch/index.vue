<template>
  <div>
    <fx-group title="基础用法">
      <fx-cell label="开关"><fx-switch /></fx-cell>
    </fx-group>
    <fx-group title="自定义颜色/大小">
      <fx-cell label="红色"><fx-switch class="switch-custom-color"/></fx-cell>
      <fx-cell label="40px"><fx-switch class="switch-custom-size"/></fx-cell>
    </fx-group>
    <fx-group title="禁用">
      <fx-cell label="关"><fx-switch disabled/></fx-cell>
      <fx-cell label="开"><fx-switch disabled :modelValue="true"/></fx-cell>
    </fx-group>
    <fx-group title="事件监听">
      <fx-cell label="change"><fx-switch v-model="value" @change="onChange"/></fx-cell>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'DemoSwitch',
  props: {},
  data() {
    return { value: false }
  },
  methods: {
    onChange({ value }) {
      this.$showToast(value ? '开' : '关')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/style/var.scss';

.switch {
  &-custom-color {
    --switch-on-color: #{$danger-color} !important;
    --switch-off-color: #{$danger-background-color} !important;
  }

  &-custom-size {
    --switch-size: 40px !important;
  }
}
</style>
