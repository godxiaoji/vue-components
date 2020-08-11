# ScrollView

可滚动视图区域。需要给 [scroll-view](./README.ScrollView.md) 一个固定高度，通过 CSS 设置 height。

## Props

| 属性                  | 类型          | 默认值 | 必填 | 说明                                                                                                  |
| --------------------- | ------------- | ------ | ---- | ----------------------------------------------------------------------------------------------------- |
| scroll-x              | boolean       | false  | 否   | 允许横向滚动                                                                                          |
| scroll-y              | boolean       | false  | 否   | 允许纵向滚动                                                                                          |
| upper-threshold       | number/string | 50     | 否   | 距顶部/左边多远时，触发 scrolltoupper 事件                                                            |
| lower-threshold       | number/string | 50     | 否   | 距底部/右边多远时，触发 scrolltolower 事件                                                            |
| scroll-top            | number/string |        | 否   | 设置竖向滚动条位置                                                                                    |
| scroll-left           | number/string |        | 否   | 设置横向滚动条位置                                                                                    |
| scroll-into-view      | string        |        | 否   | 值应为某子元素 id。设置哪个方向可滚动，则在哪个方向滚动到该元素                                       |
| scroll-with-animation | boolean       | false  | 否   | 在设置滚动条位置时使用动画过渡                                                                        |
| enable-flex           | boolean       | false  | 否   | 启用 flexbox 布局。开启后，当前节点声明了 `display: flex` 就会成为 flex container，并作用于其孩子节点 |

## Events

| 事件          | 描述                  | 回调函数参数                                                                |
| ------------- | --------------------- | --------------------------------------------------------------------------- |
| scrolltoupper | 滚动到顶部/左边时触发 | CustomEvent，e.detail.direction = 'top' / 'left'                            |
| scrolltolower | 滚动到底部/右边时触发 | CustomEvent，e.detail.direction = 'bottom' / 'right'                        |
| scroll        | 滚动时触发            | CustomEvent，e.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth } |
