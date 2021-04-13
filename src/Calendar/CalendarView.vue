<template>
  <div class="fx-calendar-view">
    <div class="fx-calendar-view_header">
      <div class="fx-calendar-view_weekdays">
        <span
          class="fx-calendar-view_weekday"
          :class="{ highlight: weekDay.value === 0 || weekDay.value === 6 }"
          v-for="weekDay in weekDays"
          :key="weekDay.value"
          >{{ weekDay.label }}</span
        >
      </div>
    </div>
    <div class="fx-calendar-view_body">
      <template
        class="fx-calendar-view_month"
        v-for="(month, monthIndex) in months"
        :key="month.caption"
      >
        <div class="fx-calendar-view_month-caption">
          {{ month.caption }}
        </div>
        <div
          class="fx-calendar-view_days"
          :data-index="monthIndex"
          @click="onDaysClick"
        >
          <div
            class="fx-calendar-view_day"
            :class="{
              disabled: day.state === 'disabled',
              selected:
                day.state === 'selected' ||
                day.state === 'startSelected' ||
                day.state === 'endSelected',
              'in-range': type === 'range' && day.state === 'selected'
            }"
            v-for="(day, dayIndex) in month.days"
            :key="dayIndex"
            :data-index="dayIndex"
          >
            <span
              v-if="day.topText"
              class="fx-calendar-view_day-top-text"
              :class="{ highlight: day.topHighlight }"
              >{{ day.topText }}</span
            >
            {{ day.text }}
            <span
              v-if="day.bottomText"
              class="fx-calendar-view_day-bottom-text"
              :class="{ highlight: day.bottomHighlight }"
              >{{ day.bottomText }}</span
            >
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
import dayjs from 'dayjs'
import { Dayjs } from 'dayjs'
import { isDate, isInNumberRange, isEmpty } from '@/helpers/util'
import Toast from '@/Toast'
import {
  DEFAULT_MONTH_RANGE,
  getDetail as _getDetail,
  parseValues,
  TYPE_NAMES
} from '@/Calendar/util'
import { isSameArray } from '@/helpers/util'
import Exception from '@/helpers/exception'
import commonProps from '@/Calendar/props'
import { getEnumsValue } from '@/helpers/validator'
import type { DayInfo } from './types'

interface WeekDay {
  label: string
  value: number
}

interface SelectDay {
  dateString: string
  timestamp: number
  monthIndex: number
  dayIndex: number
  state?: string
}

interface Month {
  caption: string
  monthString: string
  days: DayInfo[]
  startDay: number
}

const defaultWeekDays: WeekDay[] = [
  { label: '日', value: 0 },
  { label: '一', value: 1 },
  { label: '二', value: 2 },
  { label: '三', value: 3 },
  { label: '四', value: 4 },
  { label: '五', value: 5 },
  { label: '六', value: 6 }
]

function printError(message: string) {
  console.error(new Exception(message, Exception.TYPE.PROP_ERROR, 'Calendar'))
}

export default defineComponent({
  name: 'fx-calendar-view',
  props: { ...commonProps },
  emits: ['select', 'update:modelValue'],
  setup(props, { emit }) {
    const weekDays = reactive<WeekDay[]>([])
    const months = reactive<Month[]>([])

    const type = getEnumsValue(TYPE_NAMES, props.initialType)
    let start: SelectDay = getDefaultSelectDay()
    let end: SelectDay = getDefaultSelectDay()

    function getDefaultSelectDay() {
      return {
        dateString: '',
        timestamp: 0,
        monthIndex: 0,
        dayIndex: 0
      }
    }

    function getSelectedInfo(timestamp: number): SelectDay | null {
      for (let i = 0; i < months.length; i++) {
        for (let j = 0; j < months[i].days.length; j++) {
          const day = months[i].days[j]

          if (day.state !== 'disabled') {
            if (timestamp === day.timestamp) {
              return {
                dateString: day.dateString,
                timestamp,
                monthIndex: i,
                dayIndex: j
              }
            }
          }
        }
      }

      return null
    }

    function updateValue(val: unknown) {
      const timeArr = parseValues(val, type)

      if (!isSameArray(timeArr, [start.timestamp, end.timestamp])) {
        if (timeArr.length === 0) {
          setSelected('start', null)
          setSelected('end', null)
          updateStates()
        } else if (type === 'range') {
          const _start = getSelectedInfo(timeArr[0])
          const _end = getSelectedInfo(timeArr[1])

          if (_start && _end) {
            const { rangeCount, hasDisabled } = getRangeInfo(_start, _end)

            if (hasDisabled) {
              printError('"modelValue"值的范围包含有禁用的天数.')
            } else if (rangeCount > props.maxRange) {
              printError(
                `"modelValue"值得范围有${rangeCount}天，不能超过${props.maxRange}天.`
              )
            } else {
              start = _start as SelectDay
              end = _end as SelectDay
              updateStates()
            }
          } else {
            printError(`"modelValue"值不在可选范围内.`)
          }
        } else {
          const select = getSelectedInfo(timeArr[0])

          if (select) {
            start = select
            setSelected('end', null)
            updateStates()
          } else {
            printError(`"modelValue"值不在可选范围内.`)
          }
        }
      }

      return getDetail()
    }

    function setSelected(name: string, day: SelectDay | null) {
      if (day) {
        name === 'start' ? (start = day) : (end = day)
      } else {
        name === 'start'
          ? (start = getDefaultSelectDay())
          : (end = getDefaultSelectDay())
      }
    }

    function getState(timestamp: number) {
      let state = ''

      if (
        (type === 'range' &&
          timestamp >= start.timestamp &&
          timestamp <= end.timestamp) ||
        timestamp === start.timestamp
      ) {
        state = 'selected'
      }
      if (type === 'range' && state == 'selected') {
        if (timestamp === end.timestamp) {
          state = 'endSelected'
        } else if (timestamp === start.timestamp) {
          state = 'startSelected'
        }
      }

      return state
    }

    function getDayInfo(day: Dayjs, extend: { state: string }): DayInfo {
      const dateString = day.format('YYYY-MM-DD')
      const state = extend.state

      let dayInfo: DayInfo = {
        topHighlight: false,
        topText:
          state === 'startSelected'
            ? '开始'
            : state === 'endSelected'
            ? '结束'
            : '',
        state,
        bottomHighlight: false,
        bottomText: '',
        text: day.date().toString(),
        dateString,
        timestamp: day.valueOf()
      }

      if (props.dayHandler) {
        dayInfo.date = day.toDate()
        dayInfo = props.dayHandler(Object.assign(dayInfo, extend))
        delete dayInfo.date
      }

      if (dayInfo.state === 'disabled' && !extend.state) {
        extend.state = 'disabled'
      }

      return Object.assign(dayInfo, extend, {
        dateString,
        timestamp: day.valueOf()
      })
    }

    function getFirstDayOfWeek() {
      return isInNumberRange(props.firstDayOfWeek, 0, 6)
        ? Math.round(props.firstDayOfWeek)
        : 0
    }

    function getStartMonth(day: Dayjs) {
      const month: Month = {
        caption: day.format('YYYY年MM月'),
        monthString: day.format('YYYY-MM'),
        days: [],
        startDay: day.date()
      }

      let day2 = day.startOf('month')

      // 头部周偏移占位
      for (let i = 0, len = day2.day() - getFirstDayOfWeek(); i < len; i++) {
        month.days.push({
          cover: true,
          text: '',
          state: 'disabled',
          dateString: '',
          timestamp: 0
        })
      }

      while (day2.date() < month.startDay) {
        month.days.push(getDayInfo(day2, { state: 'disabled' }))
        day2 = day2.add(1, 'day')
      }

      return month
    }

    function updateWeekDays() {
      let i = getFirstDayOfWeek()
      const newWeekDays: WeekDay[] = []

      let weekDay: WeekDay
      while (newWeekDays.length < 7) {
        weekDay = defaultWeekDays[i]
        newWeekDays.push(weekDay)
        i = (i + 1) % 7
      }

      weekDays.splice(0, Infinity, ...newWeekDays)
    }

    let minTimestamp = 0
    let maxTimestamp = 0

    function updateOptions() {
      if (isDate(props.minDate)) {
        minTimestamp = dayjs(props.minDate)
          .startOf('day')
          .valueOf()
      } else {
        printError(`"minDate"必须是 Date 类型.`)
        minTimestamp = dayjs()
          .startOf('day')
          .valueOf()
      }

      if (isDate(props.maxDate)) {
        if ((props.maxDate as any).getTime() < minTimestamp) {
          printError(`"maxDate"不能小于"minDate".`)
          maxTimestamp = dayjs(minTimestamp)
            .add(DEFAULT_MONTH_RANGE, 'month')
            .valueOf()
        } else {
          maxTimestamp = dayjs(props.maxDate)
            .startOf('day')
            .valueOf()
        }
      } else {
        printError(`"maxDate"必须是 Date 类型.`)
        maxTimestamp = dayjs(minTimestamp)
          .add(DEFAULT_MONTH_RANGE, 'month')
          .valueOf()
      }

      updateWeekDays()

      const maxDay = dayjs(maxTimestamp)
      const _months = []

      let day = dayjs(minTimestamp)
      let monthKey = day.month()
      let month = getStartMonth(day)

      while (!day.isAfter(maxDay)) {
        if (day.month() !== monthKey) {
          monthKey = day.month()
          _months.push(month)
          month = getStartMonth(day)
        }

        const dayInfo = getDayInfo(day, {
          state: getState(day.valueOf())
        })

        // if (
        //   dayInfo.state === 'startSelected' ||
        //   (type === 'single' && dayInfo.state === 'selected')
        // ) {
        //   setSelected('start', dayInfo, _months.length, month.days.length)
        // } else if (dayInfo.state === 'endSelected') {
        //   setSelected('end', dayInfo, _months.length, month.days.length)
        // }

        month.days.push(dayInfo)
        day = day.add(1, 'day')
      }

      // 补上最后一个月结尾的天数
      while (day.month() === monthKey) {
        month.days.push(
          getDayInfo(day, {
            state: 'disabled'
          })
        )

        day = day.add(1, 'day')
      }

      _months.push(month)

      months.splice(0, Infinity, ..._months)
    }

    function dayInfo2SelectDay(
      day: DayInfo,
      monthIndex: number,
      dayIndex: number
    ): SelectDay {
      return {
        dateString: day.dateString,
        timestamp: day.timestamp,
        state: day.state,
        monthIndex,
        dayIndex
      }
    }

    function onDaysClick(e: Event) {
      const target = e.target as HTMLElement
      let $day: HTMLElement | null = null

      if (target.tagName === 'SPAN') {
        $day = target.parentElement as HTMLElement
      } else if (target !== e.currentTarget) {
        $day = target
      }

      if (!$day) {
        return
      }

      const monthIndex = parseInt(
        (e.currentTarget as HTMLElement).dataset.index as string
      )
      const dayIndex = parseInt($day.dataset.index as string)
      const day = months[monthIndex].days[dayIndex]

      if (day.state === 'disabled') {
        return
      }

      if (type === 'range') {
        // 范围
        if ((start.dateString && end.dateString) || !start.dateString) {
          setSelected('end', null)
        } else {
          if (
            day.timestamp > start.timestamp ||
            (props.allowSameDay && day.timestamp === start.timestamp)
          ) {
            // 范围
            const { rangeCount, hasDisabled } = getRangeInfo(start, {
              monthIndex,
              dayIndex
            })

            if (!hasDisabled) {
              if (rangeCount > props.maxRange) {
                Toast.showToast(`选择天数不能超过${props.maxRange}天`)
              } else {
                setSelected('end', dayInfo2SelectDay(day, monthIndex, dayIndex))
                // this.rangeCount = rangeCount
                updateStates()
                onSelect()
              }
              return
            }
          }
        }
      } else {
        // 单选
        setSelected('start', dayInfo2SelectDay(day, monthIndex, dayIndex))
        // this.rangeCount = 1
        updateStates()
        onSelect()
        return
      }

      // 设置开始时间
      setSelected('start', dayInfo2SelectDay(day, monthIndex, dayIndex))
      updateStates()
    }

    function updateStates() {
      for (let i = 0; i < months.length; i++) {
        for (let j = 0; j < months[i].days.length; j++) {
          const day = months[i].days[j]

          if (day.state !== 'disabled') {
            const newState = getState(day.timestamp)

            if (newState !== day.state) {
              months[i].days[j] = getDayInfo(dayjs(day.timestamp), {
                state: newState
              })
            }
          }
        }
      }
    }

    function onSelect() {
      let value: Date | Date[]

      if (type === 'range') {
        value = [dayjs(start.timestamp).toDate(), dayjs(end.timestamp).toDate()]
      } else {
        value = dayjs(start.timestamp).toDate()
      }

      emit('update:modelValue', value)
      emit('select', getDetail())
    }

    function getDetail() {
      return _getDetail([start.timestamp, end.timestamp], type)
    }

    /**
     * 判断所选范围内有没有 disabled
     */
    function getRangeInfo(
      start: { monthIndex: number; dayIndex: number },
      end: { monthIndex: number; dayIndex: number }
    ) {
      let hasDisabled = false
      let rangeCount =
        start.monthIndex === end.monthIndex && start.dayIndex === end.dayIndex
          ? 1
          : 2

      for (let i = start.monthIndex; i <= end.monthIndex; i++) {
        for (
          let j = i === start.monthIndex ? start.dayIndex + 1 : 0,
            len = i === end.monthIndex ? end.dayIndex : months[i].days.length;
          j < len;
          j++
        ) {
          const day = months[i].days[j]

          if (!day.cover) {
            if (day.state === 'disabled') {
              hasDisabled = true
            } else {
              rangeCount++
            }
          }
        }
      }

      return {
        hasDisabled,
        rangeCount
      }
    }

    let updateOptionsTimer: number

    function reset() {
      clearTimeout(updateOptionsTimer)
      updateOptionsTimer = window.setTimeout(() => {
        setSelected('start', null)
        setSelected('end', null)
        updateOptions()
        const values = [start.timestamp, end.timestamp]

        updateValue(values)
      }, 17)
    }

    watch([() => props.minDate, () => props.maxDate], reset, {
      deep: true
    })

    watch(
      () => props.modelValue,
      val => updateValue(val)
    )

    updateOptions()
    !isEmpty(props.modelValue) && updateValue(props.modelValue)

    return {
      type,
      weekDays,
      months,
      onDaysClick,
      getDetail,
      updateValue
    }
  }
})
</script>
