# Form

表单。将组件内的用户输入的 [switch](./README.Switch.md)、[input](./README.Input.md)、[checkbox](./README.Checkbox.md)、[slider](./README.Slider.md)、[radio](./README.Radio.md)、[cascader](./README.Cascader.md) 和原生组件提交。

当点击 [form](./README.Form.md) 中 form-type 为 submit 的 [button](./README.Button.md) 组件时，会将表单组件中的 value 值进行提交，需要在表单组件中加上 name 来作为 key。

## Events

| 事件   | 描述                               | 回调函数参数                                                    |
| ------ | ---------------------------------- | --------------------------------------------------------------- |
| submit | 携带 form 中的数据触发 submit 事件 | CustomEvent，其中 event.details = { value : {'name': 'value'} } |
| reset  | 表单重置时会触发 reset 事件        | CustomEvent                                                     |

### event.details.value 的值

该数据汇集了所有设置 name 的表单标签数据（含原生标签），部分数据类型是 Array，如：`checbox`，`select multiple`等
