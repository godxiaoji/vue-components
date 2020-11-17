# Switch

开关选择器。

## Props

| 属性              | 类型    | 默认值 | 必填 | 说明                            |
| ----------------- | ------- | ------ | ---- | ------------------------------- |
| name              | string  |        | 否   | [form](./README.Form.md) 的标识 |
| disabled          | boolean | false  | 否   | 是否禁用                        |
| value / v-model | boolean | false  | 否   | 是否开启                        |

## CSS

| 属性               | 默认值                               | 说明               |
| ------------------ | ------------------------------------ | ------------------ |
| --switch-on-color  | <font color="#1890ff">#1890ff</font> | 激活背景色         |
| --switch-off-color | <font color="#dadadc">#dadadc</font> | 未激活背景色       |
| --switch-size      | 32px                                 | 选择器大小，高度值 |

## Events

| 事件   | 描述               | 回调函数参数                            |
| ------ | ------------------ | --------------------------------------- |
| change | 点击切换状态时触发 | { value }, value = true(开) / false(关) |
