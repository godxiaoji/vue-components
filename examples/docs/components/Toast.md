# Toast 轻提示

## Props

| 属性            | 类型    | 默认值    | 必填 | 说明                                                                              |
| --------------- | ------- | --------- | ---- | --------------------------------------------------------------------------------- |
| v-model:visible | boolean | false     | 否   | 是否显示                                                                          |
| title           | string  |           | 是   | 提示的内容                                                                        |
| type            | string  | 'default' | 否   | 类型，'default'无图标, 可选 'success', 'loading', 'fail'                          |
| image           | string  |           | 否   | 图标，优先级高于 type 自带的图标                                                  |
| mask            | boolean | false     | 否   | 是否显示透明蒙层，防止触摸穿透                                                    |
| duration        | number  | 0         | 否   | visible=true 展示后，duration 毫秒后消失，0 为不消失，在 `v-model:visible` 下生效 |

### type 的合法值

| 值      | 说明                                               |
| ------- | -------------------------------------------------- |
| success | 显示成功图标，此时 title 文本最多显示 7 个汉字长度 |
| loading | 显示加载图标，此时 title 文本最多显示 7 个汉字长度 |
| default | 不显示图标，此时 title 文本最多可显示两行          |

## Events

| 事件 | 描述         | 回调函数参数 |
| ---- | ------------ | ------------ |
| hide | 被隐藏时触发 | {}           |
