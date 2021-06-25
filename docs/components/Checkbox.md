# Checkbox 多选项

## Checkbox Props

| 属性            | 类型          | 默认值 | 必填 | 说明                                                                                                      |
| --------------- | ------------- | ------ | ---- | --------------------------------------------------------------------------------------------------------- |
| value           | string/number | ''     | 否   | 该项值，[checkbox-group](./Checkbox.md#checkboxgroup-多项选择器) 的 change 事件会携带 `checkbox` 的 value |
| disabled        | boolean       | false  | 否   | 是否禁用                                                                                                  |
| v-model:checked | boolean       | false  | 否   | 当前是否选中，可用来设置默认选中                                                                          |

## Checkbox CSS

| 属性                    | 默认值  | 说明       |
| ----------------------- | ------- | ---------- |
| --checkbox-color        | #d9d9d9 | 图标色     |
| --checkbox-active-color | #1890ff | 图标激活色 |
| --checkbox-font-color   | #262626 | 文本色     |

## Checkbox Events

| 事件名称 | 描述               | 回调函数参数         |
| -------- | ------------------ | -------------------- |
| change   | 勾选发生改变时触发 | { checked: boolean } |

## Checkbox Slots

```
<fx-checkbox>开朗</fx-checkbox>
<fx-checkbox>活泼</fx-checkbox>
...
```

## CheckboxGroup 多项选择器

- 内部由多个 [Checkbox](./Checkbox.md#Checkbox-多选项) 组成。

- 可以配合 [Form](./Form.md) 和 [FormItem](./Form.md#formitem-表单项) 使用。

## CheckboxGroup Props

| 属性    | 类型              | 默认值 | 必填 | 说明                           |
| ------- | ----------------- | ------ | ---- | ------------------------------ |
| name    | string            |        | 否   | [Form](./Form.md) 的标识       |
| inline  | boolean           | false  | 否   | 是否使用内联布局，默认纵向布局 |
| v-model | string[]/number[] | []     | 否   | 当前选择子项的 value 列表      |

## CheckboxGroup Events

| 事件名称 | 描述                 | 回调函数参数 |
| -------- | -------------------- | ------------ |
| change   | 选中项发生改变时触发 | { value }    |

## CheckboxGroup Slots

### 默认（#default）

```
<fx-checkbox-group>
  <fx-checkbox>开朗</fx-checkbox>
  <fx-checkbox>活泼</fx-checkbox>
  ...
</fx-checkbox-group>
```
