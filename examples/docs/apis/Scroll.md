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

## scrollTo(object)

### Params

Object object

| 属性      | 类型           | 默认值 | 必填 | 说明                                                                            |
| --------- | -------------- | ------ | ---- | ------------------------------------------------------------------------------- |
| selector  | element/string |        | 是   | 要滑动的元素，如果是 string，则为可以被 document.querySelector(selector) 获取到 |
| scrollTop | number         |        | 否   | 滚动到页面的目标位置，单位 px                                                   |
| duration  | number         | 300    | 否   | 滚动动画的时长，单位 ms                                                         |
| success   | function       |        | 否   | 接口调用成功的回调函数                                                          |
| fail      | function       |        | 否   | 接口调用失败的回调函数                                                          |
| complete  | function       |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）                                |

### Usage

```
this.$elementScrollTo({
  selector: document.documentElement
  scrollTop: 0,
  duration: 300
})
```
