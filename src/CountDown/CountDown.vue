<template>
  <div class="fx-count-down">
    <slot :="countDown">
      {{
        showDays
          ? countDown.days + '天 ' + countDown.hours
          : countDown.fullHours
      }}:{{ countDown.minutes }}:{{ countDown.seconds }}
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, reactive, watch } from 'vue'

interface CountDown {
  days: string
  fullHours: string
  hours: string
  minutes: string
  seconds: string
  milliseconds: string
}

export default defineComponent({
  name: 'fx-count-down',
  props: {
    // 倒计时时间
    timestamp: {
      type: Number,
      default: 0
    },
    // 是否显示天数
    showDays: {
      type: Boolean,
      default: false
    },
    // 是否暂停
    paused: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:timestamp', 'pause', 'resume', 'end'],
  setup(props, { emit }) {
    const countDown = reactive<CountDown>({
      days: '0',
      fullHours: '0',
      hours: '00',
      minutes: '00',
      seconds: '00',
      milliseconds: '000'
    })

    let startTime = 0
    let expiredTime = 0
    let remainTime = 0

    function formatNumber(num: number) {
      return (num > 9 ? '' : '0') + num
    }

    function cutOne(num: number, divisor: number) {
      return Math.floor(num / divisor)
    }

    function update(timestamp: number) {
      countDown.milliseconds =
        (remainTime % 1000 > 99 ? '' : '0') + formatNumber(remainTime % 1000)
      timestamp = cutOne(remainTime, 1000)
      countDown.seconds = formatNumber(timestamp % 60)
      timestamp = cutOne(timestamp, 60)
      countDown.minutes = formatNumber(timestamp % 60)
      timestamp = cutOne(timestamp, 60)
      countDown.fullHours = formatNumber(timestamp)
      countDown.hours = formatNumber(timestamp % 24)
      countDown.days = cutOne(timestamp, 24).toString()
    }

    let timer: number

    function start() {
      timer = requestAnimationFrame(() => {
        remainTime = expiredTime - Date.now()

        if (remainTime > 0) {
          update(remainTime)
          emit('update:timestamp', remainTime)
          start()
        } else {
          remainTime = 0
          update(remainTime)
          emit('update:timestamp', remainTime)
          stop()
          emit('end', {
            startTime,
            endTime: expiredTime
          })
        }
      })
    }

    function stop() {
      cancelAnimationFrame(timer)
    }

    watch(
      () => props.timestamp,
      val => {
        if (props.timestamp === remainTime) {
          return
        }

        stop()

        startTime = Date.now()
        expiredTime = val + startTime
        remainTime = val

        update(remainTime)

        !props.paused && start()
      },
      {
        immediate: true
      }
    )

    watch(
      () => props.paused,
      val => {
        if (val) {
          emit('pause', {
            type: 'pause',
            remainTime
          })

          stop()
        } else {
          emit('resume', {
            type: 'resume',
            remainTime
          })

          expiredTime = remainTime + Date.now()

          start()
        }
      }
    )

    onBeforeUnmount(stop)

    return {
      countDown
    }
  }
})
</script>
