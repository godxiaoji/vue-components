# <a name="Radio">Radio 组件</a>

单选项目。

## Props

| 属性              | 类型                           | 默认值 | 必填 | 说明                                                                                                 |
| ----------------- | ------------------------------ | ------ | ---- | ---------------------------------------------------------------------------------------------------- |
| value             | string / number / 可序列化对象 | ''     | 否   | 标识，[radio-group](./README.RadioGroup.md) 的 change 事件会携带 [radio](./README.Radio.md) 的 value |
| disabled          | boolean                        | false  | 否   | 是否禁用                                                                                             |
| checked / v-model | boolean                        | false  | 否   | 当前是否选中，可用来设置默认选中                                                                     |

## CSS

| 属性                 | 默认值                             | 说明       |
| -------------------- | ---------------------------------- | ---------- |
| --radio-color        | <font color=#d9d9d9>#d9d9d9</font> | 图标色     |
| --radio-active-color | <font color=#1890ff>#1890ff</font> | 图标激活色 |
| --radio-font-color   | <font color=#262626>#262626</font> | 文本色     |

## Slots

```
<fx-radio>男</fx-radio>
<fx-radio>女</fx-radio>
```

# <a name="RadioGroup">RadioGroup 组件</a>

单项选择器，内部由多个 [Radio](./README.Radio.md#Radio) 组成。

## Props

| 属性   | 类型    | 默认值 | 必填 | 说明                            |
| ------ | ------- | ------ | ---- | ------------------------------- |
| name   | string  |        | 否   | [form](./README.Form.md) 的标识 |
| inline | boolean | false  | 否   | 是否使用内联布局，默认纵向布局  |

## Events

| 事件   | 描述                 | 回调函数参数 |
| ------ | -------------------- | ------------ |
| change | 选中项发生改变时触发 | { value }    |

## Slots

```
<fx-radio-group>
  <fx-radio>男</fx-radio>
  <fx-radio>女</fx-radio>
  ...
</fx-radio-group>
```

### 前置元素

```
<fx-radio-group>
  <template #prepend>性别</template>
  ...
</fx-radio-group>
```
