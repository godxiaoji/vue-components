<template>
  <div>
    <fx-group title="基础用法">
      <ul class="backTop-box">
        <li>Scroll to bottom 往下滑</li>
        <li>Scroll to bottom 往下滑</li>
        <li>Scroll to bottom 往下滑</li>
        <li>Scroll to bottom 往下滑</li>
        <li>Scroll to bottom 往下滑</li>
        <li>Scroll to bottom 往下滑</li>
        <li>Scroll to bottom 往下滑</li>
        <li>Scroll to bottom 往下滑</li>
        <li>Scroll to bottom 往下滑</li>
        <li>Scroll to bottom 往下滑</li>
        <li>Scroll to bottom 往下滑</li>
      </ul>
    </fx-group>
    <fx-back-top ></fx-back-top>
    <fx-back-top :offset="[0, -50]">UP</fx-back-top>
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  props: {},
  data() {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../../../src/components/style/var.scss';

.backTop-box {
  list-style: none;
  padding: 6px 0;
  margin: 0;
  box-sizing: border-box;
  height: 1500px;

  li {
    line-height: 32px;
    font-size: 14px;
    color: $title-color;
    padding: 0 16px;
  }
}
</style>
