<template>
  <div>
    <fx-group title="基本用法">
      <fx-fixed>
        <div class="fixed-box">
          <fx-button type="primary">固定布局</fx-button>
        </div>
      </fx-fixed>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'Fixed'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.fixed {
  &-box {
    display: flex;
    padding: 12px 16px;
    display: flex;
  }
}
</style>
