# FlatList

高性能列表。需要给 [flat-list](./README.FlatList.md) 一个固定高度，通过 CSS 设置 height。

## Props

| 属性                  | 类型     | 默认值 | 必填 | 说明                                                                                                                                                     |
| --------------------- | -------- | ------ | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data                  | any[]    |        | 是   | 列表数组                                                                                                                                                 |
| data-key              | string   |        | 否   | 表明每个 item 项的身份（item[dataKey]），如果想指向自己，则设置为 `*this` 。建议填写，不填默认使用 index 作为身份标识                                    |
| horizontal            | boolean  | false  | 否   | 设置为 true 则变为水平布局模式                                                                                                                           |
| get-item-size         | Function |        | 否   | 动态返回列表项尺寸（垂直布局下指高度，水平布局下指宽度），`getItemSize(item:any, index:number) => number`，item 是 data[index] 的副本                    |
| item-size             | number   |        | 否   | 设置列表项尺寸，优先使用 `get-item-size`                                                                                                                 |
| initial-scroll-index  | number   |        | 否   | 开始时屏幕顶端的元素是列表中的第 `initialScrollIndex` 个元素, 而不是第一个元素                                                                           |
| end-reached-threshold | number   | 0.5    | 否   | 决定当距离内容最底部还有多远时触发 onEndReached 回调。注意此参数是一个比值而非像素单位。比如，0.5 表示距离内容最底部的距离为当前列表可见长度的一半时触发 |  |

## Events

| 事件           | 描述                 | 回调函数参数                                                                      |
| -------------- | -------------------- | --------------------------------------------------------------------------------- |
| recycle-change | 列表项回收变化时触发 | CustomEvent，event.details = { item, index, recycled }                            |
| end-reached    | 滚动到末尾时触发     | CustomEvent，event.details.distanceFromEnd 距离末尾的距离，单位 px                |
| scroll         | 滚动时触发           | CustomEvent，event.details = { scrollLeft, scrollTop, scrollHeight, scrollWidth } |

### recycle-change 的 event.details 项

| 值       | 类型    | 说明                                           |
| -------- | ------- | ---------------------------------------------- |
| recycled | boolean | 是否被回收                                     |
| index    | number  | 第 index 项                                    |
| item     | any     | 传入 data[index]的副本，修改不会影响 prop data |

## Slots

### 列表项

```
<template #item="{ item, index }">
  {{ index }} : {{ item }}
</template>
```

### 列表为空

```
<template #empty>暂无数据</template>
```

### 分割线

```
<template #separator>
  <div class="line"></div>
</template>
```

注：`getItemSize` 或者 `itemSize` 设定值需要把分割线也考虑进去。

### 前置

```
<template #header></template>
```

也可以传入 icon，比如常见的搜索

### 后置

```
<template #footer>暂时没有更多了</template>
```

## Methods

| 方法名            | 说明                                                 | 参数                                                                 |
| ----------------- | ---------------------------------------------------- | -------------------------------------------------------------------- |
| scrollToIndex     | 将位于指定位置的元素滚动到可视区的指定位置           | ({ index: number, animated: boolean, viewPosition: string }) => void |
| scrollToOffset    | 滚动列表到指定的偏移，单位 px                        | ({ offset: number, animated: boolean }) => void                      |
| scrollToEnd       | 滚动到底部                                           | ({ animated: boolean }) => void                                      |
| recordInteraction | 主动通知列表发生了一个事件，以使列表重新计算可视区域 | () => void                                                           |

### scrollToIndex 的参数

| 属性         | 类型    | 默认值  | 必填 | 说明                                                          |
| ------------ | ------- | ------- | ---- | ------------------------------------------------------------- |
| index        | number  |         | 是   | 列表第 `index` 项滚动到可视区的指定位置                       |
| animated     | boolean | true    | 否   | 滚动过程中是否使用过度动画                                    |
| viewPosition | string  | 'start' | 否   | 'start'/'center'/'end'/0/0.5/1 显示在屏幕的头部/中间/末尾位置 |
