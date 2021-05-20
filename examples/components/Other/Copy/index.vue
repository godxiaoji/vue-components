<template>
  <div>
    <fx-group title="基本用法">
      <div class="copy-pad">
        <fx-copy class="copy-box" text="复制的文本">
          <fx-button type="primary">点击复制</fx-button>
        </fx-copy>
      </div>
    </fx-group>
    <fx-group title="事件监听">
      <div class="copy-pad">
        <fx-copy
          class="copy-box"
          text="复制的文本2"
          @success="onSuccess"
          @error="onError"
        >
          <fx-button type="primary">点击复制</fx-button>
        </fx-copy>
      </div>
    </fx-group>
  </div>
</template>

<script>
import Toast from '@/Toast'

export default {
  name: 'Copy',
  methods: {
    onSuccess({ text }) {
      Toast.showToast({
        title: `${text}`,
        type: 'success'
      })
    },
    onError(error) {
      Toast.showToast({
        title: error.message,
        type: 'fail'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.copy {
  &-box {
    display: flex !important;
    flex: 1;
  }

  &-pad {
    padding: 12px 16px;
  }
}
</style>
