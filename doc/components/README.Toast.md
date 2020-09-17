# Toast

消息提示框。

## Props

| 属性                       | 类型    | 默认值 | 必填 | 说明                                                                        |
| -------------------------- | ------- | ------ | ---- | --------------------------------------------------------------------------- |
| visibility/visibility.sync | boolean | false  | 否   | 是否显示                                                                    |
| title                      | string  |        | 是   | 提示的内容                                                                  |
| icon                       | string  | 'none' | 否   | 图标，可选 'success' / 'loading'                                            |
| image                      | string  |        | 否   | 自定义图标的本地路径，image 的优先级高于 icon                               |
| mask                       | boolean | false  | 否   | 是否显示透明蒙层，防止触摸穿透                                              |
| duration                   | number  | 0      | 否   | 展示时长(单位 ms)，值为 0 时，`toast` 不会消失，在 `visibility.sync` 下生效 |

### icon 的合法值

| 值      | 说明                                               |
| ------- | -------------------------------------------------- |
| success | 显示成功图标，此时 title 文本最多显示 7 个汉字长度 |
| loading | 显示加载图标，此时 title 文本最多显示 7 个汉字长度 |
| none    | 不显示图标，此时 title 文本最多可显示两行          |

## Events

| 事件  | 描述         | 回调函数参数                                                                           |
| ----- | ------------ | -------------------------------------------------------------------------------------- |
| close | 被关闭时触发 | CustomEvent，其中 event.details,source = 'activeClose' 主动关闭 / 'autoClose' 自动关闭 |

## Slots

PS：请用 prop 的 title 替代
