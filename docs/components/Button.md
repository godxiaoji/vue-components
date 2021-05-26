# Button 按钮

## Props

| 属性      | 类型    | 默认值      | 必填 | 说明                                                     |
| --------- | ------- | ----------- | ---- | -------------------------------------------------------- |
| size      | string  | 'large'     | 否   | 按钮尺寸                                                 |
| type      | string  | 'default'   | 否   | 按钮类型                                                 |
| pattern   | string  | 'default'   | 否   | 按钮款式                                                 |
| shape     | string  | 'rectangle' | 否   | 按钮形状                                                 |
| ghost     | boolean | false       | 否   | 是否使用幽灵按钮，幽灵按钮将按钮的内容反色，背景变为透明 |
| disabled  | boolean | false       | 否   | 是否禁用                                                 |
| icon      | string  |             | 否   | 图标，使用 [Icon](./Icon.md) 组件                        |
| loading   | boolean | false       | 否   | 名称前是否带 loading 图标，优先级大于 icon               |
| form-type | string  |             | 否   | 'submit' / 'reset'                                       |

### size 的合法值

| 值    | 说明                                      |
| ----- | ----------------------------------------- |
| large | 默认大小，高度 48px，文字 17px，图标 21px |
| small | 小尺寸，高度 28px，文字 12px，图标 18px   |

### type 的合法值

| 值      | 说明                            |
| ------- | ------------------------------- |
| default | <font color=#262626>次要</font> |
| primary | <font color=#1890ff>主要</font> |
| success | <font color=#52c41a>成功</font> |
| warning | <font color=#faad14>警告</font> |
| danger  | <font color=#ff4d4f>危险</font> |

### pattern 的合法值

| 值         | 说明       |
| ---------- | ---------- |
| default    | 默认按钮   |
| solid      | 细线按钮   |
| dashed     | 虚线按钮   |
| borderless | 无边框按钮 |
| gradient   | 渐变色按钮 |

### shape 的合法值

| 值        | 说明                                         |
| --------- | -------------------------------------------- |
| rectangle | 长方形按钮，小圆角                           |
| round     | 半圆角按钮                                   |
| circle    | 圆圈按钮，搭配图标使用，不显示文字           |
| square    | 正方形按钮，小圆角，搭配图标使用，不显示文字 |

### form-type 的合法值

| 值     | 说明     |
| ------ | -------- |
| submit | 提交表单 |
| reset  | 重置表单 |

## Slots

### 默认（#default）

```
<fx-button form-type="submit">提交</fx-button>
```
