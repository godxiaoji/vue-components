<template>
  <div>
    <fx-group title="基础用法">
      <fx-qr-code text="hello world"></fx-qr-code>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'QrCode',
  props: {},
  data() {
    return {
      time: 300 * 1000,
      time2: 1.5 * 24 * 3600 * 1000,
      time3: 300 * 1000,
      time4: 100 * 1000,
      time5: 300 * 1000,
      paused: false
    }
  },
  methods: {
    onPause(e) {
      console.log(e)
      this.$showToast('已暂停')
    },
    onResume(e) {
      console.log(e)
      this.$showToast('继续计时')
    },
    onEnd(e) {
      console.log(e)
      this.$showToast('计时结束')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/style/var.scss';

.countdown {
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
}
</style>
