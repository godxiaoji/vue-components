# SwipeCell 滑动单元格

## Props

| 属性    | 类型     | 默认值 | 必填 | 说明     |
| ------- | -------- | ------ | ---- | -------- |
| buttons | object[] |        | 是   | 按钮列表 |

### buttons 的结构

```
[
  {
    text: '加入收藏',
    type: 'warning'
  },
  {
    text: '删除',
    type: 'danger'
  }
]
```

#### buttons 项中 type 的合法值

| 值      | 说明                            |
| ------- | ------------------------------- |
| primary | <font color=#1890ff>主要</font> |
| default | <font color=#262626>次要</font> |
| success | <font color=#52c41a>成功</font> |
| warning | <font color=#faad14>警告</font> |
| danger  | <font color=#ff4d4f>危险</font> |

## Events

| 事件         | 描述           | 回调函数参数            |
| ------------ | -------------- | ----------------------- |
| button-click | 点击按钮时触发 | { item: object, index } |

### button-click 的参数

| 值    | 类型   | 说明                                                 |
| ----- | ------ | ---------------------------------------------------- |
| index | number | 第 index 个按钮                                      |
| item  | any    | 传入 buttons[index]的副本，修改不会影响 prop buttons |

## Slots

### 被挂载元素（#default）

```
<fx-swipe-cell :buttons="buttons">
  <fx-cell label="单元格" content="向左划"></fx-cell>
</fx-swipe-cell>
```
