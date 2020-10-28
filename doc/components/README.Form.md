# Form

表单。

- 将组件内的用户输入的 [switch](./README.Switch.md)、[input](./README.Input.md)、[checkbox](./README.Checkbox.md)、[slider](./README.Slider.md)、[radio](./README.Radio.md)、[select](./README.Select.md)、[cascader](./README.Cascader.md)、[rate](./README.Rate.md) 和原生组件提交。

- 当点击 `form` 中 form-type 为 submit 的 [button](./README.Button.md) 组件时，会将表单组件中的 value 值进行提交，需要在表单组件中加上 name 来作为 key。

- 配合 `form-item` 组件可以完成一套带校验的表单。

## FormProps

| 属性        | 类型   | 默认值 | 必填 | 说明                                                 |
| ----------- | ------ | ------ | ---- | ---------------------------------------------------- |
| rules       | Object |        | 否   | 表单验证规则                                         |
| label-width | string |        | 否   | 为 `form-item` 组件的 label 统一设置宽度，如 `100px` |

### FormProps 的 rules 结构

```
{
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
  ],
  agreement: [
    {
      validator(rule, value, callback) {
        if (value === true) {
          callback()
        } else {
          callback(new Error('你必须同意该协议'))
        }
      }
    }
  ]
}
```

> 自定义校验 callback 必须被调用。 更多高级用法可参考 [async-validator](https://github.com/yiminghe/async-validator)。

## FormEvents

| 事件            | 描述                               | 回调函数参数                                                               |
| --------------- | ---------------------------------- | -------------------------------------------------------------------------- |
| submit          | 携带 form 中的数据触发 submit 事件 | CustomEvent，其中 event.details = { value : {'name': 'value'} }            |
| reset           | 表单重置时会触发 reset 事件        | CustomEvent                                                                |
| validate-submit | 有检验情况下，表单 submit 触发时   | CustomEvent，其中 event.details = { vaild: true, value : {'name': 'value'} |

### event.details.value 的值

该数据汇集了所有设置 name 的表单标签数据（含原生标签），部分数据类型是 Array，如：`checbox`，`select multiple`等

## FormSlots

```
<fx-form>
  ...
  <fx-input type="text" />
  <fx-button form-type="submit">提交</fx-button>
</fx-form>
```

## FormItemProps

| 属性        | 类型    | 默认值 | 必填 | 说明                                                                                              |
| ----------- | ------- | ------ | ---- | ------------------------------------------------------------------------------------------------- |
| name        | string  |        | 是   | 为子表单组件设置相应的`name`值                                                                    |
| rules       | Object  |        | 否   | 独立表单验证规则，如果没有设置，则根据`name`的值去外层`form`组件查找相应的规则                    |
| label       | string  |        | 否   | 设置该行名称，比如 `昵称`                                                                         |
| label-width | string  |        | 否   | 为 `form-item` 组件的 label 统一设置宽度，如 `100px`                                              |
| required    | boolean | false  | 否   | 是否必填，设置 `true` 后 label 会展示必填`*`，在找不到自定义规则的情况下，会默认加入 1 条必填规则 |

### FormItemProps 的 rules 结构

```
[
  { required: true, message: '请输入昵称', trigger: 'blur' },
  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
]
```
