# Drawer 抽屉类型弹窗

## Picker.showPicker(object)

显示选择弹窗。

### Params

Object object

| 属性        | 类型                            | 默认值                                                   | 必填 | 说明                                                                                   |
| ----------- | ------------------------------- | -------------------------------------------------------- | ---- | -------------------------------------------------------------------------------------- |
| title       | string                          |                                                          | 否   | 弹窗标题                                                                               |
| options     | array                           | []                                                       | 否   | 数据集，参考 [Picker options](../components/Picker.md#options-的结构)                  |
| value       | string/number/string[]/number[] | []                                                       | 否   | 默认的选中项，参考 [Picker modelValue](../components/Picker.md#modelmodelvalue-的结构) |
| field-names | object                          | { label: 'label', value: 'value', children: 'children' } | 否   | 自定义 options 中 label value children 的字段 key                                      |
| success     | function                        |                                                          | 否   | 接口调用成功（在用户做出选择后，如取消，确定）的回调函数                               |
| fail        | function                        |                                                          | 否   | 接口调用失败（如传入错误的参数）的回调函数（不传入 fail 遇错误直接抛出）               |
| complete    | function                        |                                                          | 否   | 弹窗关闭或调用失败的回调函数                                                           |

### object.success 回调参数

| 属性               | 类型              | 说明                                              |
| ------------------ | ----------------- | ------------------------------------------------- |
| cancel             | boolean           | 为 true 时，表示取消                              |
| confirm            | boolean           | 为 true 时，表示点击了确定，回调中含有 value 等值 |
| detail.value       | number[]/string[] | ["zaolei", "lunzao"]                              |
| detail.valueString | string            | "zaolei/lunzao"                                   |
| detail.label       | string[]          | ["藻类", "轮藻"]                                  |
| detail.labelString | string            | "藻类/轮藻"                                       |

### Usage

```
import { Picker } from 'vfox'

Picker.showPicker({
  title: 'Picker',
  options: multiOptions,
  success: {confirm, cancel, detail} => {
    ...
  }
})
```

## Cascader.showCascader(object)

显示级联选择弹窗。

### Params

Object object

| 属性        | 类型                            | 默认值                                                   | 必填 | 说明                                                                                    |
| ----------- | ------------------------------- | -------------------------------------------------------- | ---- | --------------------------------------------------------------------------------------- |
| title       | string                          |                                                          | 否   | 没有选择时弹窗的标题文案                                                                |
| options     | array                           | []                                                       | 否   | 数据集，参考 [Cascader options](../components/Cascader.md#options-的结构)               |
| value       | string/number/string[]/number[] | []                                                       | 否   | 默认的选中项，考参考 [Cascader modelValue](../components/Cascader.md#modelvalue-的结构) |
| field-names | object                          | { label: 'label', value: 'value', children: 'children' } | 否   | 自定义 options 中 label value children 的字段 key                                       |
| success     | function                        |                                                          | 否   | 接口调用成功（在用户做出选择后，如取消，确定）的回调函数                                |
| fail        | function                        |                                                          | 否   | 接口调用失败（如传入错误的参数）的回调函数（不传入 fail 遇错误直接抛出）                |
| complete    | function                        |                                                          | 否   | 弹窗关闭或调用失败的回调函数                                                            |

#### object.success 回调参数

| 属性               | 类型              | 说明                                              |
| ------------------ | ----------------- | ------------------------------------------------- |
| cancel             | boolean           | 为 true 时，表示取消                              |
| confirm            | boolean           | 为 true 时，表示点击了确定，回调中含有 value 等值 |
| detail.value       | number[]/string[] | ["zaolei", "lunzao"]                              |
| detail.valueString | string            | "zaolei/lunzao"                                   |
| detail.label       | string[]          | ["藻类", "轮藻"]                                  |
| detail.labelString | string            | "藻类/轮藻"                                       |

### Usage

```
import { Cascader } from 'vfox'

Cascader.showCascader({
  title: '植物',
  options: cascadeOptions,
  success: {selected, cancel, detail} => {
    ...
  }
})
```

## showActionSheet(object)

显示动作面板。

### Params

Object object

| 属性       | 类型     | 默认值 | 必填 | 说明                                                                              |
| ---------- | -------- | ------ | ---- | --------------------------------------------------------------------------------- |
| title      | string   |        | 否   | 提示的标题，不设置则不展示                                                        |
| options    | array    |        | 否   | 选项列表，参考 [ActionSheet options](../components/ActionSheet.md#options-的结构) |
| showCancel | boolean  | true   | 否   | 是否显示取消按钮                                                                  |
| cancelText | string   | '取消' | 否   | 取消按钮的文字                                                                    |
| success    | function |        | 否   | 接口调用成功（在用户做出选择后，如取消，选择选项）的回调函数                      |
| fail       | function |        | 否   | 接口调用失败（如传入错误的参数）的回调函数（不传入 fail 遇错误直接抛出）          |
| complete   | function |        | 否   | 弹窗关闭或调用失败的回调函数                                                      |

#### object.success 回调参数

| 属性          | 类型    | 说明                                              |
| ------------- | ------- | ------------------------------------------------- |
| selected      | boolean | 为 true 时，表示用户点击了选项，此时返回 `detail` |
| cancel        | boolean | 为 true 时，表示用户点击了取消                    |
| detail?.item  | any     | options[index] 的副本                             |
| detail?.index | number  | 索引                                              |

### Usage

```
import { ActionSheet } from 'vfox'

ActionSheet.showActionSheet({
  title: '标题',
  options: [
    {
      name: '选项1',
      description: '选项1的描述文案'
    },
    {
      name: '选项2'
    },
    {
      name: '选项3'
    }
  ],
  showCancel: true,
  success: ({ selected, detail }) => {
    ...
  }
})
```

## DatePicker.showDatePicker(object)

日期选择弹窗。

### Params

Object object

| 属性     | 类型     | 默认值                       | 必填 | 说明                                                                                                                            |
| -------- | -------- | ---------------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------- |
| title    | string   |                              | 否   | 弹窗标题                                                                                                                        |
| value    | Date     |                              | 否   | 默认选择值                                                                                                                      |
| mode     | string   |                              | 否   | 选择的模式，可选 'date', 'time', 'datetime' 等，参考 [DatePicker initialMode](../components/DatePicker.md#initialmode-的合法值) |
| min-date | Date     | 当天对应 10 年前的 Date 实例 | 否   | 最小时间对应的 Date 实例（含）                                                                                                  |
| max-date | Date     | 当天最后一秒的 Date 实例     | 否   | 最大时间对应的 Date 实例（含）                                                                                                  |
| filter   | Function |                              | 否   | 选项过滤器，`filter(number: number, type: 'year' \| 'month' \| 'day' \| 'hour' \| 'minute' \| 'second') => boolean`             |
| success  | function |                              | 否   | 接口调用成功（在用户做出选择后，如取消，确定）的回调函数                                                                        |
| fail     | function |                              | 否   | 接口调用失败（如传入错误的参数）的回调函数（不传入 fail 遇错误直接抛出）                                                        |
| complete | function |                              | 否   | 弹窗关闭或调用失败的回调函数                                                                                                    |

### object.success 回调参数

| 属性              | 类型     | 说明                                              |
| ----------------- | -------- | ------------------------------------------------- |
| cancel            | boolean  | 为 true 时，表示取消                              |
| confirm           | boolean  | 为 true 时，表示点击了确定，回调中含有 value 等值 |
| detail.formatted  | string   | "2021-05-01"                                      |
| detail.value      | Date     | 对应日期的 Date 实例                              |
| detail.valueArray | number[] | [2021, 5, 1]                                      |

### Usage

```
import { DatePicker } from 'vfox'

DatePicker.showDatePicker({
  title: 'DatePicker',
  success: {confirm, cancel, detail} => {
    ...
  }
})
```
