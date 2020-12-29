# Drawer

## showPicker(object)

显示选择弹窗。

### Params

Object object

| 属性        | 类型                            | 默认值                                                   | 必填 | 说明                                                                                    |
| ----------- | ------------------------------- | -------------------------------------------------------- | ---- | --------------------------------------------------------------------------------------- |
| title       | string                          |                                                          | 否   | 弹窗标题                                                                                |
| options     | array                           | []                                                       | 否   | 数据集                                                                                  |
| value       | string/number/string[]/number[] | []                                                       | 否   | 默认的选中项                                                                            |
| mode        | string                          |                                                          | 否   | 设置特殊选择器，可选值： 'date', 'time', ' datetime, 'region'，设置后会采用内置 options |
| field-names | object                          | { label: 'label', value: 'value', children: 'children' } | 否   | 自定义 options 中 label value children 的字段 key                                       |
| success     | function                        |                                                          | 否   | 接口调用成功（在用户做出选择后，如取消，确定）的回调函数                                |
| fail        | function                        |                                                          | 否   | 接口调用失败（如传入错误的参数）的回调函数（不传入 fail 遇错误直接抛出）                |
| complete    | function                        |                                                          | 否   | 弹窗关闭或调用失败的回调函数                                                            |

#### mode 的合法值

参考 [Picker](../components/Picker.md#mode-的合法值)

#### options 的结构

参考 [Picker](../components/Picker.md#options-的结构)

#### value 的结构

参考 [Picker](../components/Picker.md#value-的结构)

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
this.$showPicker({
  title: 'Picker',
  options: multiOptions,
  success: res => {
    console.log(res)
    if (res.cancel) {
      this.$showToast('取消了')
    } else {
      this.$showToast(`选择了 ${res.detail.labelString}`)
    }
  }
})
```

## showCascader(object)

显示级联选择弹窗。

### Params

Object object

| 属性        | 类型                            | 默认值                                                   | 必填 | 说明                                                                                    |
| ----------- | ------------------------------- | -------------------------------------------------------- | ---- | --------------------------------------------------------------------------------------- |
| title       | string                          |                                                          | 否   | 没有选择时弹窗的标题文案                                                                |
| options     | array                           | []                                                       | 否   | 数据集                                                                                  |
| value       | string/number/string[]/number[] | []                                                       | 否   | 默认的选中项                                                                            |
| mode        | string                          |                                                          | 否   | 设置特殊选择器，可选值： 'date', 'time', ' datetime, 'region'，设置后会采用内置 options |
| field-names | object                          | { label: 'label', value: 'value', children: 'children' } | 否   | 自定义 options 中 label value children 的字段 key                                       |
| success     | function                        |                                                          | 否   | 接口调用成功（在用户做出选择后，如取消，确定）的回调函数                                |
| fail        | function                        |                                                          | 否   | 接口调用失败（如传入错误的参数）的回调函数（不传入 fail 遇错误直接抛出）                |
| complete    | function                        |                                                          | 否   | 弹窗关闭或调用失败的回调函数                                                            |

#### mode 的合法值

参考 [Cascader](../components/Cascader.md#mode-的合法值)

#### options 的结构

参考 [Cascader](../components/Cascader.md#options-的结构)

#### value 的结构

参考 [Cascader](../components/Cascader.md#value-的结构)

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
this.$showCascader({
  title: '植物',
  options: cascadeOptions,
  success: res => {
    if (res.cancel) {
      this.$showToast('取消了')
    } else {
      this.$showToast(`选择了 ${res.detail.labelString}`)
    }
  }
})
```

## showActionSheet(object)

显示动作面板。

### Params

Object object

| 属性       | 类型     | 默认值 | 必填 | 说明                                                                     |
| ---------- | -------- | ------ | ---- | ------------------------------------------------------------------------ |
| title      | string   |        | 否   | 提示的标题，不设置则不展示                                               |
| options    | array    |        | 否   | 选项列表                                                                 |
| showCancel | boolean  | true   | 否   | 是否显示取消按钮                                                         |
| cancelText | string   | '取消' | 否   | 取消按钮的文字                                                           |
| success    | function |        | 否   | 接口调用成功（在用户做出选择后，如取消，选择选项）的回调函数             |
| fail       | function |        | 否   | 接口调用失败（如传入错误的参数）的回调函数（不传入 fail 遇错误直接抛出） |
| complete   | function |        | 否   | 弹窗关闭或调用失败的回调函数                                             |

#### options 的结构

| options[index] 值 | 类型   | 默认值 | 必填 | 说明         |
| ----------------- | ------ | ------ | ---- | ------------ |
| name              | string |        | 是   | 展示名称     |
| description       | string |        | 否   | 附加描述     |
| disabled          | string | false  | 否   | 是否禁用     |
| highlight         | string | false  | 否   | 是否高亮显示 |

```
[
  {
    name: '选项1',
    disabled: false,
    description: '选项描述',
    highlight: false
  }
]
```

#### object.success 回调参数

| 属性          | 类型    | 说明                                              |
| ------------- | ------- | ------------------------------------------------- |
| selected      | boolean | 为 true 时，表示用户点击了选项，此时返回 `detail` |
| cancel        | boolean | 为 true 时，表示用户点击了取消                    |
| detail?.item  | any     | options[index] 的副本                             |
| detail?.index | number  | 索引                                              |

### Usage

```
this.$showActionSheet({
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
    if (selected) {
      this.$showDialog({
        title: '选择了',
        showCancel: false,
        content: `item.name: '${detail.item.name}'\nindex: ${detail.index}`
      })
    } else {
      this.$showToast('取消了')
    }
  }
})
```
