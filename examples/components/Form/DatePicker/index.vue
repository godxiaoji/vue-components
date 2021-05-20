<template>
  <div>
    <fx-group title="DatePicker initialMode">
      <fx-form-item name="date-picker" label="日期 date">
        <fx-date-picker
          initialMode="date"
          v-model="dateValue"
          @change="onChange"
        />
      </fx-form-item>
      <fx-form-item name="date-picker" label="时间 time">
        <fx-date-picker
          initialMode="time"
          v-model="timeValue"
          @change="onChange"
        />
      </fx-form-item>
      <fx-form-item name="date-picker" label="日期时间 datetime">
        <fx-date-picker
          initialMode="datetime"
          v-model="dateTimeValue"
          @change="onChange"
        />
      </fx-form-item>
      <fx-form-item name="date-picker" label="分秒 minute-second">
        <fx-date-picker initialMode="minute-second" @change="onChange" />
      </fx-form-item>
      <fx-form-item name="date-picker" label="时分 hour-minute">
        <fx-date-picker initialMode="hour-minute" @change="onChange" />
      </fx-form-item>
      <fx-form-item name="date-picker" label="天时 day-hour">
        <fx-date-picker initialMode="day-hour" @change="onChange" />
      </fx-form-item>
      <fx-form-item name="date-picker" label="月日 month-day">
        <fx-date-picker initialMode="month-day" @change="onChange" />
      </fx-form-item>
      <fx-form-item name="date-picker" label="月日时 month-day-hour">
        <fx-date-picker initialMode="month-day-hour" @change="onChange" />
      </fx-form-item>
      <fx-form-item name="date-picker" label="月日时分 month-day-hour-minute">
        <fx-date-picker
          initialMode="month-day-hour-minute"
          @change="onChange"
        />
      </fx-form-item>
      <fx-form-item name="date-picker" label="年月 year-month">
        <fx-date-picker initialMode="year-month" @change="onChange" />
      </fx-form-item>
      <fx-form-item name="date-picker" label="年月日时 year-month-day-hour">
        <fx-date-picker initialMode="year-month-day-hour" @change="onChange" />
      </fx-form-item>
      <fx-form-item
        name="date-picker"
        label="年月日时分 year-month-day-hour-minute"
      >
        <fx-date-picker
          initialMode="year-month-day-hour-minute"
          @change="onChange"
        />
      </fx-form-item>
    </fx-group>
    <fx-group title="DatePicker minDate & maxDate">
      <fx-form-item name="date-picker" label="-5year ~ 5year">
        <fx-date-picker
          initialMode="date"
          :minDate="maxDate"
          :maxDate="minDate"
          v-model="minMaxValue"
          @change="onChange"
        />
      </fx-form-item>
    </fx-group>
    <fx-group title="DatePicker filter">
      <fx-form-item name="date-picker" label="秒步进5">
        <fx-date-picker
          initialMode="datetime"
          :filter="filter"
          v-model="filterValue"
          @change="onChange"
        />
      </fx-form-item>
    </fx-group>
    <fx-group title="DatePicker formatTemplate">
      <fx-form-item name="date-picker" label="YYYY年MM月DD日">
        <fx-date-picker
          initialMode="date"
          formatTemplate="YYYY年MM月DD日"
          v-model="formatValue"
          @change="onChange"
        />
      </fx-form-item>
    </fx-group>
    <fx-group title="DatePicker disabled">
      <fx-form-item name="date-picker" label="禁用">
        <fx-date-picker
          initialMode="date"
          disabled
          :modelValue="disableValue"
          @change="onChange"
        />
      </fx-form-item>
    </fx-group>
    <fx-group title="事件监听">
      <fx-form-item name="date-picker" label="change">
        <fx-date-picker
          initialMode="date"
          v-model="changeValue"
          @change="onChangeEvent"
        />
      </fx-form-item>
    </fx-group>

    <fx-group title="DatePickerPopup">
      <fx-cell
        label="基础"
        isLink
        @click="visible = true"
        :content="popupValue"
      ></fx-cell>
    </fx-group>
    <fx-group title="DatePickerPopup Event">
      <fx-cell
        label="change"
        isLink
        @click=";(changeEvent = true), (visible = true)"
      ></fx-cell>
      <fx-cell
        label="confirm/cancel"
        isLink
        @click=";(clickEvent = true), (visible = true)"
      ></fx-cell>
      <fx-cell
        label="visible-state-change"
        isLink
        @click=";(visibleEvent = true), (visible = true)"
      ></fx-cell>
    </fx-group>
    <fx-group title="API">
      <fx-cell label="showDatePicker" isLink @click="onCallApi"></fx-cell>
    </fx-group>

    <fx-date-picker-popup
      initialMode="date"
      formatTemplate="YYYY年MM月DD日"
      v-model:visible="visible"
      :title="title"
      v-model="popupValue"
      @change="onChange"
      @confirm="onConfirm"
      @cancel="onCancel"
      @visibleStateChange="onVisibleStateChange"
    />
  </div>
</template>

<script>
import dayjs from '@/helpers/day'
import Toast from '@/Toast'
import DatePicker from '@/DatePicker'

export default {
  name: 'DatePicker',
  data() {
    return {
      title: 'DatePicker',

      dateValue: '',
      timeValue: '',
      dateTimeValue: '',

      // 设定时间访问
      minDate: dayjs().startOf('day').subtract(4, 'year').toDate(),
      maxDate: dayjs().startOf('day').add(5, 'year').toDate(),
      minMaxValue: '',

      // 格式化
      formatValue: '',

      // 过滤
      filterValue: '',
      filter: (number, type) => {
        if (type === 'second' && number % 5 !== 0) {
          return false
        }

        return true
      },

      // disabled
      disableValue: new Date(),

      // 事件
      changeValue: '',

      // popup

      visible: false,
      popupValue: '',

      clickEvent: false,
      visibleEvent: false,
      changeEvent: false
    }
  },
  methods: {
    onChange(e) {
      console.log(e)

      if (this.changeEvent) {
        Toast.showToast(`值改为: ${e.formatted}`)
      }
    },
    onChangeEvent(e) {
      console.log(e)
    },
    onConfirm(res) {
      console.log('confirm', res)
      this.clickEvent && Toast.showToast(`点击确定按钮`)
    },
    onCancel(res) {
      console.log('cancel', res)
      if (this.clickEvent) {
        if (res.cancelClick) {
          Toast.showToast('点击了取消按钮')
        } else if (res.maskClick) {
          Toast.showToast('点击了蒙层')
        }
      }
    },
    onVisibleStateChange({ state }) {
      if (this.visibleEvent) {
        Toast.showToast(`${state} 事件触发`)
      }

      if (state === 'hidden') {
        this.clickEvent = false
        this.visibleEvent = false
        this.changeEvent = false
      }
    },
    onCallApi() {
      DatePicker.showDatePicker({
        title: 'DatePicker',
        success: res => {
          console.log(res)
          if (res.cancel) {
            Toast.showToast('取消了')
          } else {
            Toast.showToast(`选择了 ${res.detail.formatted}`)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/style/var.scss';

.date-picker-view {
  &-header {
    text-align: center;
    font-size: 17px;
    line-height: 24px;
    color: $title-color;
    padding: 12px 16px;
  }
}
</style>
