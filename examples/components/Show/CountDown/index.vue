<template>
  <div>
    <fx-group title="基础用法">
      <fx-cell label="默认" class="count-down-box">
        <fx-count-down v-model:timestamp="time"></fx-count-down>
      </fx-cell>
      <fx-cell label="显示天数" class="count-down-box">
        <fx-count-down v-model:timestamp="time2" showDays></fx-count-down>
      </fx-cell>
    </fx-group>
    <fx-group title="Slot">
      <fx-cell label="中文显示" class="count-down-box">
        <fx-count-down v-model:timestamp="time3">
          <template #default="countDown">
            {{ countDown.fullHours }}时{{ countDown.minutes }}分{{
              countDown.seconds
            }}秒
          </template>
        </fx-count-down>
      </fx-cell>
      <fx-cell label="毫秒" class="count-down-box">
        <fx-count-down v-model:timestamp="time5">
          <template #default="countDown">
            {{ countDown.fullHours }}:{{ countDown.minutes }}:{{
              countDown.seconds
            }}.{{ countDown.milliseconds }}
          </template>
        </fx-count-down>
      </fx-cell>
      <fx-cell label="自定义风格" class="count-down-box">
        <fx-count-down v-model:timestamp="time3">
          <template #default="countDown">
            <span class="count-down-time-item">{{ countDown.fullHours }}</span
            ><span class="count-down-time-item">{{ countDown.minutes }}</span
            ><span class="count-down-time-item">{{ countDown.seconds }}</span>
          </template>
        </fx-count-down>
      </fx-cell>
    </fx-group>
    <fx-group title="时间监听">
      <fx-cell label="pause/resume/end" class="count-down-box">
        <div class="count-down-time-r">
          <fx-count-down
            v-model:timestamp="time4"
            :paused="paused"
            @pause="onPause"
            @resume="onResume"
            @end="onEnd"
          ></fx-count-down>
        </div>
        <fx-button @click="paused = !paused" size="small">{{
          paused ? '恢复' : '暂停'
        }}</fx-button>
        <fx-button @click="time4 = 100 * 1000" size="small" type="danger">
          重置
        </fx-button>
      </fx-cell>
    </fx-group>
  </div>
</template>

<script>
import Toast from '@/Toast'

export default {
  name: 'CountDown',
  data() {
    return {
      time: 300 * 1000,
      time2: 1.5 * 24 * 3600 * 1000,
      time3: 300 * 1000,
      time4: 100 * 1000,
      time5: 300 * 1000,
      paused: false
    }
  },
  methods: {
    onPause(e) {
      console.log(e)
      Toast.showToast('已暂停')
    },
    onResume(e) {
      console.log(e)
      Toast.showToast('继续计时')
    },
    onEnd(e) {
      console.log(e)
      Toast.showToast('计时结束')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/style/var.scss';

.count-down {
  &-box {
    .fx-button {
      flex-grow: 0;
    }
  }

  &-time-item {
    display: inline-flex;
    width: 24px;
    align-items: center;
    justify-content: center;
    background: $primary-color;
    color: #fff;
    margin-left: 5px;
  }

  &-time-r {
    margin-right: 16px;
  }
}
</style>
