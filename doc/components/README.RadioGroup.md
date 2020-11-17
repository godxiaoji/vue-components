# RadioGroup

单项选择器，内部由多个 [radio](./README.Radio.md) 组成。

## Props

| 属性   | 类型    | 默认值 | 必填 | 说明                            |
| ------ | ------- | ------ | ---- | ------------------------------- |
| name   | string  |        | 否   | [form](./README.Form.md) 的标识 |
| inline | boolean | false  | 否   | 是否使用内联布局，默认纵向布局  |

## Events

| 事件   | 描述                 | 回调函数参数                                 |
| ------ | -------------------- | -------------------------------------------- |
| change | 选中项发生改变时触发 | { value } |

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
