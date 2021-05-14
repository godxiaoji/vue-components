# CircleProgress 环形进度条

## Props

| 属性         | 类型          | 默认值 | 必填 | 说明                |
| ------------ | ------------- | ------ | ---- | ------------------- |
| percentage   | number/string |        | 是   | 百分比，例如：50    |
| size         | number        | 100    | 否   | 宽高，单位 px       |
| stroke-width | boolean       | 5.37   | 否   | 进度条宽度，单位 px |
| color        | string        |        | 否   | 进度条激活色        |

## Slots

### 内容区（#default）

```
<fx-circle-progress :percentage="5">
  <template #default="{ progress }"> 已抢{{ progress }} </template>
</fx-circle-progress>
```
