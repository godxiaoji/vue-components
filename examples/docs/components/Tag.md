# Tag 标签

## Props

| 属性               | 类型    | 默认值    | 必填 | 说明                                                                                           |
| ------------------ | ------- | --------- | ---- | ---------------------------------------------------------------------------------------------- |
| type               | string  | 'default' | 否   | 标签类型                                                                                       |
| pattern            | string  | 'light'   | 否   | 标签款式                                                                                       |
| size               | string  | 'middle'  | 否   | 标签尺寸                                                                                       |
| closable           | boolean | true      | 否   | 是否展示关闭按钮，只推荐在 size='large' 情况下开启                                             |
| initial-long-press | boolean | false     | 否   | 是否开启长按事件，因为该事件会加入较多的监听事件，且大部分情景下用不着，所以默认关闭，减少损耗 |

### type 的合法值

| 值      | 说明                            |
| ------- | ------------------------------- |
| default | <font color=#8c8c8c>次要</font> |
| primary | <font color=#1890ff>主要</font> |
| success | <font color=#52c41a>成功</font> |
| warning | <font color=#faad14>警告</font> |
| danger  | <font color=#ff4d4f>危险</font> |

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
