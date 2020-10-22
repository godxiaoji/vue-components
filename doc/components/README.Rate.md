# Rate

评分。

## Props

| 属性            | 类型    | 默认值 | 必填 | 说明                            |
| --------------- | ------- | ------ | ---- | ------------------------------- |
| value / v-model | number  |        | 否   |
| name            | string  |        | 否   | [form](./README.Form.md) 的标识 |
| size            | number  | 5      | 否   | 有 size 个星星，只支持整数      |
| pattern         | string  | ‘star  | 否   | 图标款式，可选 'star' / 'heart' |
| allow-half      | boolean | false  | 否   | 是否允许半选                    |
| disabled        | boolean | false  | 否   | 是否禁用                        |
| readonly        | boolean | false  | 否   | 是否为只读状态                  |

## CSS

| 属性        | 默认值 | 说明     |
| ----------- | ------ | -------- |
| --icon-size | 24px   | 图标大小 |

## Events

| 事件   | 描述             | 回调函数参数                                 |
| ------ | ---------------- | -------------------------------------------- |
| change | 改变时触发的事件 | CustomEvent，可通过 event.details.value 取值 |
