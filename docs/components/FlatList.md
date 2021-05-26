# FlatList 回收列表

注：

- 需要给 `flat-list` 一个固定高度，通过 CSS 设置 height。
- 如果列表内容存在不固定宽高的图片，由于图片加载的机制，每个 item 的 DOM 渲染了，图片可能还未加载，导致每个 item 的位置计算错误，所以作为调用方，需要将未加载的图片用样式固定住。在已知宽高比（比如常见的正方形商品图），可以使用 `Image` 组件内置 `aspect-ratio` 来固定图片宽高。

## Props

| 属性                  | 类型            | 默认值 | 必填 | 说明                                                                                                                                                                   |
| --------------------- | --------------- | ------ | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data                  | any[]           |        | 是   | 列表数组                                                                                                                                                               |
| data-key              | string          |        | 否   | 表明每个 item 项的身份（item[dataKey]），如果想指向自己，则设置为 `*this` 。建议填写，不填默认使用 index 作为身份标识                                                  |
| horizontal            | boolean         | false  | 否   | 设置为 true 则变为水平布局模式                                                                                                                                         |
| get-item-size         | Function        |        | 否   | 动态返回列表项尺寸（垂直布局下指高度，水平布局下指宽度），`getItemSize(item:any, index:number) => number`，item 是 data[index] 的副本                                  |
| item-size             | number          |        | 否   | 设置列表项尺寸，优先使用 `get-item-size`                                                                                                                               |
| end-reached-threshold | number          | 0.5    | 否   | 决定当距离内容最底部还有多远时触发 onEndReached 回调。注意此参数是一个比值而非像素单位。比如，0.5 表示距离内容最底部的距离为当前列表可见长度的一半时触发               |
| enable-pull-refresh   | boolean         | false  | 否   | 是否开启下拉刷，如果时水平列表则为左拉刷新，搭配 `refreshing` 事件使用新                                                                                               |
| lower-loading         | boolean         | false  | 否   | 是否展示底部加载更多状态，配合 `end-reached` 事件加载无无限列表                                                                                                        |
| initial-waterfall     | boolean         | false  | 否   | 是否开启瀑布流展示方，仅初始化时生效式                                                                                                                                 |
| waterfall-col-count   | number          | 2      | 否   | 瀑布流列数，`initial-waterfall=true` 时生效，支持 2 ~ 5 列                                                                                                             |
| item-gutter           | number/number[] | false  | 否   | 项间隔，通过数值设置水平和垂直间隔，也可以通过数组的形式分别设置水平和垂直间隔 [水平间隔, 垂直间隔]，`getItemSize` 或者 `itemSize` 设定值需要把 `item-gutter` 考虑进去 |

## Events

| 事件           | 描述                 | 回调函数参数                                                                                           |
| -------------- | -------------------- | ------------------------------------------------------------------------------------------------------ |
| recycle-change | 列表项回收变化时触发 | { item, index, recycled }                                                                              |
| end-reached    | 滚动到末尾时触发     | { distanceFromEnd } 其中 distanceFromEnd 为距离末尾的距离，单位 px                                     |
| scroll         | 滚动时触发           | { scrollLeft, scrollTop, scrollHeight, scrollWidth }                                                   |
| refreshing     | 下拉刷新时触发       | ({ pullDirection: string }, done: Function) 其中 pullDirection 指下拉的方向，done 指刷新完毕回调的函数 |

### recycle-change 的参数

| 值       | 类型    | 说明                                           |
| -------- | ------- | ---------------------------------------------- |
| recycled | boolean | 是否被回收                                     |
| index    | number  | 第 index 项                                    |
| item     | any     | 传入 data[index]的副本，修改不会影响 prop data |

## Slots

### 列表项（#default）

```
<fx-flat-list>
 <template #default="{ item, index }">
  {{ index }} : {{ item }}
 </template>
</fx-flat-list>
```

### 列表为空（#empty）

```
<fx-flat-list>
  <template #empty>暂无数据</template>
  ...
</fx-flat-list>
```

### 分割线（#separator）

```
<fx-flat-list>
  <template #separator>
    <div class="line"></div>
  </template>
</fx-flat-list>
```

注：`getItemSize` 或者 `itemSize` 设定值需要把分割线也考虑进去。

### 前置（#header）

```
<fx-flat-list>
  <template #header></template>
  ...
</fx-flat-list>
```

也可以传入 [Icon](./Icon.md)，比如常见的搜索。

### 后置（#footer）

```
<fx-flat-list>
  ...
  <template #footer>暂时没有更多了</template>
</fx-flat-list>
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
