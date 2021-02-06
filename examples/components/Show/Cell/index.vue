<template>
  <div>
    <fx-group title="基础用法">
      <fx-cell label="单元格" content="内容"></fx-cell>
      <fx-cell label="单元格" content="内容" description="描述信息"></fx-cell>
    </fx-group>
    <fx-group title="包含图标">
      <fx-cell label="单元格" content="内容" icon="EditOutlined"></fx-cell>
      <fx-cell
        label="单元格"
        content="内容"
        description="描述信息"
        icon="EditOutlined"
      ></fx-cell>
    </fx-group>
    <fx-group title="展示箭头">
      <fx-cell label="单元格" isLink></fx-cell>
      <fx-cell label="单元格" content="内容" isLink></fx-cell>
      <fx-cell
        label="单元格"
        content="内容"
        isLink
        arrow-direction="down"
      ></fx-cell>
      <fx-cell label="单元格" description="描述信息" isLink></fx-cell>
      <fx-cell
        label="单元格"
        content="内容"
        description="描述信息"
        isLink
      ></fx-cell>
    </fx-group>
    <fx-group title="其他">
      <fx-cell
        label="必填"
        content="内容"
        isLink
        arrow-direction="down"
        required
      ></fx-cell>
    </fx-group>
    <fx-group title="事件监听">
      <fx-cell
        label="单元格"
        content="内容"
        description="描述信息"
        isLink
        checkbox
        @click="onClick"
        @checkbox-change="onCheckboxChange"
      ></fx-cell>
    </fx-group>
    <fx-group title="Slot default">
      <fx-cell label="右侧图标" content="内容">
        <fx-icon icon="CloseOutlined"></fx-icon>
      </fx-cell>
      <fx-cell checkbox>
        <div class="cell-user-item">
          <fx-image
            class="cell-user-item-avatar"
            src="https://cdn.fox2.cn/vfox/swiper/center-2.jpg"
            mode="aspectFill"
          />
          <span class="cell-user-item-nickname">小明</span>
        </div>
      </fx-cell>
    </fx-group>
    <fx-group title="Slot icon">
      <fx-cell checkbox>
        <div class="cell-user-item">
          <fx-image
            class="cell-user-item-avatar"
            src="https://cdn.fox2.cn/vfox/swiper/center-2.jpg"
            mode="aspectFill"
          />
          <span class="cell-user-item-nickname">小明</span>
        </div>
        <template #icon>
          <fx-checkbox circle />
        </template>
      </fx-cell>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'Cell',
  props: {},
  data() {
    return { checked: false }
  },
  methods: {
    onClick() {
      this.$showToast('点击事件')
    },
    onCheckboxChange(e) {
      console.log(e)
      this.$showToast(e.checked ? '勾选' : '取消勾选')
    }
  }
}
</script>

<style lang="scss">
@import '@/style/var.scss';

.cell {
  &-user-item {
    padding: 4px 0;
    display: flex;
    align-items: center;
    color: $title-color;
    font-size: 17px;

    &-avatar {
      width: 48px;
      height: 48px;
      border-radius: 4px;
      margin-right: 12px;
    }
  }
}
</style>
