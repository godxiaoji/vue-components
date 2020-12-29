# Rate 评分

## Props

| 属性            | 类型    | 默认值 | 必填 | 说明                             |
| --------------- | ------- | ------ | ---- | -------------------------------- |
| value / v-model | number  |        | 否   |
| name            | string  |        | 否   | [Form](./Form.md) 的标识         |
| count           | number  | 5      | 否   | 有 count 个星星，只支持 > 0 整数 |
| pattern         | string  | ‘star  | 否   | 图标款式，可选 'star' / 'heart'  |
| allow-half      | boolean | false  | 否   | 是否允许半选                     |
| disabled        | boolean | false  | 否   | 是否禁用                         |
| readonly        | boolean | false  | 否   | 是否为只读状态                   |

## CSS

| 属性                | 默认值                               | 说明           |
| ------------------- | ------------------------------------ | -------------- |
| --rate-color        | <font color="#d9d9d9">#d9d9d9</font> | 星星未激活颜色 |
| --rate-active-color | <font color="#ff4d4f">#ff4d4f</font> | 星星激活颜色   |
| --rate-size         | 24px                                 | 星星大小       |

## Events

| 事件   | 描述                 | 回调函数参数                               |
| ------ | -------------------- | ------------------------------------------ |
| change | 点击星星时触发的事件 | { value }，value 默认情况下是 0-5 之间的值 |
