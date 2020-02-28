# Modal

模态对话框。

## Props

| 属性            | 类型    | 默认值 | 必填 | 说明                     |
| --------------- | ------- | ------ | ---- | ------------------------ |
| visibility.sync | boolean | false  | 否   | 是否显示                 |
| title           | string  |        | 否   | 提示的标题               |
| mask-closable   | boolean | false  | 否   | 点击蒙层是否触发关闭操作 |
| show-close      | boolean | true   | 否   | 是否显示关闭按钮         |
| show-cancel     | boolean | true   | 否   | 是否显示取消按钮         |
| confirmText     | string  | '确定' | 否   | 确认按钮的文字           |
| cancelText      | string  | '取消' | 否   | 取消按钮的文字           |

## CSS

| 属性                       | 默认值  | 说明           |
| -------------------------- | ------- | -------------- |
| --confirm-font-color       | #ffffff | 确定按钮文字色 |
| --confirm-background-color | #09bb07 | 确定按钮背景色 |
| --confirm-border-color     | #09bb07 | 确定按钮边框色 |
| --cancel-font-color        | #353535 | 取消按钮文字色 |
| --cancel-background-color  | #ffffff | 取消按钮背景色 |
| --cancel-border-color      | #b2b2b2 | 取消按钮边框色 |

## Window Method

通用方法不是调用 vue 组件。

### \$showModal(Object object)

显示模态对话框。

| 属性         | 类型     | 默认值 | 必填 | 说明                                                 |
| ------------ | -------- | ------ | ---- | ---------------------------------------------------- |
| title        | string   |        | 否   | 提示的标题                                           |
| content      | string   |        | 是   | 提示的内容                                           |
| maskClosable | boolean  | false  | 否   | 点击蒙层是否触发关闭操作                             |
| showCancel   | boolean  | true   | 否   | 是否显示取消按钮                                     |
| confirmText  | string   | '确定' | 否   | 确认按钮的文字                                       |
| cancelText   | string   | '取消' | 否   | 取消按钮的文字                                       |
| success      | function |        | 否   | 接口调用成功的回调函数                               |
| fail         | function |        | 否   | 接口调用失败的回调函数（不传入 fail 遇错误直接抛出） |
| complete     | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）     |

#### object.success 的回调函数

| 属性    | 类型    | 说明                               |
| ------- | ------- | ---------------------------------- |
| confirm | boolean | 为 true 时，表示用户点击了确定按钮 |
| cancel  | boolean | 为 true 时，表示用户点击了取消     |
