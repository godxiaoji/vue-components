<template>
  <div>
    <fx-group title="基础用法">
      <fx-cell label="当前" class="count-down-box">
        <fx-time-ago :time="time" />
      </fx-cell>
      <fx-cell label="2021-05-01" class="count-down-box">
        <fx-time-ago :time="time2" />
      </fx-cell>
    </fx-group>
    <fx-group title="间隔">
      <fx-cell label="interval=2" class="count-down-box">
        <fx-time-ago :time="time" :interval="2" />
      </fx-cell>
    </fx-group>
  </div>
</template>

<script>
import dayjs from '@/helpers/day'

export default {
  name: 'TimeAgo',
  props: {},
  data() {
    return {
      time: new Date(),
      time2: dayjs('2021-05-01', 'YYYY-MM-DD').toDate()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/style/var.scss';

.count-down {
  &-box {
    .fx-button {
      flex-grow: 0;
    }
  }

  &-time-item {
    display: inline-flex;
    width: 24px;
    align-items: center;
    justify-content: center;
    background: $primary-color;
    color: #fff;
    margin-left: 5px;
  }

  &-time-r {
    margin-right: 16px;
  }
}
</style>
