# Sticky 粘性布局

## StickyView 粘性容器

## Sticky Props

| 属性             | 类型                    | 默认值   | 必填 | 说明                                                                            |
| ---------------- | ----------------------- | -------- | ---- | ------------------------------------------------------------------------------- |
| contain-selector | string/element/document | document | 否   | 基于哪个容器，如果是 string，则为可以被 document.querySelector(selector) 获取到 |
| offset-top       | number/string           | 0        | 否   | 数值默认是 px，也支持 vw/vh                                                     |
| offset-buttom    | number/string           | 0        | 否   | 数值默认是 px，也支持 vw/vh                                                     |

## Sticky Slots

### 默认（#default）

```
<fx-sticky>
  自定义内容
</fx-sticky>
```

## StickyView 粘性布局

## StickyView Props

| 属性                 | 类型                    | 默认值   | 必填 | 说明                                                                            |
| -------------------- | ----------------------- | -------- | ---- | ------------------------------------------------------------------------------- |
| v-model:active-index | number                  | 0        | 否   | 当前布局中展现的子项 index                                                      |
| contain-selector     | string/element/document | document | 否   | 基于哪个容器，如果是 string，则为可以被 document.querySelector(selector) 获取到 |
| offset-top           | number/string           | 0        | 否   | 数值默认是 px，也支持 vw/vh                                                     |

## StickyView Events

| 事件   | 描述       | 回调函数参数               |
| ------ | ---------- | -------------------------- |
| change | 切换时触发 | { activeIndex } 当前项索引 |

## StickyView Slots

注：其中只可放置 [StickyViewItem](./Sticky.md#stickyviewitem-粘性布局子项) 组件，否则会导致未定义的行为。

```
<fx-sticky-view>
  <fx-sticky-view-item name="Sticky 1">
    <div class="sticky-box-1"></div>
  </fx-sticky-view-item>
  <fx-sticky-view-item name="Sticky 1">
    <div class="sticky-box-1"></div>
  </fx-sticky-view-item>
  <fx-sticky-view-item name="Sticky 2">
    <div class="sticky-box-2"></div>
  </fx-sticky-view-item>
  <fx-sticky-view-item name="Sticky 3">
    <div class="sticky-box-3"></div>
  </fx-sticky-view-item>
  <fx-sticky-view-item name="Sticky 4">
    <div class="sticky-box-4"></div>
  </fx-sticky-view-item>
</fx-sticky-view>
```

## StickyViewItem 粘性布局子项

## StickyViewItem Props

| 属性 | 类型   | 默认值 | 必填 | 说明                 |
| ---- | ------ | ------ | ---- | -------------------- |
| name | string |        | 是   | 分组名，也应用于吸附 |

## StickyViewItem Slots

```
<fx-sticky-view-item name="Sticky 1">
  <div class="sticky-box-1"></div>
</fx-sticky-view-item>
```
