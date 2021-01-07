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
      <fx-cell label="单元格" clickable></fx-cell>
      <fx-cell label="单元格" content="内容" clickable></fx-cell>
      <fx-cell
        label="单元格"
        content="内容"
        clickable
        arrow-direction="down"
      ></fx-cell>
      <fx-cell label="单元格" description="描述信息" clickable></fx-cell>
      <fx-cell
        label="单元格"
        content="内容"
        description="描述信息"
        clickable
      ></fx-cell>
    </fx-group>
    <fx-group title="其他">
      <fx-cell
        label="必填"
        content="内容"
        clickable
        arrow-direction="down"
        required
      ></fx-cell>
    </fx-group>
    <fx-group title="Slot default">
      <fx-cell label="右侧图标" content="内容">
        <fx-icon class-name="CloseOutlined"></fx-icon>
      </fx-cell>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'Cell',
  props: {},
  data() {
    return {}
  }
}
</script>


