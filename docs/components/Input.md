# Input 输入框

- 可以配合 [Form](./Form.md) 和 [FormItem](./Form.md#formitem-表单项) 使用。

## Props

| 属性        | 类型           | 默认值 | 必填 | 说明                     |
| ----------- | -------------- | ------ | ---- | ------------------------ |
| v-model     | string, number | ''     | 否   |
| name        | string         |        | 否   | [Form](./Form.md) 的标识 |
| type        | string         | 'text' | 否   | 类型                     |
| placeholder | string         |        | 否   | 输入框为空时占位符       |
| disabled    | boolean        | false  | 否   | 是否禁用                 |
| readonly    | boolean        | false  | 否   | 是否只读                 |
| maxlength   | number, string | 140    | 否   | 最大长度                 |
| focus       | boolean        | false  | 否   | 是否获取焦点             |
| show-clear  | boolean        | false  | 否   | 是否展示清除图标         |

### type 的合法值

| 值       | 说明 |
| -------- | ---- |
| text     | 文本 |
| digit    | 整数 |
| number   | 数字 |
| password | 密码 |
| search   | 搜索 |
| password | 密码 |

## Events

| 事件   | 描述                   | 回调函数参数 |
| ------ | ---------------------- | ------------ |
| input  | 输入值改变时触发       | { value }    |
| change | 输入值改变且失焦后触发 | { value }    |
| focus  | 获取焦点时触发         | FocusEvent   |
| blur   | 移出焦点时触发         | FocusEvent   |

## Slots

### 前置元素（#prepend）

```
<fx-input>
  <template #prepend>https://</template>
</fx-input>
```

注：也可以传入 `Icon`，比如常见的搜索。

### 后置元素（#append）

```
<fx-input>
  <template #append>.com</template>
</fx-input>
```
