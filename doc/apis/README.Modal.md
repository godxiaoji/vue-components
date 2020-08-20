# Modal

## <a name="showModal">Vue.prototype.\$showModal(object)</a>

显示模态对话框。

### 参数

Object object

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

### object.success 回调函数

| 属性    | 类型    | 说明                               |
| ------- | ------- | ---------------------------------- |
| confirm | boolean | 为 true 时，表示用户点击了确定按钮 |
| cancel  | boolean | 为 true 时，表示用户点击了取消     |

### 用法

```
this.$showModal({
  title: '提示',
  content: '这是一个模态弹窗',
  success (res) {
    if (res.confirm) {
      console.log('用户点击确定')
    } else if (res.cancel) {
      console.log('用户点击取消')
    }
  }
})
```
