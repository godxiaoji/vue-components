# Picker

选择器。

## Props

| 属性              | 类型                            | 默认值                                                   | 必填 | 说明                                                                                    |
| ----------------- | ------------------------------- | -------------------------------------------------------- | ---- | --------------------------------------------------------------------------------------- |
| visible.sync      | boolean                         | false                                                    | 否   | 是否显示                                                                                |
| initial-mode      | string                          |                                                          | 否   | 设置特殊选择器，可选值： 'date', 'time', ' datetime, 'region'，设置后会采用内置 options |
| options           | array                           | []                                                       | 否   | 数据集                                                                                  |
| value/v-modal     | string/number/string[]/number[] | []                                                       | 否   | 设置选中项                                                                              |
| format-string     | boolean                         | false                                                    | 否   | value 双向绑定值是为字符串                                                              |
| initial-separator | string                          | '/'                                                      | 否   | 分隔符                                                                                  |
| field-names       | object                          | { label: 'label', value: 'value', children: 'children' } | 否   | 自定义 options 中 label value children 的字段 key                                       |

### mode 的合法值

参考 [PickerView](./README.PickerView.md#mode)

### options 的结构

参考 [PickerView](./README.PickerView.md#options)

### value 的结构

参考 [PickerView](./README.PickerView.md#value)

## Events

| 事件    | 描述                 | 回调函数参数                                       |
| ------- | -------------------- | -------------------------------------------------- |
| cancel  | 取消按钮点击时触发   | { cancel: true }                                   |
| confirm | 确认按钮点击时触发   | { value: array, valueString: string, date?: Date } |
| change  | 选中值发生变化时触发 | { value: array, valueString: string, date?: Date } |
| show    | 展示时触发           | {}                                                 |
| shown   | 展示且动画结束后触发 | {}                                                 |
| hide    | 隐藏时触发           | {}                                                 |
| hidden  | 隐藏且动画结束后触发 | {}                                                 |

### prop mode = date / time / datetime 模式下， confirm 和 change 事件的回调参数

| 值          | 类型     | 说明                              |
| ----------- | -------- | --------------------------------- |
| valueString | string   | 常用格式，如 2020-02-14 00:00:00  |
| value       | string[] | 数组形式，如 ["2020", "02", "14"] |
| date        | Date     | 时间对应的 Date 实例              |

### prop mode 在其他模式下， confirm 和 change 事件回调参数

| 值          | 类型              | 说明                                                        |
| ----------- | ----------------- | ----------------------------------------------------------- |
| valueString | string            | 格式化后的数值，如：1, "a/b", "北京市/北京市/东城区"        |
| value       | number[]/string[] | 数组形式，如：[1]，["a", "b"]，["北京市","北京市","东城区"] |
