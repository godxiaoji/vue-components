# <a name="CheckboxGroup">Checkbox 组件</a>

多选项目。

## Props

| 属性              | 类型                           | 默认值 | 必填 | 说明                                                                                                             |
| ----------------- | ------------------------------ | ------ | ---- | ---------------------------------------------------------------------------------------------------------------- |
| value             | string / number / 可序列化对象 | ''     | 否   | 标识，[checkbox-group](./README.CheckboxGroup.md) 的 change 事件会携带 [checkbox](./README.Checkbox.md) 的 value |
| disabled          | boolean                        | false  | 否   | 是否禁用                                                                                                         |
| checked / v-model | boolean                        | false  | 否   | 当前是否选中，可用来设置默认选中                                                                                 |

## CSS

| 属性                    | 默认值                             | 说明       |
| ----------------------- | ---------------------------------- | ---------- |
| --checkbox-color        | <font color=#d9d9d9>#d9d9d9</font> | 图标色     |
| --checkbox-active-color | <font color=#1890ff>#1890ff</font> | 图标激活色 |
| --checkbox-font-color   | <font color=#262626>#262626</font> | 文本色     |

## Slots

```
<fx-checkbox>开朗</fx-checkbox>
<fx-checkbox>活泼</fx-checkbox>
...
```

# <a name="CheckboxGroup">CheckboxGroup 组件</a>

多项选择器，内部由多个 [Checkbox](./README.Checkbox.md#Checkbox) 组成。

## Props

| 属性   | 类型    | 默认值 | 必填 | 说明                            |
| ------ | ------- | ------ | ---- | ------------------------------- |
| name   | string  |        | 否   | [form](./README.Form.md) 的标识 |
| inline | boolean | false  | 否   | 是否使用内联布局，默认纵向布局  |

## Events

| 事件名称 | 描述                 | 回调函数参数 |
| -------- | -------------------- | ------------ |
| change   | 选中项发生改变时触发 | { value }    |

## Slots

```
<fx-checkbox-group>
  <fx-checkbox>开朗</fx-checkbox>
  <fx-checkbox>活泼</fx-checkbox>
  ...
</fx-checkbox-group>
```

### 前置元素

```
<fx-checkbox-group>
  <template #prepend>性格</template>
  ...
</fx-checkbox-group>
```
