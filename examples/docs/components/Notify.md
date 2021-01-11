# Notify 消息提示

## Props

| 属性            | 类型    | 默认值    | 必填 | 说明                                                                           |
| --------------- | ------- | --------- | ---- | ------------------------------------------------------------------------------ |
| visible.sync    | boolean | false     | 是   | 是否显示                                                                       |
| closable        | boolean | false     | 是   | 是否显示关闭按钮                                                               |
| icon            | string  |           | 否   | 图标，使用 [Icon](./Icon.md) 组件                                              |
| type            | string  | 'default' | 否   | 提示类型，可选值：'primary', 'success', 'warning', 'danger'                    |
| duration        | number  | 0         | 否   | visible=true 展示后，duration 毫秒后消失，0 为不消失，在 `visible.sync` 下生效 |
| backgroundColor | string  |           | 否   | 指定背景颜色，会覆盖 type 的颜色                                               |
| color           | string  |           | 否   | 指定前景颜色颜色（含字体，图标），会覆盖 type 的颜色                           |

### type 的合法值

| 值      | 说明                                  |
| ------- | ------------------------------------- |
| primary | <font color="#1890ff">提示</font>     |
| success | <font color="#52c41a">成功</font>     |
| warning | <font color="#faad14">警告</font>     |
| danger  | <font color="#ff4d4f">强烈警告</font> |

## Events

| 事件        | 描述                 | 回调函数参数 |
| ----------- | -------------------- | ------------ |
| show        | 展示时触发           | {}           |
| shown       | 展示且动画结束后触发 | {}           |
| hide        | 隐藏时触发           | {}           |
| hidden      | 隐藏且动画结束后触发 | {}           |
| close-click | 关闭按钮点击时触发   | {}           |
