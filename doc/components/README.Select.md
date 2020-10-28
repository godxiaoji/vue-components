# Select

下拉选择器。

## Props

| 属性            | 类型           | 默认值    | 必填 | 说明                                 |
| --------------- | -------------- | --------- | ---- | ------------------------------------ |
| options         | object[]          | []        | 否   | 数据集                               |
| value / v-model | string, number |           | 否   |
| name            | string         |           | 否   | [form](./README.Form.md) 的标识      |
| size            | string         | 'default' | 否   | 尺寸，可选值：default / mini / large |
| placeholder     | string         | ''        | 否   | 未选择时占位符                       |
| disabled        | boolean        | false     | 否   | 是否禁用                             |
| field-names     | object         | { label: 'label', value: 'value' } | 否   | 自定义 options 中 label value 的字段 key |

### options 的结构

```
[
  {
    label: '藻类',
    disabled: true,
    value: 'zaolei'
  },
  {
    label: '苔藓',
    value: 'taixian'
  }
]
```

## CSS

| 属性    | 默认值  | 说明   |
| ------- | ------- | ------ |
| --color | #09bb07 | 主色调 |

## Events

| 事件              | 描述                    | 回调函数参数                                                     |
| ----------------- | ----------------------- | ---------------------------------------------------------------- |
| change            | 选中值发生变化时触发    | CustomEvent，可通过 event.details.value 取值                     |
| visibility-change | 下拉框出现/隐藏时触发   | CustomEvent，event.details.visibility = true(显示) / false(隐藏) |
| blur              | 当 input 失去焦点时触发 | FocusEvent                                                       |
| focus             | 当 input 获得焦点时触发 | FocusEvent                                                       |

## Slots

```
<fx-select>
  <fx-select-option>选项 A</fx-select-option>
  <fx-select-option>选项 B</fx-select-option>
  ...
</fx-select>
```
