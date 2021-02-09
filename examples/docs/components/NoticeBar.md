# NoticeBar 通告栏

## Props

| 属性            | 类型    | 默认值    | 必填 | 说明                                                                                                                        |
| --------------- | ------- | --------- | ---- | --------------------------------------------------------------------------------------------------------------------------- |
| visible.sync    | boolean | false     | 是   | 是否显示                                                                                                                    |
| mode            | string  | 'default' | 否   | 通知栏模式，可选 'clickable'（展示右箭头图标，表示可点击），'closable'（展示关闭图标，点击可关闭，需要配合 `visible` 使用） |
| left-icon       | string  |           | 否   | 设置左侧图标，使用 [Icon](./Icon.md) 组件                                                                                   |
| right-icon      | string  |           | 否   | 设置右侧图标，使用 [Icon](./Icon.md) 组件，设置后会覆盖指定 `mode` 模式下的图标                                             |
| backgroundColor | string  |           | 否   | 指定背景颜色                                                                                                                |
| color           | string  |           | 否   | 指定前景颜色颜色（含字体，图标）                                                                                            |
| marquee         | boolean | false     | 否   | 是否启用跑马灯展示方式，开启后只展示 1 行，只要长度溢出就会滚动播放，关闭后长度溢出则会换行显示                             |

## Events

| 事件                 | 描述               | 回调函数参数      |
| -------------------- | ------------------ | ----------------- |
| close-click          | 关闭按钮点击时触发 | {}                |
| visible-state-change | 展示隐藏时触发     | { state: string } |

### visible-state-change 的 state 值

| 值     | 说明                 | 备注                                              |
| ------ | -------------------- | ------------------------------------------------- |
| show   | 展示时触发           |                                                   |
| shown  | 展示且动画结束后触发 |                                                   |
| hide   | 隐藏时触发           | 可能携带其他参数 cancel, maskClick, closeClick 等 |
| hidden | 隐藏且动画结束后触发 | 可能携带其他参数 cancel, maskClick, closeClick 等 |
