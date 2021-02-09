<template>
  <div>
    <fx-group title="基础用法">
      <fx-swipe-cell :buttons="buttons">
        <fx-cell label="单元格" content="向左划"></fx-cell>
      </fx-swipe-cell>
      <fx-swipe-cell :buttons="buttons">
        <fx-cell label="单元格" content="向左划"></fx-cell>
      </fx-swipe-cell>
    </fx-group>
    <fx-group title=" 事件监听">
      <fx-swipe-cell :buttons="buttons" @button-click="onButtonClick">
        <fx-cell label="单元格" content="向左划"></fx-cell>
      </fx-swipe-cell>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'SwipeCell',
  data() {
    return {
      buttons: [
        {
          text: '加入收藏',
          type: 'warning'
        },
        {
          text: '删除',
          type: 'danger'
        }
      ]
    }
  },
  methods: {
    onButtonClick(e) {
      console.log(e)
      this.$showToast(`点击了 ${e.item.text}`)
    }
  }
}
</script>
