<template>
  <div>
    <fx-group title="基础用法">
      <div class="load-more-box">
        <fx-load-more></fx-load-more>
      </div>
    </fx-group>
    <fx-group title="Slot defaut">
      <div class="load-more-box">
        <fx-load-more>暂无数据</fx-load-more>
      </div>
    </fx-group>
    <fx-group title="loading=true">
      <div class="load-more-box">
        <fx-load-more loading>加载中...</fx-load-more>
      </div>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'LoadMore'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/style/var.scss';

.load-more {
  &-box {
    padding: 16px 0;
  }
}
</style>
