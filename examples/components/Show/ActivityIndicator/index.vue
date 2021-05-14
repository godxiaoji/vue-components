<template>
  <div>
    <fx-group title="基础用法">
      <div class="activity-indicator-box">
        <fx-activity-indicator />
      </div>
    </fx-group>
    <fx-group title="颜色 color=#ff4d4f">
      <div class="activity-indicator-box">
        <fx-activity-indicator color="#ff4d4f" />
      </div>
    </fx-group>
    <fx-group title="大小 size=48">
      <div class="activity-indicator-box">
        <fx-activity-indicator :size="48" />
      </div>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'ActivityIndicator'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/style/var.scss';

.activity-indicator {
  &-box {
    padding: 12px 16px;
  }
}
</style>
