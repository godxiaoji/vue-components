# IndexView 索引栏

## IndexView Props

| 属性              | 类型          | 默认值 | 必填 | 说明                        |
| ----------------- | ------------- | ------ | ---- | --------------------------- |
| sticky-offset-top | number/string | 0      | 否   | 数值默认是 px，也支持 vw/vh |

## IndexView Events

| 事件   | 描述       | 回调函数参数               |
| ------ | ---------- | -------------------------- |
| change | 切换时触发 | { activeIndex } 当前项索引 |

## IndexView Slots

注：其中只可放置 [IndexViewItem](./IndexView.md#indexviewitem-索引子项) 组件，否则会导致未定义的行为。

```
<fx-index-view>
  <fx-index-view-item name="A">
    <fx-cell label="单元格"></fx-cell>
    <fx-cell label="单元格"></fx-cell>
    <fx-cell label="单元格"></fx-cell>
  </fx-index-view-item>
  ...
</fx-index-view>
```

## IndexViewItem 索引子项

## IndexViewItem Props

| 属性 | 类型   | 默认值 | 必填 | 说明                       |
| ---- | ------ | ------ | ---- | -------------------------- |
| name | string |        | 是   | 分组名，也应用于吸附和菜单 |

## IndexViewItem Slots

```
<fx-index-view-item name="A">
  <fx-cell label="单元格"></fx-cell>
  <fx-cell label="单元格"></fx-cell>
  <fx-cell label="单元格"></fx-cell>
  ...
</fx-index-view-item>
```
