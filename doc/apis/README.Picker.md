# Picker

## <a name="showPicker">Vue.prototype.\$showPicker(object)</a>

显示选择弹窗。

### 参数

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

### mode 的合法值

参考 [PickerView](../components/README.PickerView.md#mode)

### options 的结构

参考 [PickerView](../components/README.PickerView.md#options)

### value 的结构

参考 [PickerView](../components/README.PickerView.md#value)

### object.success 回调函数

| 属性               | 类型              | 说明                                              |
| ------------------ | ----------------- | ------------------------------------------------- |
| cancel             | boolean           | 为 true 时，表示取消                              |
| confirm            | boolean           | 为 true 时，表示点击了确定，回调中含有 value 等值 |
| detail.value       | number[]/string[] | ["zaolei", "lunzao"]                              |
| detail.valueString | string            | "zaolei/lunzao"                                   |
| detail.label       | string[]          | ["藻类", "轮藻"]                                  |
| detail.labelString | string            | "藻类/轮藻"                                       |

### 用法

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

## <a name="showCascader">Vue.prototype.\$showCascader(object)</a>

显示级联选择弹窗。

### 参数

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

### mode 的合法值

参考 [Cascader](../components/README.PickerView.md#mode)

### options 的结构

参考 [Cascader](../components/README.Cascader.md#options)

### value 的结构

参考 [Cascader](../components/README.Cascader.md#value)

### object.success 回调函数

| 属性               | 类型              | 说明                                              |
| ------------------ | ----------------- | ------------------------------------------------- |
| cancel             | boolean           | 为 true 时，表示取消                              |
| confirm            | boolean           | 为 true 时，表示点击了确定，回调中含有 value 等值 |
| detail.value       | number[]/string[] | ["zaolei", "lunzao"]                              |
| detail.valueString | string            | "zaolei/lunzao"                                   |
| detail.label       | string[]          | ["藻类", "轮藻"]                                  |
| detail.labelString | string            | "藻类/轮藻"                                       |

### 用法

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
