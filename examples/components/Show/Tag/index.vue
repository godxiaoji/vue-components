<template>
  <div>
    <fx-group title="基础用法">
      <fx-cell label="pattern=light" class="tag-compact-box">
        <fx-tag type="default">default</fx-tag>
        <fx-tag type="primary">primary</fx-tag>
        <fx-tag type="success">success</fx-tag>
        <fx-tag type="warning">warning</fx-tag>
        <fx-tag type="danger">danger</fx-tag>
      </fx-cell>
      <fx-cell label="pattern=dark" class="tag-compact-box">
        <fx-tag type="default" pattern="dark">default</fx-tag>
        <fx-tag type="primary" pattern="dark">primary</fx-tag>
        <fx-tag type="success" pattern="dark">success</fx-tag>
        <fx-tag type="warning" pattern="dark">warning</fx-tag>
        <fx-tag type="danger" pattern="dark">danger</fx-tag>
      </fx-cell>
      <fx-cell label="pattern=plain" class="tag-compact-box">
        <fx-tag type="default" pattern="plain">default</fx-tag>
        <fx-tag type="primary" pattern="plain">primary</fx-tag>
        <fx-tag type="success" pattern="plain">success</fx-tag>
        <fx-tag type="warning" pattern="plain">warning</fx-tag>
        <fx-tag type="danger" pattern="plain">danger</fx-tag>
      </fx-cell>
    </fx-group>
    <fx-group title="标签大小">
      <fx-cell label="size=small">
        <fx-tag type="primary" pattern="light" size="small">标签</fx-tag>
        <fx-tag type="primary" pattern="dark" size="small">标签</fx-tag>
        <fx-tag type="primary" pattern="plain" size="small">标签</fx-tag>
      </fx-cell>
      <fx-cell label="size=middle">
        <fx-tag type="primary" pattern="light" size="middle">标签</fx-tag>
        <fx-tag type="primary" pattern="dark" size="middle">标签</fx-tag>
        <fx-tag type="primary" pattern="plain" size="middle">标签</fx-tag>
      </fx-cell>
      <fx-cell label="size=large">
        <fx-tag type="primary" pattern="light" size="large">标签</fx-tag>
        <fx-tag type="primary" pattern="dark" size="large">标签</fx-tag>
        <fx-tag type="primary" pattern="plain" size="large">标签</fx-tag>
      </fx-cell>
    </fx-group>
    <fx-group title="其他">
      <fx-cell label="可关闭的">
        <fx-tag type="primary" pattern="dark" size="large" closable>
          标签
        </fx-tag>
      </fx-cell>
      <fx-cell label="自定义颜色">
        <fx-tag class="tag-custom-color-1" type="default" pattern="plain">
          标签
        </fx-tag>
        <fx-tag class="tag-custom-color-2" type="default" closable>标签</fx-tag>
      </fx-cell>
    </fx-group>
    <fx-group title="事件监听">
      <fx-cell label="click & close &long-press">
        <fx-tag
          type="default"
          closable
          initialLongPress
          @click="onClick"
          @close="onClose"
          @long-press="onLongPress"
        >
          标签
        </fx-tag>
      </fx-cell>
    </fx-group>
  </div>
</template>

<script>
import Toast from '@/Toast'

export default {
  name: 'Tag',
  methods: {
    onClick() {
      Toast.showToast('点击事件')
    },
    onClose() {
      Toast.showToast('关闭事件')
    },
    onLongPress() {
      Toast.showToast('长按事件')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/style/var.scss';

.tag {
  &-compact-box {
    .fx-tag + .fx-tag {
      margin-left: 2px;
    }
  }

  &-custom-color {
    &-1 {
      --tag-color: #{$title-color} !important;
      --tag-background-color: #fff !important;
      --tag-border-color: #{$title-color} !important;
    }

    &-2 {
      --tag-color: #fff !important;
      --tag-background-color: #{$title-color} !important;
      --tag-border-color: transparent !important;
      background-image: linear-gradient(
        90deg,
        $warning-color 0%,
        $danger-color 100%
      );
    }
  }
}
</style>
