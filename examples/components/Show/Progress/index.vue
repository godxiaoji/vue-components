<template>
  <div>
    <fx-group title="基础用法">
      <div class="progress-box">
        <fx-progress :percentage="percentage" />
      </div>
      <div class="progress-bottom">
        <fx-stepper :min="0" :max="100" v-model="percentage" />
      </div>
    </fx-group>
    <fx-group title="展示文字">
      <ul class="progress-list">
        <li>
          <fx-progress :percentage="5" show-text />
        </li>
        <li>
          <fx-progress :percentage="50" show-text />
        </li>
        <li>
          <fx-progress :percentage="100" show-text />
        </li>
      </ul>
    </fx-group>
    <fx-group title="固定进度条">
      <ul class="progress-list fixed-bar">
        <li>
          <fx-progress :percentage="5" fixed-bar show-text />
        </li>
        <li>
          <fx-progress :percentage="50" fixed-bar show-text />
        </li>
        <li>
          <fx-progress :percentage="100" fixed-bar show-text />
        </li>
      </ul>
    </fx-group>
    <fx-group title="Slot default">
      <div class="progress-box">
        <fx-progress :percentage="5">
          <template #default="{ progress }"> 已抢{{ progress }} </template>
        </fx-progress>
      </div>
    </fx-group>
    <fx-group title="自定义Color">
      <div class="progress-box">
        <fx-progress :percentage="50" show-text class="progress-custom-color" />
      </div>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'Progress',
  data() {
    return {
      percentage: 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/style/var.scss';

.progress {
  &-box {
    padding: 12px 16px;
  }

  &-bottom {
    padding: 0 16px 12px;
  }

  &-list {
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: hidden;

    li {
      margin: 12px 16px;
    }

    &.fixed-bar li {
      width: 80%;
    }
  }

  &-custom-color {
    --progress-color: #{$danger-color} !important;
    --progress-text-color: #{$danger-color} !important;
    --progress-background-color: #{$danger-background-color} !important;
  }
}
</style>
