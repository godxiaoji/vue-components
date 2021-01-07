<template>
  <div>
    <fx-group title="基础用法">
      <fx-divider />
    </fx-group>
    <fx-group title="带文本">
      <fx-divider title="文本" />
    </fx-group>
    <fx-group title="虚线">
      <fx-divider title="文本" dashed />
    </fx-group>
    <fx-group title="自定义颜色">
      <fx-divider class="divider-custom-color" title="蓝色" />
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'Divider',
  props: {},
  data() {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../../../src/components/style/var.scss';

.divider-custom-color {
  --divider-font-color: #{$primary-color} !important;
  --divider-border-color: #{$primary-background-color} !important;
}
</style>
