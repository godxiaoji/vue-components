<template>
  <div>
    <fx-group title="基础用法">
      <fx-tab-bar :options="baseList" v-model:activeValue="activeValue" />
    </fx-group>
    <fx-group title="徽标">
      <fx-tab-bar :options="badgeList" />
    </fx-group>
    <!-- <fx-group title="自定义图标">
      <fx-tab-bar :options="customIconList" />
    </fx-group> -->
    <fx-group title="自定义颜色">
      <fx-tab-bar class="tab-bar-custom-color" :options="baseList" />
    </fx-group>
    <fx-group title="配合 Fixed 实现置底">
      <fx-fixed>
        <fx-tab-bar :options="baseList" v-model:activeValue="activeValue" />
      </fx-fixed>
    </fx-group>
  </div>
</template>

<script>
import { baseList, badgeList } from './data'

export default {
  name: 'TabBar',
  props: {},
  data() {
    return {
      activeValue: 1,
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
