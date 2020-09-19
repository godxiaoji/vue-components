# Input

输入框。

## Props

| 属性            | 类型           | 默认值    | 必填 | 说明                                              |
| --------------- | -------------- | --------- | ---- | ------------------------------------------------- |
| value / v-model | string, number | ''        | 否   |
| name            | string         |           | 否   | [form](./README.Form.md) 的标识                   |
| size            | string         | 'default' | 否   | 尺寸，可选值：default / mini / large              |
| align           | string         | 'left'    | 否   | 左右对齐，可选值：left / center / right           |
| border          | boolean        | true      | 否   | 是否显示边框                                      |
| type            | string         | 'text'    | 否   | 类型，可选值：text / number / password / textarea |
| placeholder     | string         |           | 否   | 输入框为空时占位符                                |
| disabled        | boolean        | false     | 否   | 是否禁用                                          |
| readonly        | boolean        | false     | 否   | 是否只读                                          |
| maxlength       | number, string | 140       | 否   | 最大长度                                          |
| focus           | boolean        | false     | 否   | 是否获取焦点                                      |

### type 的合法值

| 值       | 说明                                            |
| -------- | ----------------------------------------------- |
| text     | 普通文本                                        |
| number   | 数字输入                                        |
| password | 密码输入                                        |
| textarea | 多行文本，该类型下，默认 1 行，需要自行修改高度 |

## CSS

| 属性    | 默认值  | 说明   |
| ------- | ------- | ------ |
| --color | #09bb07 | 主色调 |

## Events

| 事件   | 描述             | 回调函数参数 |
| ------ | ---------------- | ------------ |
| input  | 改变时触发       | InputEvent   |
| change | 改变且失焦后触发 | Event        |
| focus  | 获取焦点时触发   | FocusEvent   |
| blur   | 移出焦点时触发   | FocusEvent   |

## Slots

### 前置元素

```
<fx-input>
  <template #prepend>https://</template>
</fx-input>
```

也可以传入 `Icon`，比如常见的搜索

### 后置元素

```
<fx-input>
  <template #append>.com</template>
</fx-input>
```
