# PopDialog 气泡对话框

## Props

| 属性            | 类型           | 默认值   | 必填 | 说明                                                                              |
| --------------- | -------------- | -------- | ---- | --------------------------------------------------------------------------------- |
| v-model:visible | boolean        | false    | 否   | 是否显示                                                                          |
| selector        | string/element |          | 是   | 从哪个元素展开，如果是 string，则为可以被 document.querySelector(selector) 获取到 |
| placement       | string         | 'bottom' | 否   | 展开位置，可选 'bottom', 'top', 'left', 'right'                                   |
| show-mask       | boolean        | true     | 否   | 是否展示蒙层，如果设置不展示，气泡则是跟随 `selector` 对应的元素                  |
| content         | string         |          | 是   | 文本内容                                                                          |
| show-cancel     | boolean        | true     | 否   | 是否显示取消按钮                                                                  |
| cancel-text     | string         | '取消'   | 否   | 取消按钮的文本                                                                    |
| confirm-text    | string         | '确定'   | 否   | 确定按钮的文本                                                                    |

## Events

| 事件    | 描述                 | 回调函数参数                     |
| ------- | -------------------- | -------------------------------- |
| cancel  | 取消按钮点击时触发   | { confirm: false, cancel: true } |
| confirm | 确认按钮点击时触发   | { confirm: true, cancel: false } |
| show    | 展示时触发           | {}                               |
| shown   | 展示且动画结束后触发 | {}                               |
| hide    | 隐藏时触发           | {}                               |
| hidden  | 隐藏且动画结束后触发 | {}                               |
