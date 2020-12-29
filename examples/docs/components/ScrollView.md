# ScrollView 滚动区

需要给 `ScrollView` 一个固定高度，通过 CSS 设置 height。

## Props

| 属性                   | 类型            | 默认值 | 必填 | 说明                                                                                                  |
| ---------------------- | --------------- | ------ | ---- | ----------------------------------------------------------------------------------------------------- |
| scroll-x               | boolean         | false  | 否   | 允许横向滚动                                                                                          |
| scroll-y               | boolean         | false  | 否   | 允许纵向滚动                                                                                          |
| upper-threshold        | number/string   | 50     | 否   | 距顶部/左边多远时，触发 `scroll-to-upper` 事件                                                        |
| lower-threshold        | number/string   | 50     | 否   | 距底部/右边多远时，触发 `scroll-to-lower` 事件                                                        |
| scroll-top             | number/string   |        | 否   | 设置竖向滚动条位置                                                                                    |
| scroll-left            | number/string   |        | 否   | 设置横向滚动条位置                                                                                    |
| scroll-into-view       | string          |        | 否   | 值应为某子元素 id。设置哪个方向可滚动，则在哪个方向滚动到该元素                                       |
| scroll-animated        | boolean         | false  | 否   | 在设置滚动条位置时使用动画过渡                                                                        |
| enable-pull-directions | string/string[] | []     | 否   | 开启下拉刷新，可以同时开启多个方向，可选值：'up', 'down', 'left', 'right'，搭配 `refreshing` 事件使用 |
| pull-refresh-threshold | number          | 48     | 否   | 设置下拉刷新阈值，自定义 indicator slot 时可以配合修改                                                |

## Events

| 事件            | 描述                  | 回调函数参数                                                                                           |
| --------------- | --------------------- | ------------------------------------------------------------------------------------------------------ |
| scroll-to-upper | 滚动到顶部/左边时触发 | { direction: string } 其中 direction = 'top' / 'left'                                                  |
| scroll-to-lower | 滚动到底部/右边时触发 | { direction: string } 其中 direction = 'bottom' / 'right'                                              |
| scroll          | 滚动时触发            | { scrollLeft: number, scrollTop: number, scrollHeight: number, scrollWidth: number }                   |
| refreshing      | 下拉刷新时触发        | ({ pullDirection: string }, done: Function) 其中 pullDirection 指下拉的方向，done 指刷新完毕回调的函数 |

## Slots

### 默认（#default）

```
<fx-scroll-view>
  ...
</fx-scroll-view>
```

### 下拉指示器（#indicator）

```
<fx-scroll-view>
  <template #indicator="slotProps">
    方向：{{ slotProps.pullDirection }} 状态：{{
      slotProps.pullRefreshState
    }}
  </template>
</fx-scroll-view>
```
