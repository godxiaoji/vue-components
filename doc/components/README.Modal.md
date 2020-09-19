# Modal

模态对话框。

## Props

| 属性          | 类型    | 默认值 | 必填 | 说明                     |
| ------------- | ------- | ------ | ---- | ------------------------ |
| visible.sync  | boolean | false  | 否   | 是否显示                 |
| title         | string  |        | 否   | 提示的标题               |
| mask-closable | boolean | false  | 否   | 点击蒙层是否触发关闭操作 |
| show-close    | boolean | true   | 否   | 是否显示关闭按钮         |
| show-cancel   | boolean | true   | 否   | 是否显示取消按钮         |
| confirmText   | string  | '确定' | 否   | 确认按钮的文字           |
| cancelText    | string  | '取消' | 否   | 取消按钮的文字           |

## Events

| 事件    | 描述               | 回调函数参数                               |
| ------- | ------------------ | ------------------------------------------ |
| close   | 被关闭时触发       | CustomEvent                                |
| cancel  | 取消按钮点击时触发 | CustomEvent，该事件同时会触发 `close` 事件 |
| confirm | 确认按钮点击时触发 | CustomEvent，该事件同时会触发 `close` 事件 |

## Slots

```
<fx-modal>
  提示内容
  ...
</fx-modal>
```
