# ImagePreview 图片预览

## Props

| 属性               | 类型     | 默认值 | 必填 | 说明                                   |
| ------------------ | -------- | ------ | ---- | -------------------------------------- |
| visible.sync       | boolean  | false  | 否   | 是否显示                               |
| current.sync       | string   |        | 否   | 指定当前显示的图片 url                 |
| urls               | string[] |        | 否   | 图片 url 数组                          |
| show-close         | boolean  | false  | 否   | 是否显示关闭按钮，显示按钮后展示头部栏 |
| navigation-buttons | boolean  | false  | 否   | 是否展示上一页/下一页按钮              |

## Events

| 事件   | 描述                 | 回调函数参数             |
| ------ | -------------------- | ------------------------ |
| show   | 展示时触发           | {}                       |
| shown  | 展示且动画结束后触发 | {}                       |
| hide   | 隐藏时触发           | {}                       |
| hidden | 隐藏且动画结束后触发 | {}                       |
| change | 隐藏且动画结束后触发 | { activeIndex, current } |

### change 的回调参数

| 参数        | 类型   | 描述           |
| ----------- | ------ | -------------- |
| activeIndex | number | 当前图片的索引 |
| current     | string | 当前图片的 url |
