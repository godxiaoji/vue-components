# Cell

单元格。

单元格为列表中的单个展示项。

## Props

| 属性           | 类型    | 默认值  | 必填 | 说明                                                                   |
| -------------- | ------- | ------- | ---- | ---------------------------------------------------------------------- |
| label          | string  |         | 是   | 左侧文字                                                               |
| description    | string  |         | 否   | 左侧附加描述文字                                                       |
| content        | string  |         | 否   | 右侧文字                                                               |
| clickable      | boolean | false   | 否   | 是否可点击，true 有点击态和箭头                                        |
| required       | boolean | false   | 否   | true 在左侧文字边上会展示一个 红色`*`箭头                              |
| arrowDirection | string  | 'right' | 否   | clickable=true 时展示的箭头方向，可选值：'right', 'up', 'down', 'left' |

## Slots

### 内容区（default）

```
<fx-cell label="右侧图标">
  <fx-icon class-name="CloseOutlined"></fx-icon>
</fx-cell>
```

注：添加 slot 后 `content` 属性失效。