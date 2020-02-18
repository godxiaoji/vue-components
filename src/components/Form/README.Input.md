# Input

输入框。

## Props

| 属性            | 类型           | 默认值    | 必填  | 说明                                                |
| --------------- | -------------- | --------- | ----- | --------------------------------------------------- |
| value / v-model | string, number | ''        | false |
| name            | string         | 随机      | false | [form](./README.Form.md) 的标识，没有设置会随机生成 |
| size            | string         | 'default' | false | 尺寸，可选值：default / mini / large                |
| type            | string         | 'text'    | false | 类型，可选值：text / number / password              |
| placeholder     | string         |           | false | 输入框为空时占位符                                  |
| disabled        | boolean        | false     | false | 是否禁用                                            |
| readonly        | boolean        | false     | false | 是否只读                                            |
| maxlength       | number, string | 140       | false | 最大长度                                            |
| focus           | boolean        | false     | false | 是否获取焦点                                        |
| show-clear      | boolean        | true      | false | 是否展示清空 icon                                   |
| valid           | function       |           | false | 校验 value 函数                                     |

### type 的合法值

| 值       | 说明     |
| -------- | -------- |
| text     | 普通文本 |
| number   | 数字输入 |
| password | 密码输入 |

### valid 函数

回调函数首个参数接收 change 的 value，如果 return 一个 Error 对象 error，则展示警告信息 error.message

## CSS

| 属性    | 默认值  | 说明   |
| ------- | ------- | ------ |
| --color | #09bb07 | 主色调 |

## Events

| 事件   | 描述             | 回调函数参数                            |
| ------ | ---------------- | --------------------------------------- |
| input  | 改变时触发       | EventHandle，可通过 e.detail.value 取值 |
| change | 改变且失焦后触发 | EventHandle，可通过 e.detail.value 取值 |
| focus  | 获取焦点时触发   | EventHandle                             |
| blur   | 移出焦点时触发   | EventHandle                             |
