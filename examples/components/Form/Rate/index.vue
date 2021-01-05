<template>
  <div>
    <fx-group title="基础用法">
      <fx-cell label="默认"><fx-rate /></fx-cell>
      <fx-cell label="modelValue=3"><fx-rate modelValue="3" /></fx-cell>
    </fx-group>
    <fx-group title="风格">
      <fx-cell label="爱心（pattern=heart）"
        ><fx-rate pattern="heart" modelValue="3"
      /></fx-cell>
      <fx-cell label="换色（激活色#F5A511）"
        ><fx-rate class="rate-custom-color" modelValue="3"
      /></fx-cell>
      <fx-cell label="变小（size=16px）"
        ><fx-rate class="rate-custom-size" modelValue="3"
      /></fx-cell>
    </fx-group>
    <fx-group title="自定义数量">
      <fx-cell label="count=8"><fx-rate count="8"/></fx-cell>
    </fx-group>
    <fx-group title="半星">
      <fx-cell label="modelValue=2.5"><fx-rate allow-half v-model="value" :count="count"/></fx-cell>
    </fx-group>
    <fx-group title="状态">
      <fx-cell label="只读"><fx-rate readonly :modelValue="3"/></fx-cell>
      <fx-cell label="禁用"><fx-rate disabled :modelValue="3"/></fx-cell>
    </fx-group>
    <fx-group title="事件监听">
      <fx-cell label="change"><fx-rate allow-half @change="onChange"/></fx-cell>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'Rate',
  props: {},
  data() {
    return {
      count: 5,
      value: 2.5
    }
  },
  methods: {
    onChange({ value }) {
      this.$showToast(`Value: ${value}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../../../src/components/component.module.scss';

.rate {
  &-custom-color {
    --rate-active-color: #{$warning-color} !important;
  }

  &-custom-size {
    --rate-size: 16px !important;
  }
}
</style>
