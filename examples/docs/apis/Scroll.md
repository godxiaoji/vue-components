# Scroll

## pageScrollTo(object)

将页面滚动到目标位置。

### Params

Object object

| 属性      | 类型     | 默认值 | 必填 | 说明                                             |
| --------- | -------- | ------ | ---- | ------------------------------------------------ |
| scrollTop | number   |        | 否   | 滚动到页面的目标位置，单位 px                    |
| duration  | number   | 300    | 否   | 滚动动画的时长，单位 ms                          |
| success   | function |        | 否   | 接口调用成功的回调函数                           |
| fail      | function |        | 否   | 接口调用失败的回调函数                           |
| complete  | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

### Usage

```
this.$pageScrollTo({
  scrollTop: 0,
  duration: 300
})
```

## elementScrollTo(object)

### Params

Object object

| 属性      | 类型     | 默认值 | 必填 | 说明                                             |
| --------- | -------- | ------ | ---- | ------------------------------------------------ |
| element   | Element  |        | 是   | DOM                                              |
| scrollTop | number   |        | 否   | 滚动到页面的目标位置，单位 px                    |
| duration  | number   | 300    | 否   | 滚动动画的时长，单位 ms                          |
| success   | function |        | 否   | 接口调用成功的回调函数                           |
| fail      | function |        | 否   | 接口调用失败的回调函数                           |
| complete  | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

### Usage

```
this.$elementScrollTo({
  element: document.documentElement
  scrollTop: 0,
  duration: 300
})
```
