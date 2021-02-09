# ImagePreview 图片预览

## Props

| 属性                 | 类型     | 默认值 | 必填 | 说明                                   |
| -------------------- | -------- | ------ | ---- | -------------------------------------- |
| v-model:visible      | boolean  | false  | 否   | 是否显示                               |
| v-model:current      | string   |        | 否   | 指定当前显示的图片 url                 |
| urls                 | string[] |        | 否   | 图片 url 数组                          |
| show-close           | boolean  | false  | 否   | 是否显示关闭按钮，显示按钮后展示头部栏 |
| navigation-buttons   | boolean  | false  | 否   | 是否展示上一页/下一页按钮              |
| image-high-rendering | boolean  | true   | 否   | 高清渲染，开启后图片按物理分辨率展示   |

## Events

| 事件                 | 描述                 | 回调函数参数             |
| -------------------- | -------------------- | ------------------------ |
| change               | 隐藏且动画结束后触发 | { activeIndex, current } |
| visible-state-change | 展示隐藏时触发       | { state: string }        |

### visible-state-change 的 state 值

| 值     | 说明                 | 备注                                              |
| ------ | -------------------- | ------------------------------------------------- |
| show   | 展示时触发           |                                                   |
| shown  | 展示且动画结束后触发 |                                                   |
| hide   | 隐藏时触发           | 可能携带其他参数 cancel, maskClick, closeClick 等 |
| hidden | 隐藏且动画结束后触发 | 可能携带其他参数 cancel, maskClick, closeClick 等 |

### change 的回调参数

| 参数        | 类型   | 描述           |
| ----------- | ------ | -------------- |
| activeIndex | number | 当前图片的索引 |
| current     | string | 当前图片的 url |
