<template>
  <div class="fx-stopwatch">
    <slot :a="countTime">
      {{
        countTime.fullHours > 0
          ? (thousands ? countTime.thousandsFullHours : countTime.fullHours) +
            ':'
          : ''
      }}{{ countTime.minutes }}:{{ countTime.seconds
      }}{{ showMilliseconds ? '.' + countTime.milliseconds : '' }}
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CountTime } from '../hooks/count-time'
import { useCountTime, getCountTime } from '@/hooks/count-time'
import { cloneData } from '@/helpers/util'

export default defineComponent({
  name: 'fx-stopwatch',
  props: {
    // 是否显示毫秒数
    showMilliseconds: {
      type: Boolean,
      default: true
    },
    // 是否千分位显示
    thousands: {
      type: Boolean,
      default: true
    }
  },
  emits: ['stop', 'start', 'reset'],
  setup(props, { emit }) {
    let time = 0
    let startTime = 0
    let laps: CountTime[] = []

    const countTime = useCountTime(({ update }) => {
      time = Date.now() - startTime
      update(time)
    })

    function emitEvent(event: string) {
      emit(event as 'start', {
        type: event
      })
    }

    function doing() {
      return startTime > 0
    }

    function stop() {
      if (doing()) {
        const _laps = cloneData(laps)
        _laps.push(getNextLap())

        emit('stop', {
          type: 'stop',
          detail: getCountTime(time),
          laps: _laps
        })

        startTime = 0
        countTime.stop()
      }
    }

    function start() {
      if (startTime === 0) {
        startTime = Date.now() - time
      }

      emitEvent('start')

      countTime.start()
    }

    function reset() {
      doing() && stop()

      emitEvent('reset')
      time = 0
      laps = []
      countTime.update(0)

      countTime.stop()
    }

    function getNextLap() {
      let totalTime = 0

      laps.forEach(({ time }) => {
        totalTime += time
      })

      return getCountTime(time - totalTime)
    }

    function lap(): CountTime[] {
      if (doing()) {
        laps.push(getNextLap())

        return cloneData(laps)
      }

      return []
    }

    countTime.update(0)

    return {
      time,
      countTime: countTime.times,
      stop,
      start,
      reset,
      lap
    }
  }
})
</script>
