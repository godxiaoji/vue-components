<template>
  <div>
    <fx-group title="基础用法">
      <fx-notice-bar class="notice-bar-item" :title="text1"> </fx-notice-bar>
      <fx-notice-bar class="notice-bar-item" :title="text2"> </fx-notice-bar>
    </fx-group>
    <fx-group title="跑马灯">
      <fx-notice-bar class="notice-bar-item" marquee :title="text2">
      </fx-notice-bar>
    </fx-group>
    <fx-group title="左侧图标">
      <fx-notice-bar
        class="notice-bar-item"
        left-icon="SoundOutlined"
        :title="text1"
        marquee
      >
      </fx-notice-bar>
    </fx-group>
    <fx-group title="mode closable/clickable">
      <fx-notice-bar
        class="notice-bar-item"
        mode="closable"
        v-model:visible="visible"
        :title="text1"
        @close-click="onClose"
      >
      </fx-notice-bar>
      <fx-notice-bar
        class="notice-bar-item"
        mode="clickable"
        :title="text1"
        @click="onClick"
      >
      </fx-notice-bar>
    </fx-group>
    <fx-group title="自定义颜色">
      <fx-notice-bar
        class="notice-bar-item"
        left-icon="SoundOutlined"
        :title="text1"
        color="#1890FF"
        background-color="#E6F7FF"
      >
      </fx-notice-bar>
      <fx-notice-bar
        class="notice-bar-item"
        :title="text2"
        color="#52C41A"
        background-color="#F0FFE0"
      >
      </fx-notice-bar>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'NoticeBar',
  props: {},
  data() {
    return {
      visible: true,
      text1: '简单不先于复杂，而是在复杂之后。',
      text2:
        '作为一个真正的程序员，首先应该尊重编程，热爱你所写下的程序，他是你的伙伴，而不是工具。'
    }
  },
  methods: {
    onClose() {
      this.$showToast('点击了关闭按钮')
    },
    onClick() {
      this.$showToast('点击了通告栏')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.notice-bar-item {
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
