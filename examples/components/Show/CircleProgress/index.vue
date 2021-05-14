<template>
  <div>
    <fx-group title="基础用法">
      <div class="circle-progress-box">
        <fx-circle-progress :percentage="percentage" />
        <fx-stepper :min="0" :max="100" v-model="percentage" />
      </div>
    </fx-group>
    <fx-group title="参数设置">
      <ul class="circle-progress-list">
        <li>
          <fx-circle-progress :percentage="percentage" color="#ff4d4f"
            >color</fx-circle-progress
          >
        </li>
        <li>
          <fx-circle-progress :percentage="percentage" :strokeWidth="2"
            >strokeWidth
          </fx-circle-progress>
        </li>
        <li>
          <fx-circle-progress :percentage="percentage" :size="80"
            >size</fx-circle-progress
          >
        </li>
      </ul>
    </fx-group>
    <fx-group title="Slot default">
      <div class="circle-progress-box">
        <fx-circle-progress :percentage="percentage">
          <template #default="{ progress }"> 已抢{{ progress }} </template>
        </fx-circle-progress>
      </div>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'CircleProgress',
  data() {
    return {
      percentage: 50
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/style/var.scss';

.circle-progress {
  &-box {
    padding: 12px 16px;
    display: flex;
    align-items: flex-end;
  }

  &-bottom {
    padding: 0 16px 12px;
  }

  &-list {
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
    padding: 12px 0 0 16px;

    li {
      float: left;
      margin: 0 16px 12px 0;

      .fx-circle-progress {
        float: left;
      }
    }

    &.fixed-bar li {
      width: 80%;
    }
  }
}
</style>
