# Swiper

滑块视图容器。其中只可放置 `swiper-item` 组件，否则会导致未定义的行为。

## SwiperProps

| 属性                   | 类型    | 默认值               | 必填 | 说明                 |
| ---------------------- | ------- | -------------------- | ---- | -------------------- |
| indicator-dots         | boolean | false                | 否   | 是否显示面板指示点   |
| indicator-color        | color   | rgba(4, 10, 19, .45) | 否   | 指示点颜色           |
| indicator-active-color | color   | #1890ff              | 否   | 当前选中的指示点颜色 |
| autoplay               | boolean | false                | 否   | 是否自动切换         |
| active-index.sync      | number  | 0                    | 否   | 当前所在滑块的 index |
| interval               | number  | 5000                 | 否   | 自动切换时间间隔     |
| duration               | number  | 500                  | 否   | 滑动动画时长         |

## SwiperEvents

| 事件    | 描述                         | 回调函数参数               |
| ------- | ---------------------------- | -------------------------- |
| change  | 切换时触发                   | { activeIndex } 当前项索引 |
| changed | 切换动画结束时触发           | { activeIndex } 当前项索引 |
| click   | 点击时触发，为了区分滑动情况 | {}                         |

## SwiperSlots

```
<fx-swiper>
  <fx-swiper-item>
    <fx-image src="a.jpg" />
  </fx-swiper-item>
  <fx-swiper-item>
    <fx-image src="b.jpg" />
  </fx-swiper-item>
  ...
</fx-swiper>
```
