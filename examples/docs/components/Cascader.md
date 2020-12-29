# Cascader 级联选择器

- 可以配合 [Form](./Form.md) 和 [FormItem](./Form.md#formitem-表单项)  使用。

## Props

| 属性              | 类型                            | 默认值                                                   | 必填 | 说明                                                                                    |
| ----------------- | ------------------------------- | -------------------------------------------------------- | ---- | --------------------------------------------------------------------------------------- |
| name              | string                          |                                                          | 否   | [Form](./Form.md) 的标识                                                         |
| placeholder       | string                          |                                                          | 否   | 没有选中值的提示，也会用在弹窗标题上                                                    |
| disabled          | boolean                         | false                                                    | 否   | 是否禁用                                                                                |
| initial-mode      | string                          |                                                          | 否   | 设置特殊选择器，可选值： 'date', 'time', ' datetime, 'region'，设置后会采用内置 options |
| options           | array                           | []                                                       | 否   | 数据集                                                                                  |
| v-modal           | string/number/string[]/number[] | []                                                       | 否   | 选中值                                                                                  |
| format-string     | boolean                         | false                                                    | 否   | value 双向绑定值是为字符串                                                              |
| initial-separator | string                          | '/'                                                      | 否   | 分隔符                                                                                  |
| field-names       | object                          | { label: 'label', value: 'value', children: 'children' } | 否   | 自定义 options 中 label value children 的字段 key                                       |

### mode 的合法值

| 值       | 说明           |
| -------- | -------------- |
| time     | 时间选择器     |
| date     | 日期选择器     |
| datetime | 日期时间选择器 |
| region   | 省市区选择器   |

注：由于地区涉及的数据较大，当 `mode='region'` 时，需要额外引入地区数据。

```
import Vfox from 'vfox'
import regionData from 'vfox/data/region'

Vfox.addRegionData(regionData)
```

### options 的结构

```
[
  {
    label: '空调',
    value: 'kongtiao',
    children: [
      {
        label: '家用空调',
        value: 'jiayongkongtiao',
        children: [
          {
            label: '挂式空调',
            value: 'guashikongtiao'
          },
          {
            label: '柜式空调',
            value: 'guishikongtiao'
          }
        ]
      },
      {
        label: '厨房空调',
        value: 'chufangkongtiao'
      }
    ]
  },
  {
    label: '冰箱',
    value: 'bingxiang',
    children: [
      {
        label: '双门',
        value: 'shuangmen'
      },
      {
        label: '三门',
        value: 'sanmen'
      },
      {
        label: '对开门',
        value: 'duikaimen'
      },
      {
        label: '多门',
        value: 'duomen'
      }
    ]
  },
  {
    label: '洗衣机',
    value: 'xiyiji',
    children: [
      {
        label: '波轮',
        value: 'bolun'
      },
      {
        label: '滚筒',
        value: 'guntong'
      },
      {
        label: '洗烘一体',
        value: 'xihongyiti'
      }
    ]
  }
]
```

### value 的结构

```
[ 'xiyiji', 'guntong' ]
```

当 formatString 为 true 时，根据分割线 `/` 返回：

```
xiyiji/guntong
```

## Events

| 事件   | 描述                        | 回调函数参数                                                                     |
| ------ | --------------------------- | -------------------------------------------------------------------------------- |
| select | 选择后触发                  | detail：{ value: array, valueString: string, label: array, labelString: string } |
| change | 选择后 value 发生改变时触发 | detail：{ value: array, valueString: string, label: array, labelString: string } |
| show   | 展示时触发                  | {}                                                                               |
| shown  | 展示且动画结束后触发        | {}                                                                               |
| hide   | 隐藏时触发                  | {}                                                                               |
| hidden | 隐藏且动画结束后触发        | {}                                                                               |

### change 等回调参数的 detail 结构

| 值          | 类型              | 说明                 |
| ----------- | ----------------- | -------------------- |
| value       | number[]/string[] | ["zaolei", "lunzao"] |
| valueString | string            | "zaolei/lunzao"      |
| label       | string[]          | ["藻类", "轮藻"]     |
| labelString | string            | "藻类/轮藻"          |
