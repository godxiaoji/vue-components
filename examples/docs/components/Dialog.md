# Dialog 模态对话框

## Props

| 属性          | 类型    | 默认值 | 必填 | 说明                     |
| ------------- | ------- | ------ | ---- | ------------------------ |
| visible.sync  | boolean | false  | 否   | 是否显示                 |
| title         | string  | '提示' | 否   | 提示的标题               |
| content       | string  |        | 否   | 提示的内容，优先于 slot  |
| mask-closable | boolean | false  | 否   | 点击蒙层是否触发关闭操作 |
| show-cancel   | boolean | true   | 否   | 是否显示取消按钮         |
| confirmText   | string  | '确定' | 否   | 确认按钮的文字           |
| cancelText    | string  | '取消' | 否   | 取消按钮的文字           |

## Events

| 事件                 | 描述               | 回调函数参数                     |
| -------------------- | ------------------ | -------------------------------- |
| cancel               | 取消按钮点击时触发 | { confirm: false, cancel: true } |
| confirm              | 确认按钮点击时触发 | { confirm: true, cancel: false } |
| visible-state-change | 展示隐藏时触发     | { state: string }                |

### visible-state-change 的 state 值

| 值     | 说明                 | 备注                                              |
| ------ | -------------------- | ------------------------------------------------- |
| show   | 展示时触发           |                                                   |
| shown  | 展示且动画结束后触发 |                                                   |
| hide   | 隐藏时触发           | 可能携带其他参数 cancel, maskClick, closeClick 等 |
| hidden | 隐藏且动画结束后触发 | 可能携带其他参数 cancel, maskClick, closeClick 等 |

## Slots

### 默认（#default）

```
<fx-dialog>
  提示内容
  ...
</fx-dialog>
```
