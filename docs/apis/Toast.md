# Toast 消息类型弹窗

注：目前仅支持单例模式。

## Toast.showToast(object)

显示消息提示框。

### Params

Object object

| 属性     | 类型     | 默认值    | 必填 | 说明                                                 |
| -------- | -------- | --------- | ---- | ---------------------------------------------------- |
| title    | string   |           | 是   | 提示的内容                                           |
| type     | string   | 'default' | 否   | 类型，可选 'success', 'loading', 'fail'              |
| icon     | string   |           | 否   | 图标，使用 [Icon](../components/Icon.md) 组件，优先级高于 `type` |
| duration | number   | 1500      | 否   | 提示的延迟关闭时间                                   |
| mask     | boolean  | false     | 否   | 是否显示透明蒙层，防止触摸穿透                       |
| success  | function |           | 否   | 接口调用成功的回调函数                               |
| fail     | function |           | 否   | 接口调用失败的回调函数（不传入 fail 遇错误直接抛出） |
| complete | function |           | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）     |

#### object.type 的合法值

| 值      | 说明                                               |
| ------- | -------------------------------------------------- |
| default | 不显示图标，此时 title 文本最多可显示两行          |
| success | 显示成功图标，此时 title 文本最多显示 7 个汉字长度 |
| loading | 显示加载图标，此时 title 文本最多显示 7 个汉字长度 |
| fail    | 显示错误图标，此时 title 文本最多显示 7 个汉字长度 |

### Usage

```
import { Toast } from 'vfox'

Toast.showToast({
  title: '成功',
  type: 'success',
  duration: 2000
})
```

## Toast.hideToast([object])

隐藏消息提示框。

### Params

Object object

| 属性     | 类型     | 默认值 | 必填 | 说明                                             |
| -------- | -------- | ------ | ---- | ------------------------------------------------ |
| success  | function |        | 否   | 接口调用成功的回调函数                           |
| fail     | function |        | 否   | 接口调用失败的回调函数                           |
| complete | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

### Usage

```
import { Toast } from 'vfox'

Toast.hideToast()
```

## Toast.showLoading(object)

显示 loading 提示框。需主动调用 [hideLoading](./Toast.md#toast-hideloading-object) 才能关闭提示框。

### Params

Object object

| 属性     | 类型     | 默认值 | 必填 | 说明                                             |
| -------- | -------- | ------ | ---- | ------------------------------------------------ |
| title    | string   |        | 是   | 提示的内容                                       |
| mask     | boolean  | false  | 否   | 是否显示透明蒙层，防止触摸穿透                   |
| success  | function |        | 否   | 接口调用成功的回调函数                           |
| fail     | function |        | 否   | 接口调用失败的回调函数                           |
| complete | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

### Usage

```
import { Toast } from 'vfox'

Toast.showLoading({
  title: '加载中',
})
```

## Toast.hideLoading([object])

隐藏 loading 提示框。

### Params

Object object

| 属性     | 类型     | 默认值 | 必填 | 说明                                             |
| -------- | -------- | ------ | ---- | ------------------------------------------------ |
| success  | function |        | 否   | 接口调用成功的回调函数                           |
| fail     | function |        | 否   | 接口调用失败的回调函数                           |
| complete | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

### Usage

```
import { Toast } from 'vfox'

Toast.hideLoading()
```
