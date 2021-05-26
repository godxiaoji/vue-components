# Pagination 分页

## Props

| 属性            | 类型   | 默认值 | 必填 | 说明     |
| --------------- | ------ | ------ | ---- | -------- |
| v-model:current | number | 1      | 否   | 当前页码 |
| total           | number | 1      | 否   | 总页数   |

## Events

| 事件   | 描述               | 回调函数参数                       |
| ------ | ------------------ | ---------------------------------- |
| change | 点击翻页按钮时触发 | { current: number, total: number } |

## Slots

### 默认（#default）

```
<fx-pagination>
  <template #default="{current, total}"> 第 {{ current }} / {{total}} 页 </template>
</fx-pagination>
```

### 翻页按钮（#prev/#next）

```
<fx-pagination>
  <template #prev> 上一页 </template>
  <template #next> 下一页 </template>
</fx-pagination>
```
