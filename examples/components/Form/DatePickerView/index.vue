<template>
  <div>
    <fx-group title="initialMode=date">
      <fx-date-picker-view
        initialMode="date"
        v-model="dateValue"
        @change="onChange"
      />
    </fx-group>
    <fx-group title="initialMode=time">
      <fx-date-picker-view
        initialMode="time"
        v-model="timeValue"
        @change="onChange"
      />
    </fx-group>
    <fx-group title="initialMode=datetime">
      <fx-date-picker-view
        initialMode="datetime"
        v-model="dateTimeValue"
        @change="onChange"
      />
    </fx-group>
    <fx-group title="minDate/maxDate">
      <div class="date-picker-view-box">
        <div class="date-picker-view-header">-5year ~ 5year</div>
        <div class="date-picker-view-body">
          <fx-date-picker-view
            initialMode="date"
            :minDate="maxDate"
            :maxDate="minDate"
            v-model="minMaxValue"
            @change="onChange"
          />
        </div>
      </div>
    </fx-group>
    <fx-group title="filter">
      <div class="date-picker-view-box">
        <div class="date-picker-view-header">秒步进5</div>
        <div class="date-picker-view-body">
          <fx-date-picker-view
            initialMode="datetime"
            :filter="filter"
            v-model="filterValue"
            @change="onChange"
          />
        </div>
      </div>
    </fx-group>
    <fx-group title="formatTemplate=YYYY年MM月DD日">
      <div class="date-picker-view-box">
        <div class="date-picker-view-header">v-model: {{ formatValue }}</div>
        <div class="date-picker-view-body">
          <fx-date-picker-view
            initialMode="date"
            formatTemplate="YYYY年MM月DD日"
            v-model="formatValue"
            @change="onChange"
          />
        </div>
      </div>
    </fx-group>
    <fx-group title="事件监听">
      <div class="date-picker-view-box">
        <div class="date-picker-view-header">change</div>
        <div class="date-picker-view-body">
          <fx-date-picker-view
            initialMode="date"
            v-model="changeValue"
            @change="onChangeEvent"
          />
        </div>
      </div>
    </fx-group>
  </div>
</template>

<script>
import dayjs from '@/helpers/day'

export default {
  components: {},
  name: 'DatePickerView',
  props: {},
  data() {
    return {
      dateValue: '',
      timeValue: '',
      dateTimeValue: '',

      // 设定时间访问
      minDate: dayjs()
        .startOf('day')
        .subtract(4, 'year')
        .toDate(),
      maxDate: dayjs()
        .startOf('day')
        .add(5, 'year')
        .toDate(),
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

      // 事件
      changeValue: ''
    }
  },
  methods: {
    onChange(e) {
      console.log(e)
    },
    onChangeEvent(e) {
      console.log(e)

      this.$showToast(`change: ${e.formatted}`)
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
