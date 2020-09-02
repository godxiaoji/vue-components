# Switch

开关选择器。

## Props

| 属性              | 类型    | 默认值    | 必填  | 说明                                 |
| ----------------- | ------- | --------- | ----- | ------------------------------------ |
| name              | string  |           | false | [form](./README.Form.md) 的标识      |
| size              | string  | 'default' | false | 尺寸，可选值：default / mini / large |
| disabled          | boolean | false     | false | 是否禁用                             |
| checked / v-model | boolean | false     | false | 是否开启                             |

## CSS

| 属性    | 默认值  | 说明   |
| ------- | ------- | ------ |
| --color | #09bb07 | 主色调 |

## Events

| 事件   | 描述                   | 回调函数参数                                            |
| ------ | ---------------------- | ------------------------------------------------------- |
| change | checked 状态切换时触发 | CustomEvent，event.details.value = true(开) / false(关) |
