# ScrollTab 标签滚动布局

## ScrollTab Props

| 属性                 | 类型          | 默认值 | 必填 | 说明                        |
| -------------------- | ------------- | ------ | ---- | --------------------------- |
| sticky-offset-top    | number/string | 0      | 否   | 数值默认是 px，也支持 vw/vh |
| sticky-offset-buttom | number/string | 0      | 否   | 数值默认是 px，也支持 vw/vh |

## ScrollTab Events

| 事件   | 描述       | 回调函数参数               |
| ------ | ---------- | -------------------------- |
| change | 切换时触发 | { activeIndex } 当前项索引 |

## ScrollTab Slots

注：其中只可放置 [ScrollTabItem](./ScrollTab.md#scrolltabitem-标签滚动子项) 组件，否则会导致未定义的行为。

```
<fx-scroll-tab>
  <fx-scroll-tab-item name="Dust Red">
    <div class="scroll-tab-box box-1"></div>
  </fx-scroll-tab-item>
  <fx-scroll-tab-item name="Volcano">
    <div class="scroll-tab-box box-2"></div>
  </fx-scroll-tab-item>
  <fx-scroll-tab-item name="Sunset Orange">
    <div class="scroll-tab-box box-3"></div>
  </fx-scroll-tab-item>
  ...
</fx-scroll-tab>
```

## ScrollTabItem 标签滚动子项

## ScrollTabItem Props

| 属性 | 类型   | 默认值 | 必填 | 说明                       |
| ---- | ------ | ------ | ---- | -------------------------- |
| name | string |        | 是   | 分组名，也应用于吸附和菜单 |

## ScrollTabItem Slots

```
<fx-scroll-tab-item name="Dust Red">
  <div class="scroll-tab-box box-1"></div>
</fx-scroll-tab-item>
```
