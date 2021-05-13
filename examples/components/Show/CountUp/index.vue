<template>
  <div>
    <fx-group title="基础用法">
      <fx-cell label="默认">
        <fx-count-up :number="1000" />
      </fx-cell>
      <fx-cell label="千分位 thousands">
        <fx-count-up
          :initialNumber="initialNumber"
          :number="number"
          thousands
        />
      </fx-cell>
      <fx-cell label="小数位 decimalDigits=2">
        <fx-count-up
          :initialNumber="initialNumber"
          :number="number"
          :decimalDigits="2"
        />
      </fx-cell>
    </fx-group>
    <fx-group title="速度">
      <fx-cell label="speed=slow">
        <fx-count-up
          :initialNumber="initialNumber"
          :number="number"
          :decimalDigits="2"
          speed="slow"
        />
      </fx-cell>
      <fx-cell label="speed=normal">
        <fx-count-up
          :initialNumber="initialNumber"
          :number="number"
          :decimalDigits="2"
          speed="normal"
        />
      </fx-cell>
      <fx-cell label="speed=fast">
        <fx-count-up
          :initialNumber="initialNumber"
          :number="number"
          :decimalDigits="2"
          speed="fast"
        />
      </fx-cell>
      <fx-cell label="speed=10000（固定10秒动画）">
        <fx-count-up
          :initialNumber="initialNumber"
          :number="number"
          :decimalDigits="2"
          :speed="10000"
        />
      </fx-cell>
    </fx-group>
    <fx-group title="事件监听">
      <fx-cell label="animated">
        <fx-count-up :number="500" @animated="onAnimated" />
      </fx-cell>
      <fx-cell label="cancel" class="count-up-box">
        <div class="count-up-r">
          <fx-count-up
            :initialNumber="0"
            :number="number2"
            thousands
            ref="countUp"
            @animated="onAnimated2"
            @cancel="onCancel"
          />
        </div>
        <fx-button @click="cancel" size="small">{{
          isCancel ? '开始' : '取消'
        }}</fx-button>
      </fx-cell>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'CountUp',
  props: {},
  data() {
    return {
      initialNumber: 1000,
      number: 5000,
      number2: 1000,
      isCancel: false
    }
  },
  methods: {
    onAnimated(e) {
      console.log(e)
      this.$showToast('动画结束')
    },
    onAnimated2(e) {
      console.log(e)
    },
    onCancel(e) {
      console.log(e)
      this.number2 = e.number
    },
    cancel() {
      if (!this.isCancel) {
        this.$refs.countUp.cancel()
        this.$showToast('已取消')
      } else {
        this.number2 = this.number2 > 500 ? 0 : 1000
      }

      this.isCancel = !this.isCancel
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/style/var.scss';

.count-up {
  &-box {
    .fx-button {
      flex-grow: 0;
    }
  }

  &-r {
    margin-right: 16px;
  }
}
</style>
