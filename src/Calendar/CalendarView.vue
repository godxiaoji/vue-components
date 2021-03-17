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
      >
        <div class="fx-calendar-view_month-caption" :key="month.caption">
          {{ month.caption }}
        </div>
        <div
          class="fx-calendar-view_days"
          :key="month.monthString"
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

<script>
import dayjs from 'dayjs'
import { isDate } from '../helpers/util'
import { showToast } from '../apis/Toast'
import mixin from './mixin'
import { DEFAULT_MONTH_RANGE, getDetail, parseValues, TYPE_NAMES } from './util'
import { isSameArray, inArray } from '../helpers/util'
import Exception from '../helpers/exception'

const weekDays = [
  { label: '日', value: 0 },
  { label: '一', value: 1 },
  { label: '二', value: 2 },
  { label: '三', value: 3 },
  { label: '四', value: 4 },
  { label: '五', value: 5 },
  { label: '六', value: 6 }
]

function printError(message) {
  console.error(new Exception(message, Exception.TYPE.PROP_ERROR, 'Calendar'))
}

export default {
  name: 'fx-calendar-view',
  inject: {
    appCalendarPopup: {
      default: null
    }
  },
  mixins: [mixin],
  data() {
    return {
      type: TYPE_NAMES[0],

      weekDays: [],
      months: [],

      start: {
        dateString: '',
        timestamp: 0,
        monthIndex: 0,
        dayIndex: 0
      },

      end: {
        dateString: '',
        timestamp: 0,
        monthIndex: 0,
        dayIndex: 0
      },

      rangeCount: 0,

      minTimestamp: 0,
      maxTimestamp: 0
    }
  },
  watch: {
    minDate: {
      handler() {
        this.reset()
      }
    },
    maxDate: {
      handler() {
        this.reset()
      }
    },
    modelValue: {
      handler(val) {
        this.updateValue(this.parseValues(val))
      }
    }
  },
  created() {
    this.type = inArray(this.initialType, TYPE_NAMES)
      ? this.initialType
      : TYPE_NAMES[0]

    const popup = this.appCalendarPopup

    this.updateOptions()
    this.updateValue(
      this.parseValues(
        popup && popup.modelValue != null ? popup.modelValue : this.modelValue
      )
    )

    if (popup) {
      popup.detail = this.getDetail()
      popup.updateValue = val => {
        return this.updateValue(this.parseValues(val))
      }
      popup.initialized()
    }
  },
  methods: {
    reset() {
      clearTimeout(this.updateOptionsTimer)
      this.updateOptionsTimer = setTimeout(() => {
        this.setSelected('start', null)
        this.setSelected('end', null)
        this.updateOptions()
        const values = [this.start.timestamp, this.end.timestamp]

        this.updateValue(values)
      }, 17)
    },

    parseValues(val) {
      return parseValues(val, this.type)
    },
    updateValue(values) {
      if (!isSameArray(values, [this.start.timestamp, this.end.timestamp])) {
        if (values.length === 0) {
          this.setSelected('start', null)
          this.setSelected('end', null)
          this.updateStates()
        } else if (this.type === 'range') {
          const start = this.getSelectedInfo(values[0])
          const end = this.getSelectedInfo(values[1])

          if (start && end) {
            const { rangeCount, hasDisabled } = this.getRangeInfo(start, end)

            if (hasDisabled) {
              printError('"modelValue"值的范围包含有禁用的天数.')
            } else if (rangeCount > this.maxRange) {
              printError(
                `"modelValue"值得范围有${rangeCount}天，不能超过${this.maxRange}天.`
              )
            } else {
              this.start = start
              this.end = end
              this.updateStates()
            }
          } else {
            printError(`"modelValue"值不在可选范围内.`)
          }
        } else {
          const select = this.getSelectedInfo(values[0])

          if (select) {
            this.start = select
            this.setSelected('end', null)
            this.updateStates()
          } else {
            printError(`"modelValue"值不在可选范围内.`)
          }
        }
      }

      return this.getDetail()
    },

    getSelectedInfo(timestamp) {
      for (let i = 0; i < this.months.length; i++) {
        for (let j = 0; j < this.months[i].days.length; j++) {
          const day = this.months[i].days[j]

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
    },

    getState(timestamp) {
      let state = ''

      if (
        (this.type === 'range' &&
          timestamp >= this.start.timestamp &&
          timestamp <= this.end.timestamp) ||
        timestamp === this.start.timestamp
      ) {
        state = 'selected'
      }
      if (this.type === 'range' && state == 'selected') {
        if (timestamp === this.end.timestamp) {
          state = 'endSelected'
        } else if (timestamp === this.start.timestamp) {
          state = 'startSelected'
        }
      }

      return state
    },
    getDayInfo(day, extend = {}) {
      const dateString = day.format('YYYY-MM-DD')
      const state = extend.state

      let dayInfo = {
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
        dateString
      }

      if (this.dayHandler) {
        dayInfo.date = day.toDate()
        dayInfo = this.dayHandler(Object.assign(dayInfo, extend))
        delete dayInfo.date
      }

      if (dayInfo.state === 'disabled' && !extend.state) {
        extend.state = 'disabled'
      }

      return Object.assign(dayInfo, extend, {
        dateString,
        timestamp: day.valueOf()
      })
    },
    getFirstDayOfWeek() {
      return this.firstDayOfWeek >= 0 && this.firstDayOfWeek <= 6
        ? parseInt(this.firstDayOfWeek)
        : 0
    },
    getStartMonth(day) {
      const month = {
        caption: day.format('YYYY年MM月'),
        monthString: day.format('YYYY-MM'),
        days: [],
        startDay: day.date()
      }

      let day2 = day.startOf('month')

      // 头部周偏移占位
      for (
        let i = 0, len = day2.day() - this.getFirstDayOfWeek();
        i < len;
        i++
      ) {
        month.days.push({
          cover: true,
          text: '',
          state: 'disabled'
        })
      }

      while (day2.date() < month.startDay) {
        month.days.push(this.getDayInfo(day2, { state: 'disabled' }))
        day2 = day2.add(1, 'day')
      }

      return month
    },

    updateWeekDays() {
      let i = this.getFirstDayOfWeek()
      const newWeekDays = []

      let weekDay
      while (newWeekDays.length < 7) {
        weekDay = weekDays[i]
        newWeekDays.push(weekDay)
        i = (i + 1) % 7
      }

      this.weekDays = newWeekDays
    },

    updateOptions() {
      if (isDate(this.minDate)) {
        this.minTimestamp = dayjs(this.minDate)
          .startOf('day')
          .valueOf()
      } else {
        printError(`"minDate"必须是 Date 类型.`)
        this.minTimestamp = dayjs()
          .startOf('day')
          .valueOf()
      }

      if (isDate(this.maxDate)) {
        if (this.maxDate.getTime() < this.minTimestamp) {
          printError(`"maxDate"不能小于"minDate".`)
          this.maxTimestamp = dayjs(this.minTimestamp)
            .add(DEFAULT_MONTH_RANGE, 'month')
            .valueOf()
        } else {
          this.maxTimestamp = dayjs(this.maxDate)
            .startOf('day')
            .valueOf()
        }
      } else {
        printError(`"maxDate"必须是 Date 类型.`)
        this.maxTimestamp = dayjs(this.minTimestamp)
          .add(DEFAULT_MONTH_RANGE, 'month')
          .valueOf()
      }

      this.updateWeekDays()

      const maxDay = dayjs(this.maxTimestamp)
      const months = []

      let day = dayjs(this.minTimestamp)
      let monthKey = day.month()
      let month = this.getStartMonth(day)

      while (!day.isAfter(maxDay)) {
        if (day.month() !== monthKey) {
          monthKey = day.month()
          months.push(month)
          month = this.getStartMonth(day)
        }

        const dayInfo = this.getDayInfo(day, {
          state: this.getState(day.valueOf())
        })

        // if (
        //   dayInfo.state === 'startSelected' ||
        //   (this.type === 'single' && dayInfo.state === 'selected')
        // ) {
        //   this.setSelected('start', dayInfo, months.length, month.days.length)
        // } else if (dayInfo.state === 'endSelected') {
        //   this.setSelected('end', dayInfo, months.length, month.days.length)
        // }

        month.days.push(dayInfo)
        day = day.add(1, 'day')
      }

      // 补上最后一个月结尾的天数
      while (day.month() === monthKey) {
        month.days.push(
          this.getDayInfo(day, {
            state: 'disabled'
          })
        )

        day = day.add(1, 'day')
      }

      months.push(month)

      this.months = months
    },

    setSelected(name, day, monthIndex, dayIndex) {
      if (day) {
        this[name] = {
          dateString: day.dateString,
          timestamp: day.timestamp,
          monthIndex,
          dayIndex
        }
      } else {
        this[name] = {
          dateString: '',
          timestamp: 0,
          monthIndex: 0,
          dayIndex: 0
        }
      }
    },

    onDaysClick(e) {
      let $day

      if (e.target.tagName === 'SPAN') {
        $day = e.target.parentNode
      } else if (e.target !== e.currentTarget) {
        $day = e.target
      }

      if (!$day) {
        return
      }

      const monthIndex = parseInt(e.currentTarget.dataset.index)
      const dayIndex = parseInt($day.dataset.index)

      const day = this.months[monthIndex].days[dayIndex]

      if (day.state === 'disabled') {
        return
      }

      if (this.type === 'range') {
        // 范围
        if (
          (this.start.dateString && this.end.dateString) ||
          !this.start.dateString
        ) {
          this.setSelected('end', null, monthIndex, dayIndex)
        } else {
          if (
            day.timestamp > this.start.timestamp ||
            (this.allowSameDay && day.timestamp === this.start.timestamp)
          ) {
            // 范围
            const { rangeCount, hasDisabled } = this.getRangeInfo(this.start, {
              monthIndex,
              dayIndex
            })

            if (!hasDisabled) {
              if (rangeCount > this.maxRange) {
                showToast(`选择天数不能超过${this.maxRange}天`)
              } else {
                this.setSelected('end', day, monthIndex, dayIndex)
                this.rangeCount = rangeCount
                this.updateStates()
                this.onSelect()
              }
              return
            }
          }
        }
      } else {
        // 单选
        this.setSelected('start', day, monthIndex, dayIndex)
        this.rangeCount = 1
        this.updateStates()
        this.onSelect()
        return
      }

      // 设置开始时间
      this.setSelected('start', day, monthIndex, dayIndex)
      this.updateStates()
    },

    updateStates() {
      for (let i = 0; i < this.months.length; i++) {
        for (let j = 0; j < this.months[i].days.length; j++) {
          const day = this.months[i].days[j]

          if (day.state !== 'disabled') {
            const newState = this.getState(day.timestamp)

            if (newState !== day.state) {
              this.$set(
                this.months[i].days,
                j,
                this.getDayInfo(dayjs(day.timestamp), { state: newState })
              )
            }
          }
        }
      }
    },

    onSelect() {
      let value

      if (this.type === 'range') {
        value = [
          dayjs(this.start.timestamp).toDate(),
          dayjs(this.end.timestamp).toDate()
        ]
      } else {
        value = dayjs(this.start.timestamp).toDate()
      }

      this.$emit('update:modelValue', value)
      this.$emit('select', this.getDetail())
    },

    getDetail() {
      return getDetail([this.start.timestamp, this.end.timestamp], this.type)
    },

    /**
     * 判断所选范围内有没有 disabled
     */
    getRangeInfo(start, end) {
      let hasDisabled = false
      let rangeCount =
        start.monthIndex === end.monthIndex && start.dayIndex === end.dayIndex
          ? 1
          : 2

      for (let i = start.monthIndex; i <= end.monthIndex; i++) {
        for (
          let j = i === start.monthIndex ? start.dayIndex + 1 : 0,
            len =
              i === end.monthIndex ? end.dayIndex : this.months[i].days.length;
          j < len;
          j++
        ) {
          const day = this.months[i].days[j]

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
  }
}
</script>
