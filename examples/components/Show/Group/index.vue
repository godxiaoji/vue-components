<template>
  <div>
    <fx-group title="基础风格">
      <fx-cell
        label="单元格"
        content="内容"
        description="网站大概部分组件都由这个组件进行分组"
      ></fx-cell>
      <fx-cell label="单元格" content="内容"></fx-cell>
      <fx-cell label="单元格" content="内容"></fx-cell>
      <fx-cell label="单元格" content="内容"></fx-cell>
    </fx-group>
    <fx-group title="卡片式风格" card>
      <fx-cell label="单元格" content="内容"></fx-cell>
      <fx-cell label="单元格" content="内容"></fx-cell>
      <fx-cell label="单元格" content="内容"></fx-cell>
      <fx-cell label="单元格" content="内容"></fx-cell>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'Group',
  props: {},
  data() {
    return {}
  }
}
</script>


