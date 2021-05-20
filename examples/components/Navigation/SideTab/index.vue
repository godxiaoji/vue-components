<template>
  <div>
    <fx-group title="基础用法">
      <div class="side-tab-box">
        <fx-side-tab
          :options="tabList"
          v-model:activeValue="activeValue"
        ></fx-side-tab>
      </div>
    </fx-group>
    <fx-group title="Mix">
      <div class="side-tab-box">
        <fx-side-tab :options="mixTabList"></fx-side-tab>
      </div>
    </fx-group>
  </div>
</template>

<script>
import { mixTabList, tabList } from '../Tab/data'

export default {
  name: 'SideTab',
  data() {
    return {
      activeValue: 1,
      mixTabList,
      tabList
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/style/var.scss';

.side-tab-box {
  height: 220px;
  padding-right: 275px;
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
}
</style>
