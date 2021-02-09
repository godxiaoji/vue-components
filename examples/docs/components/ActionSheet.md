# ActionSheet

动作面板。

## Props

| 属性          | 类型    | 默认值 | 必填 | 说明                       |
| ------------- | ------- | ------ | ---- | -------------------------- |
| visible.sync  | boolean | false  | 否   | 是否显示                   |
| title         | string  |        | 否   | 标题，不设置则不展示标题栏 |
| options       | array   |        | 否   | 选项列表                   |
| mask-closable | boolean | true   | 否   | 点击蒙层是否触发关闭操作   |
| show-cancel   | boolean | true   | 否   | 是否显示取消按钮           |
| cancel-text   | string  | '取消' | 否   | 取消按钮的文本             |

### options 的结构

| options[index] 值 | 类型   | 默认值 | 必填 | 说明         |
| ----------------- | ------ | ------ | ---- | ------------ |
| name              | string |        | 是   | 展示名称     |
| description       | string |        | 否   | 附加描述     |
| disabled          | string | false  | 否   | 是否禁用     |
| highlight         | string | false  | 否   | 是否高亮显示 |

```
[
  {
    name: '选项1',
    disabled: false,
    description: '选项描述',
    highlight: false
  }
]
```

## CSS

| 属性                           | 默认值                             | 说明     |
| ------------------------------ | ---------------------------------- | -------- |
| --action-sheet-highlight-color | <font color=#ff4d4f>#ff4d4f</font> | 高亮颜色 |

## Events

| 事件                 | 描述               | 回调函数参数                       |
| -------------------- | ------------------ | ---------------------------------- |
| select               | 确认按钮点击时触发 | detail: {item: any: index: number} |
| visible-state-change | 展示隐藏时触发     | { state: string }                  |

### visible-state-change 的 state 值

| 值     | 说明                 | 备注                                              |
| ------ | -------------------- | ------------------------------------------------- |
| show   | 展示时触发           |                                                   |
| shown  | 展示且动画结束后触发 |                                                   |
| hide   | 隐藏时触发           | 可能携带其他参数 cancel, maskClick, closeClick 等 |
| hidden | 隐藏且动画结束后触发 | 可能携带其他参数 cancel, maskClick, closeClick 等 |

### select 回调参数的 detail 结构

| 值    | 类型   | 说明                  |
| ----- | ------ | --------------------- |
| item  | any    | options[index] 的副本 |
| index | number | 索引                  |
