<template>
  <div>
    <fx-group title="基础用法">
      <fx-tab-bar
        :options="baseList"
        :fixed="false"
        :activeValue.sync="activeValue"
      />
    </fx-group>
    <fx-group title="徽标">
      <fx-tab-bar :options="badgeList" :fixed="false" />
    </fx-group>
    <fx-group title="自定义图标">
      <fx-tab-bar :options="customIconList" :fixed="false" />
    </fx-group>
    <fx-group title="自定义颜色">
      <fx-tab-bar
        class="tab-bar-custom-color"
        :options="baseList"
        :fixed="false"
      />
    </fx-group>
  </div>
</template>

<script>
import { customIconList, baseList, badgeList } from './data'

export default {
  name: 'TabBar',
  props: {},
  data() {
    return {
      activeValue: 1,
      customIconList,
      baseList,
      badgeList
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/style/var.scss';

.tab-bar {
  &-custom-color {
    --tab-bar-color: #{$danger-border-color} !important;
    --tab-bar-active-color: #fff !important;
    --tab-bar-background-color: #{$danger-color} !important;
  }
}
</style>
