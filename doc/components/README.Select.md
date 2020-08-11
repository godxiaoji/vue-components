# Select

下拉选择器，内部由多个 [select-option](./README.SelectOption.md) 组成

## Props

| 属性            | 类型           | 默认值    | 必填  | 说明                                 |
| --------------- | -------------- | --------- | ----- | ------------------------------------ |
| value / v-model | string, number |           | false |
| name            | string         |           | false | [form](./README.Form.md) 的标识      |
| size            | string         | 'default' | false | 尺寸，可选值：default / mini / large |
| placeholder     | string         | ''        | false | 未选择时占位符                       |
| disabled        | boolean        | false     | false | 是否禁用                             |

## CSS

| 属性    | 默认值  | 说明   |
| ------- | ------- | ------ |
| --color | #09bb07 | 主色调 |

## Events

| 事件              | 描述                    | 回调函数参数                                                |
| ----------------- | ----------------------- | ----------------------------------------------------------- |
| change            | 选中值发生变化时触发    | CustomEvent，可通过 e.detail.value 取值                     |
| visibility-change | 下拉框出现/隐藏时触发   | CustomEvent，e.detail.visibility = true(显示) / false(隐藏) |
| blur              | 当 input 失去焦点时触发 | CustomEvent                                                 |
| focus             | 当 input 获得焦点时触发 | CustomEvent                                                 |
