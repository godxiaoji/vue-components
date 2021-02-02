<template>
  <div>
    <fx-group title="基础用法">
      <div class="tab-box">
        <fx-tab
          :options="shortTabList"
          :activeValue.sync="shortActiveValue"
        ></fx-tab>
      </div>
    </fx-group>
    <fx-group title="滚动（阈值 scrollThreshold = 4）">
      <div class="tab-box">
        <fx-tab :options="tabList" :activeValue.sync="activeValue"></fx-tab>
      </div>
    </fx-group>
    <fx-group title="Mix">
      <div class="tab-box">
        <fx-tab :options="mixTabList"></fx-tab>
      </div>
    </fx-group>
    <fx-group title="带副标签">
      <div class="tab-box">
        <fx-tab :options="subTabList"></fx-tab>
      </div>
    </fx-group>
  </div>
</template>

<script>
import { shortTabList, tabList, mixTabList, subTabList } from './data'

export default {
  name: 'Tab',
  props: {},
  data() {
    return {
      shortActiveValue: 1,
      activeValue: 1,
      shortTabList,
      tabList,
      mixTabList,
      subTabList
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/style/var.scss';

.tab-box {
  background-color: $background-color;
}
</style>
