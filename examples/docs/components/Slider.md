# Slider 滑块选择器

- 可以配合 [Form](./Form.md) 和 [FormItem](./Form.md#formitem-表单项) 使用。

## Props

| 属性       | 类型    | 默认值 | 必填 | 说明                                          |
| ---------- | ------- | ------ | ---- | --------------------------------------------- |
| v-model    | number  |        | 否   |
| name       | string  |        | 否   | [Form](./Form.md) 的标识                      |
| min        | number  | 0      | 否   | 最小值                                        |
| max        | number  | 100    | 否   | 最大值                                        |
| step       | number  | 1      | 否   | 步长，取值必须大于 0，并且可被(max - min)整除 |
| disabled   | boolean | false  | 否   | 是否禁用                                      |
| show-value | boolean | false  | 否   | 是否显示当前 value                            |
| color      | string  |        | 否   | 设置主色                                      |

## Events

| 事件   | 描述                     | 回调函数参数 |
| ------ | ------------------------ | ------------ |
| input  | 拖动过程中触发的事件     | { value }    |
| change | 完成一次拖动后触发的事件 | { value }    |
