<template>
  <div class="fx-time-ago">
    {{ timeAgo }}
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, ref, watch } from 'vue'
import { isDate, isString, isNumber } from '@/helpers/util'
import dayjs from '@/helpers/day'
import { Dayjs } from 'dayjs'
import { format } from 'timeago.js'
import { addTimer } from '@/helpers/timer'

export default defineComponent({
  name: 'fx-time-ago',
  props: {
    // 倒计时时间
    time: {
      type: [Date, String, Number],
      default: null
    },
    // 格式化模板
    formatTemplate: {
      type: String,
      default: null
    },
    // 自动更新的间隔，单位：秒
    interval: {
      type: Number,
      default: 60
    }
  },
  setup(props) {
    const timeAgo = ref('')

    function getDate() {
      let djs: Dayjs | null = null

      if (isDate(props.time) || isNumber(props.time)) {
        djs = dayjs(props.time)
      } else if (isString(props.time) && props.formatTemplate) {
        djs = dayjs(props.time, props.formatTemplate)
      }

      if (djs && djs.isValid()) {
        return djs.toDate()
      }

      return null
    }

    function update() {
      const d = getDate()

      timeAgo.value = d == null ? '' : format(d, 'zh_CN')
    }

    watch([() => props.time, () => props.formatTemplate], update, {
      immediate: true
    })

    let removeTimer: Function | null = null
    watch(
      () => props.interval,
      () => {
        removeTimer && removeTimer()
        removeTimer = addTimer(update, props.interval)
      },
      {
        immediate: true
      }
    )
    onBeforeUnmount(() => removeTimer && removeTimer())

    return {
      timeAgo
    }
  }
})
</script>
