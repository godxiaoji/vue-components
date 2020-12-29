# Radio 单选项

## Radio Props

| 属性              | 类型                           | 默认值 | 必填 | 说明                                                                                   |
| ----------------- | ------------------------------ | ------ | ---- | -------------------------------------------------------------------------------------- |
| value             | string / number / 可序列化对象 | ''     | 否   | 标识，[radio-group](./RadioGroup.md) 的 change 事件会携带 [radio](./Radio.md) 的 value |
| disabled          | boolean                        | false  | 否   | 是否禁用                                                                               |
| checked / v-model | boolean                        | false  | 否   | 当前是否选中，可用来设置默认选中                                                       |

## Radio CSS

| 属性                 | 默认值                             | 说明       |
| -------------------- | ---------------------------------- | ---------- |
| --radio-color        | <font color=#d9d9d9>#d9d9d9</font> | 图标色     |
| --radio-active-color | <font color=#1890ff>#1890ff</font> | 图标激活色 |
| --radio-font-color   | <font color=#262626>#262626</font> | 文本色     |

## Radio Slots

```
<fx-radio>男</fx-radio>
<fx-radio>女</fx-radio>
```

## RadioGroup 单项选择器

- 内部由多个 [Radio](./Radio.md#Radio-单选项) 组成。

- 可以配合 [Form](./Form.md) 和 [FormItem](./Form.md#formitem-表单项)  使用。

## RadioGroup Props

| 属性   | 类型    | 默认值 | 必填 | 说明                           |
| ------ | ------- | ------ | ---- | ------------------------------ |
| name   | string  |        | 否   | [Form](./Form.md) 的标识       |
| inline | boolean | false  | 否   | 是否使用内联布局，默认纵向布局 |

## RadioGroup Events

| 事件   | 描述                 | 回调函数参数 |
| ------ | -------------------- | ------------ |
| change | 选中项发生改变时触发 | { value }    |

## RadioGroup Slots

### 默认（#default）

```
<fx-radio-group>
  <fx-radio>男</fx-radio>
  <fx-radio>女</fx-radio>
  ...
</fx-radio-group>
```
