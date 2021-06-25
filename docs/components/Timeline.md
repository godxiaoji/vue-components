# Timeline 步骤条

## Timeline CSS

| 属性                    | 默认值  | 说明           |
| ----------------------- | ------- | -------------- |
| --timeline-color        | #8c8c8c | 步骤条默认颜色 |
| --timeline-active-color | #1890ff | 步骤条激活颜色 |

## Timeline Slots

### 默认（#default）

注：其中只可放置 [TimelineItem](./Timeline.md#timelineitem-时间轴子项) 组件，否则会导致未定义的行为。

```
<fx-timeline>
  <fx-timeline-item title="成功获得0.01元收益">搞半天就这点？</fx-timeline-item>
  <fx-timeline-item title="十天后到账">0.01元还要十天到账？</fx-timeline-item>
  <fx-timeline-item title="爱要不要">不要了，滚。</fx-timeline-item>
</fx-timeline>
```

## TimelineItem 时间轴子项

## TimelineItem Props

| 属性     | 类型   | 默认值 | 必填 | 说明           |
| -------- | ------ | ------ | ---- | -------------- |
| title    | string |        | 否   | 时间轴子项标题 |
| dotColor | string |        | 否   | 时间轴节点颜色 |

## TimelineItem CSS

| 属性                         | 默认值  | 说明                                                                   |
| ---------------------------- | ------- | ---------------------------------------------------------------------- |
| --timeline-item-color        | #8c8c8c | 步骤条默认颜色，不设置继承 [Timeline](./Timeline.md#timeline-css) 组件 |
| --timeline-item-active-color | #1890ff | 步骤条激活颜色，不设置继承 [Timeline](./Timeline.md#timeline-css) 组件 |

## TimelineItem Slots

### 内容（#default）

```
<fx-timeline-item title="标题">
  自定义内容
</fx-timeline-item>
```

### 标题（#title）

```
<fx-timeline-item>
  <template #title>
  【珠海市】【珠海一部】快递小哥正在派件（<a href="tel:10000">10000</a>）
  </template>
  2021-04-13 11:22:16
</fx-timeline-item>
```

PS：优先级高于 Props `title`。

### 节点（#dot）

```
<fx-timeline-item>
  <template #dot">
    <fx-icon icon="CheckOutlined"></fx-icon>
  </template>
</fx-timeline-item>
```
