# Progress 进度条

## Props

| 属性       | 类型          | 默认值 | 必填 | 说明                                                                                                 |
| ---------- | ------------- | ------ | ---- | ---------------------------------------------------------------------------------------------------- |
| percentage | number/string |        | 是   | 百分比，例如：50                                                                                     |
| show-text  | boolean       | false  | 否   | 是否展示文字                                                                                         |
| fixed-bar  | boolean       | false  | 否   | 是否固定进度条宽度，配合 `show-text=true` 使用，防止由于文字 5% 和 100% 宽度不一样导致进度条长短不一 |

## Slots

### 内容区（#default）

```
<fx-progress :percentage="5">
  <template #default="{ progress }"> 已抢{{ progress }} </template>
</fx-progress>
```

注：添加 slot 后 `show-text` prop 属性失效。
