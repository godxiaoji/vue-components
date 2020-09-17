# Notify

## <a name="showNotify">Vue.prototype.\$showNotify(object)</a>

显示消息提示。

### 参数

| 属性            | 类型     | 默认值    | 必填 | 说明                                                           |
| --------------- | -------- | --------- | ---- | -------------------------------------------------------------- |
| title           | string   |           | 是   | 提示内容                                                       |
| type            | string   | 'default' | 否   | 提示类型，可选值：'primary' / 'success' / 'warning' / 'danger' |
| duration        | number   | 0         | 否   | 展示时长(单位 ms)，值为 0 时，`notify` 不会消失                |
| backgroundColor | string   |           | 否   | 指定背景颜色，会覆盖 type 的颜色                               |
| color           | string   |           | 否   | 指定字体颜色                                                   |
| success         | function |           | 否   | 接口调用成功的回调函数                                         |
| fail            | function |           | 否   | 接口调用失败的回调函数（不传入 fail 遇错误直接抛出）           |
| complete        | function |           | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）               |

#### object.type 的合法值

| 值      | 说明                                |
| ------- | ----------------------------------- |
| primary | <font color=#10aeff>提示</font>     |
| success | <font color=#09bb07>成功</font>     |
| warning | <font color=#ffbe00>警告</font>     |
| danger  | <font color=#f76260>强烈警告</font> |

### 用法

```
this.$showNotify({
  title: '提示内容',
  duration: 2000
})
```

## <a name="hideNotify">Vue.prototype.\$hideNotify([object])</a>

隐藏消息提示框。

### 参数

Object object

| 属性     | 类型     | 默认值 | 必填 | 说明                                             |
| -------- | -------- | ------ | ---- | ------------------------------------------------ |
| success  | function |        | 否   | 接口调用成功的回调函数                           |
| fail     | function |        | 否   | 接口调用失败的回调函数                           |
| complete | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |
