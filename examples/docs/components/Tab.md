# Tab 标签列

## Props

| 属性             | 类型           | 默认值                             | 必填 | 说明                                       |
| ---------------- | -------------- | ---------------------------------- | ---- | ------------------------------------------ |
| options          | object[]       | []                                 | 是   | tab 数据集                                 |
| v-model  | string, number |                                    | 否   | 当前激活项的 value 值                      |
| scroll-threshold | number         | 4                                  | 否   | 超过 `scrollThreshold` 个 Tab 使用滚动形式 |
| vertical         | boolean        | false                              | 否   | 纵向展示                                   |
| field-names      | object         | { label: 'label', value: 'value' } | 否   | 自定义 options 中 label value 的字段 key   |

### options 的结构

```
[
  {
    value: 1,
    label: '空调'
  },
  {
    value: 2,
    label: '冰箱'
  },
  {
    value: 3,
    label: '洗衣机'
  },
  {
    value: 4,
    label: '热水器'
  },
  {
    value: 5,
    label: '环境电器'
  }
]
```

## CSS

| 属性               | 默认值                               | 说明   |
| ------------------ | ------------------------------------ | ------ |
| --tab-active-color | <font color="#262626">#262626</font> | 激活色 |
| --tab-color        | <font color="#595959">#595959</font> | 默认色 |

## Events

| 事件   | 描述            | 回调函数参数   |
| ------ | --------------- | -------------- |
| change | 切换 tab 时触发 | { value, index } |

### change 的回调参数

| 参数  | 类型   | 描述                  |
| ----- | ------ | --------------------- |
| value | string | 当前激活项的 value 值 |
| index | number | 当前激活项的索引值    |
