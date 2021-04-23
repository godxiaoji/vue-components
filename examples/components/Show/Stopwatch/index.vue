<template>
  <div>
    <fx-group title="基础用法">
      <div class="stopwatch-box">
        <div class="stopwatch-box-header">
          <fx-stopwatch
            @stop="onStop"
            @start="onStart"
            @reset="onReset"
            ref="stopWatch"
          ></fx-stopwatch>
        </div>
        <div class="stopwatch-box-body">
          <fx-button @click="resetOrLap">
            {{ paused ? '重置' : '计次' }}
          </fx-button>
          <fx-button
            @click="startOrStop"
            :type="!paused ? 'danger' : 'success'"
            >{{ paused ? '启动' : '停止' }}</fx-button
          >
        </div>
      </div>
      <fx-cell
        :label="'计次 ' + (laps.length - index)"
        v-for="(item, index) in laps"
        :key="item"
        >{{ item }}</fx-cell
      >
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'Stopwatch',
  props: {},
  data() {
    return {
      paused: true,
      laps: []
    }
  },
  methods: {
    setLaps(laps) {
      this.laps = laps.reverse().map(countTime => {
        return `${
          countTime.fullHours > 0 ? countTime.thousandsFullHours + ':' : ''
        }${countTime.minutes}:${countTime.seconds}.${countTime.milliseconds}`
      })
    },
    resetOrLap() {
      if (this.paused) {
        this.$refs.stopWatch.reset()
        this.laps = []
      } else {
        this.setLaps(this.$refs.stopWatch.lap())
      }
    },
    startOrStop() {
      if (this.paused) {
        this.$refs.stopWatch.start()
      } else {
        this.$refs.stopWatch.stop()
      }
    },
    onStop(e) {
      this.paused = true

      console.log(e)

      this.setLaps(e.laps)
    },
    onStart(e) {
      this.paused = false
      console.log(e)
    },
    onReset(e) {
      this.paused = true
      console.log(e)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/style/var.scss';

.stopwatch {
  &-box {
    &-header {
      padding: 12px 0;
      font-size: 48px;
      text-align: center;
    }

    &-body {
      padding: 12px 0;
      text-align: center;

      .fx-button {
        width: 120px;
      }
    }
  }
}
</style>
