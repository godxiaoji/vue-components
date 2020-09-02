# Swiper

滑块视图容器。其中只可放置 [swiper-item](./README.SwiperItem.md) 组件，否则会导致未定义的行为。

## Props

| 属性                   | 类型    | 默认值         | 必填 | 说明                 |
| ---------------------- | ------- | -------------- | ---- | -------------------- |
| indicator-dots         | boolean | false          | 否   | 是否显示面板指示点   |
| indicator-color        | color   | rgba(0,0,0,.3) | 否   | 指示点颜色           |
| indicator-active-color | color   | #000000        | 否   | 当前选中的指示点颜色 |
| autoplay               | boolean | false          | 否   | 是否自动切换         |
| current.sync           | number  | 0              | 否   | 当前所在滑块的 index |
| interval               | number  | 5000           | 否   | 自动切换时间间隔     |
| duration               | number  | 500            | 否   | 滑动动画时长         |

## Events

| 事件            | 描述                             | 回调函数参数                                   |
| --------------- | -------------------------------- | ---------------------------------------------- |
| change          | current 改变时会触发 change 事件 | CustomEvent，event.details = {current, source} |
| animationfinish | 动画结束时会触发                 | CustomEvent                                    |
