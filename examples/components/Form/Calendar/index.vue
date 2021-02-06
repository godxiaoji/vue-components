<template>
  <div>
    <fx-group title="Calendar">
      <fx-cell label="基础">
        <fx-calendar :placeholder="placeholder" />
      </fx-cell>
      <fx-cell label="v-model today">
        <fx-calendar v-model="value" popup-show-confirm />
      </fx-cell>
      <fx-cell label="minDate/maxDate 11-11">
        <fx-calendar
          :min-date="new Date('2020-11-11')"
          :max-date="new Date('2021-11-11')"
          placeholder="选择日期"
          popup-show-close
        />
      </fx-cell>
      <fx-cell label="initial-type=range">
        <fx-calendar
          initial-type="range"
          v-model="rangeValue"
          @change="onChange"
          popup-show-close
        />
      </fx-cell>
      <fx-cell label="initial-type=range && allow-same-day">
        <fx-calendar
          initial-type="range"
          allow-same-day
          @change="onChange"
          popup-show-close
        />
      </fx-cell>
      <fx-cell label="禁用">
        <fx-calendar v-model="value" disabled />
      </fx-cell>
    </fx-group>
    <fx-group title="CalendarView">
      <div class="calendar-view-box">
        <div class="calendar-view-header">选择：{{ viewDateString }}</div>
        <div class="calendar-view-body">
          <fx-calendar-view
            initial-type="single"
            v-model="viewDate"
            @select="onSelect"
          ></fx-calendar-view>
        </div>
      </div>
    </fx-group>
    <fx-group title="CalendarView initial-type=range">
      <div class="calendar-view-box">
        <div class="calendar-view-header">选择：{{ viewRangeDateString }}</div>
        <div class="calendar-view-body">
          <fx-calendar-view
            initial-type="range"
            :first-day-of-week="1"
            v-model="viewRangeDate"
            @select="onSelect"
          ></fx-calendar-view>
        </div>
      </div>
    </fx-group>
    <fx-group title="CalendarPopup">
      <fx-cell label="v-modal +1day" isLink @click="addOneDay">{{
        popupValueString
      }}</fx-cell>
      <fx-cell
        label="Event:confirm"
        isLink
        @click="
          ;(confirmEvent = true),
            (popupShowConfirm = false),
            (popupShowClose = false),
            (popupVisible = true)
        "
      ></fx-cell>
      <fx-cell
        label="showConfirm=true"
        isLink
        @click="
          ;(confirmEvent = true),
            (popupShowConfirm = true),
            (popupShowClose = false),
            (popupVisible = true)
        "
      ></fx-cell>
      <fx-cell
        label="initial-type=range && max-range=5"
        isLink
        @click="popupRangeVisible = true"
      ></fx-cell>
      <fx-cell
        label="Event:show/shown/hide/hidden"
        isLink
        @click="
          ;(otherEvent = true),
            (popupShowConfirm = true),
            (popupShowClose = true),
            (popupVisible = true)
        "
      ></fx-cell>
    </fx-group>
    <fx-group title="API">
      <fx-cell label="showCalendar" isLink @click="onCallApi()"></fx-cell>
    </fx-group>
    <fx-calendar-popup
      :visible.sync="popupVisible"
      :title="title"
      :show-confirm="popupShowConfirm"
      :show-close="popupShowClose"
      v-model="popupValue"
      @confirm="onConfirm"
      @show="onOtherEvent('show')"
      @shown="onOtherEvent('shown')"
      @hide="onOtherEvent('hide')"
      @hidden="onOtherEvent('hidden')"
    />
    <fx-calendar-popup
      :visible.sync="popupRangeVisible"
      :title="title"
      initial-type="range"
      :max-range="5"
      :show-confirm="true"
      v-model="popupRangeValue"
      @confirm="onRangeConfirm"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  components: {},
  name: 'Calendar',
  props: {},
  data() {
    return {
      viewDate: new Date(),
      viewRangeDate: [],

      popupValue: [new Date()],
      popupRangeValue: [],
      popupVisible: false,
      popupRangeVisible: false,
      popupShowConfirm: false,
      popupShowClose: false,

      title: '日期选择',

      value: new Date(),
      rangeValue: [],
      placeholder: ''
    }
  },
  created() {},
  computed: {
    popupValueString() {
      return dayjs(this.popupValue).format('YYYY-MM-DD')
    },
    viewDateString() {
      return dayjs(this.viewDate).format('YYYY-MM-DD')
    },
    viewRangeDateString() {
      return this.viewRangeDate
        .map(date => {
          return dayjs(date).format('YYYY-MM-DD')
        })
        .join(' ~ ')
    }
  },
  methods: {
    onChange(res) {
      console.log('change', res)
    },
    onSelect(res) {
      console.log('select', res)
    },
    addOneDay() {
      this.popupValue = [
        dayjs(this.popupValue[0])
          .add(1, 'day')
          .toDate()
      ]
    },
    onConfirm(res) {
      console.log('confirm', res)
      this.confirmEvent && this.$showToast(`触发了确定事件`)
    },
    onRangeConfirm(detail) {
      this.$showToast(`选择了 ${detail.label}`)
    },
    onOtherEvent(type) {
      // console.log(`${type} 事件触发`)

      if (this.otherEvent) {
        this.$showToast(`${type} 事件触发`)
      }

      if (type === 'hidden') {
        this.otherEvent = false
        this.confirmEvent = false
      }
    },
    onCallApi() {
      this.$showCalendar({
        type: 'range',
        showClose: true,
        success: res => {
          console.log(res)
          if (res.cancel) {
            this.$showToast('取消了')
          } else {
            this.$showToast(`选择了 ${res.detail.label}`)
          }
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/style/var.scss';

.calendar {
  &-view {
    &-header {
      line-height: 32px;
      padding: 0 16px;
      font-size: 14px;
      color: $primary-color;
      border-bottom: 1px solid $border-color;
    }
  }
}
</style>
