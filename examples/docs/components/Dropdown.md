# Dropdown 下拉框

## Props

| 属性         | 类型           | 默认值 | 必填 | 说明                                                                              |
| ------------ | -------------- | ------ | ---- | --------------------------------------------------------------------------------- |
| visible.sync | boolean        | false  | 否   | 是否显示                                                                          |
| selector     | element/string |        | 是   | 从哪个元素展开，如果是 string，则为可以被 document.querySelector(selector) 获取到 |

## Events

| 事件   | 描述                 | 回调函数参数 |
| ------ | -------------------- | ------------ |
| show   | 展示时触发           | {}           |
| shown  | 展示且动画结束后触发 | {}           |
| hide   | 隐藏时触发           | {}           |
| hidden | 隐藏且动画结束后触发 | {}           |

## Slots

```
<fx-dropdown>
  展开的内容
</fx-dropdown>
```
