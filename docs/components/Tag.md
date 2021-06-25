# Tag 标签

## Props

| 属性     | 类型    | 默认值    | 必填 | 说明                                               |
| -------- | ------- | --------- | ---- | -------------------------------------------------- |
| type     | string  | 'default' | 否   | 标签类型                                           |
| pattern  | string  | 'light'   | 否   | 标签款式                                           |
| size     | string  | 'middle'  | 否   | 标签尺寸                                           |
| closable | boolean | true      | 否   | 是否展示关闭按钮，只推荐在 size='large' 情况下开启 |

### type 的合法值

| 值      | 说明 |
| ------- | ---- |
| default | 次要 |
| primary | 主要 |
| success | 成功 |
| warning | 警告 |
| danger  | 危险 |

### pattern 的合法值

| 值    | 说明                         |
| ----- | ---------------------------- |
| light | 浅色标签，浅色底，深色字     |
| dark  | 深色标签，深色底，白色字     |
| plain | 空心标签，白底，深色字，有边 |

### size 的合法值

| 值     | 说明     |
| ------ | -------- |
| middle | 默认尺寸 |
| small  | 小尺寸   |

## Events

| 事件       | 描述                                 | 回调函数参数 |
| ---------- | ------------------------------------ | ------------ |
| click      | 回到顶部按钮点击时触发               | MouseEvent   |
| close      | 关闭按钮点击时触发                   | {}           |
| long-press | initialLongPress=true 长按标签时触发 | {}           |

## Slots

### 默认（#default）

```
<fx-tag>标签</fx-tag>
```
