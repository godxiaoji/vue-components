<template>
  <div>
    <fx-group title="基础用法">
      <fx-empty description="暂无内容"></fx-empty>
    </fx-group>
    <fx-group title="其他类型">
      <fx-empty description="出错了" type="error"></fx-empty>
      <fx-empty description="网络错误" type="network"></fx-empty>
      <fx-empty description="搜索不到" type="search"></fx-empty>
    </fx-group>
    <fx-group title="Slot default">
      <fx-empty description="网络错误" type="network">
        <fx-button type="primary" size="small">
          刷新试试
        </fx-button>
      </fx-empty>
    </fx-group>
    <fx-group title="Slot image">
      <fx-empty description="网站被小猫咪吃了">
        <template #image
          ><fx-image
            class="empty-custom-image"
            src="https://cdn.fox2.cn/vfox/swiper/different-1.jpg"
          ></fx-image
        ></template>
      </fx-empty>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'Empty',
  props: {},
  data() {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/style/var.scss';

.empty-custom-image {
  width: 320px;
  height: 214px;
}

.fx-empty + .fx-empty {
  border-top: 12px solid $background-color;
}
</style>
