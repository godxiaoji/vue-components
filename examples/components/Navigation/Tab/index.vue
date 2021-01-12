<template>
  <div>
    <fx-group title="基础用法">
      <div class="tab-box">
        <fx-tab :options="shortTabList" v-model="shortActiveName"></fx-tab>
      </div>
    </fx-group>
    <fx-group title="竖向">
      <div class="tab-box" style="height: 220px;">
        <fx-tab :options="shortTabList" v-model="shortActiveName" :vertical="true"></fx-tab>
      </div>
    </fx-group>
    <fx-group title="滚动（阈值 scrollThreshold = 4）">
      <div class="tab-box">
        <fx-tab :options="tabList" v-model="activeName"></fx-tab>
      </div>
    </fx-group>
    <fx-group title="竖向">
      <div class="tab-box" style="height: 220px;">
        <fx-tab :options="tabList" v-model="activeName" :vertical="true"></fx-tab>
      </div>
    </fx-group>
  </div>
</template>

<script>
import { shortTabList, tabList } from './data'

export default {
  name: 'Tab',
  props: {},
  data() {
    return {
      shortActiveName: 1,
      activeName: 1,
      shortTabList,
      tabList
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/style/var.scss';

.tab-box {
  background-color: $background-color;
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
}
</style>
