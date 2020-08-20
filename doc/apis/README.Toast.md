# Toast

## <a name="showToast">Vue.prototype.\$showToast(object)</a>

显示消息提示框。

### 参数

Object object

| 属性     | 类型     | 默认值 | 必填 | 说明                                                 |
| -------- | -------- | ------ | ---- | ---------------------------------------------------- |
| title    | string   |        | 是   | 提示的内容                                           |
| icon     | string   | 'none' | 否   | 图标，可选 success / loading                         |
| image    | string   |        | 否   | 自定义图标的本地路径，image 的优先级高于 icon        |
| duration | number   | 1500   | 否   | 提示的延迟关闭时间                                   |
| mask     | boolean  | false  | 否   | 是否显示透明蒙层，防止触摸穿透                       |
| success  | function |        | 否   | 接口调用成功的回调函数                               |
| fail     | function |        | 否   | 接口调用失败的回调函数（不传入 fail 遇错误直接抛出） |
| complete | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）     |

#### object.icon 的合法值

| 值      | 说明                                               |
| ------- | -------------------------------------------------- |
| success | 显示成功图标，此时 title 文本最多显示 7 个汉字长度 |
| loading | 显示加载图标，此时 title 文本最多显示 7 个汉字长度 |
| none    | 不显示图标，此时 title 文本最多可显示两行          |

### 用法

```
this.$showToast({
  title: '成功',
  icon: 'success',
  duration: 2000
})
```

## <a name="hideToast">Vue.prototype.\$hideToast(object)</a>

隐藏消息提示框。

### 参数

Object object

| 属性     | 类型     | 默认值 | 必填 | 说明                                             |
| -------- | -------- | ------ | ---- | ------------------------------------------------ |
| success  | function |        | 否   | 接口调用成功的回调函数                           |
| fail     | function |        | 否   | 接口调用失败的回调函数                           |
| complete | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

## <a name="showLoading">Vue.prototype.\$showLoading(object)</a>

显示 loading 提示框。需主动调用 \$hideLoading 才能关闭提示框。

### 参数

Object object

| 属性     | 类型     | 默认值 | 必填 | 说明                                             |
| -------- | -------- | ------ | ---- | ------------------------------------------------ |
| title    | string   |        | 是   | 提示的内容                                       |
| mask     | boolean  | false  | 否   | 是否显示透明蒙层，防止触摸穿透                   |
| success  | function |        | 否   | 接口调用成功的回调函数                           |
| fail     | function |        | 否   | 接口调用失败的回调函数                           |
| complete | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

### 用法

```
this.$showLoading({
  title: '加载中',
})

setTimeout(() => {
  this.$hideLoading()
}, 2000)
```

## <a name="hideLoading">Vue.prototype.\$hideLoading(object)</a>

隐藏 loading 提示框。

### 参数

Object object

| 属性     | 类型     | 默认值 | 必填 | 说明                                             |
| -------- | -------- | ------ | ---- | ------------------------------------------------ |
| success  | function |        | 否   | 接口调用成功的回调函数                           |
| fail     | function |        | 否   | 接口调用失败的回调函数                           |
| complete | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |
