import { cloneData, thousands } from '@/helpers/util'
import { onBeforeUnmount, reactive } from 'vue'
import { CountTime } from './types'

interface StepHandlers {
  update: (time: number) => void
  start: () => void
  stop: () => void
}

function formatNumber(num: number) {
  return (num > 9 ? '' : '0') + num
}

function cutOne(num: number, divisor: number) {
  return Math.floor(num / divisor)
}

export function getDefaultCountTime(): CountTime {
  return cloneData({
    time: 0,
    days: '0',
    fullHours: '0',
    thousandsFullHours: '0',
    hours: '00',
    minutes: '00',
    seconds: '00',
    milliseconds: '000'
  })
}

export function getCountTime(time: number) {
  const times = getDefaultCountTime()

  times.time = time
  times.milliseconds = (time % 1000 > 99 ? '' : '0') + formatNumber(time % 1000)
  time = cutOne(time, 1000)
  times.seconds = formatNumber(time % 60)
  time = cutOne(time, 60)
  times.minutes = formatNumber(time % 60)
  time = cutOne(time, 60)
  times.fullHours = formatNumber(time)
  times.thousandsFullHours = thousands(time)
  times.hours = formatNumber(time % 24)
  times.days = cutOne(time, 24).toString()

  return times
}

export function useCountTime(onStep: (handlers: StepHandlers) => void) {
  const times = reactive<CountTime>(getDefaultCountTime())

  function update(time: number) {
    Object.assign(times, getCountTime(time))
  }

  let timer: number

  function start() {
    timer = requestAnimationFrame(() => {
      start()
      onStep({ update, start, stop })
    })
  }

  function stop() {
    cancelAnimationFrame(timer)
  }

  onBeforeUnmount(stop)

  return {
    times,
    start,
    stop,
    update
  }
}
