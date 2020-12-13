# Picker

选择器。

## Picker/PickerPopup/PickerView 的公共 Props

| 属性              | 类型                            | 默认值                                                   | 必填 | 说明                                                                                    |
| ----------------- | ------------------------------- | -------------------------------------------------------- | ---- | --------------------------------------------------------------------------------------- |
| v-modal           | string/number/string[]/number[] | []                                                       | 否   | 选中值                                                                                  |
| initial-mode      | string                          |                                                          | 否   | 设置特殊选择器，可选值： 'date', 'time', ' datetime, 'region'，设置后会采用内置 options |
| options           | array                           | []                                                       | 否   | 数据集                                                                                  |
| format-string     | boolean                         | false                                                    | 否   | value 双向绑定值是为字符串                                                              |
| initial-separator | string                          | '/'                                                      | 否   | 分隔符                                                                                  |
| field-names       | object                          | { label: 'label', value: 'value', children: 'children' } | 否   | 自定义 options 中 label value children 的字段 key                                       |

### <a name="mode">mode 的合法值</a>

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

### <a name="options">options 的结构</a>

组件会通过 options 值的结构来分析是否是级联模式。

判断是级联的方式是：一维数组且子数据中有 children 列表。

#### 单列

```
[
  2016,
  2017,
  2018,
  2019,
  2020
]
```

或者完整写法：

```
[
  {
    "label": "2016",
    "value": 2016,
    "disabled": false
  },
  {
    "label": "2017",
    "value": 2017,
    "disabled": false
  },
  {
    "label": "2018",
    "value": 2018,
    "disabled": false
  },
  {
    "label": "2019",
    "value": 2019,
    "disabled": false
  },
  {
    "label": "2020",
    "value": 2020,
    "disabled": false
  }
]
```

#### 多列

```
[
  [
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020
  ],
  [
    "春",
    "夏",
    "秋",
    "冬"
  ]
]
```

#### 级联

```
[
  {
    label: '藻类',
    disabled: true,
    value: 'zaolei',
    children: [
      { label: '绿藻', value: 'lvzao' },
      { label: '轮藻', value: 'lunzao' }
    ]
  },
  {
    label: '苔藓',
    value: 'taixian',
    children: [
      { label: '地钱', value: 'diqian' },
      { label: '角苔', value: 'jiaotai' },
      { label: '苔藓植物门', value: 'taixianzhiwumeng' }
    ]
  },
  {
    label: '蕨类',
    value: 'juelei',
    children: [
      { label: '石松', value: 'shisong' },
      { label: '蕨类植物门', value: 'jueleizhiwumeng' }
    ]
  },
  {
    label: '种子植物',
    value: 'zhongzizhiwu',
    children: [
      {
        label: '被子',
        value: 'pizi',
        children: [
          { label: '睡莲目', value: 'shuilianmu' },
          { label: '木兰藤目', value: 'mulantengmu' }
        ]
      },
      { label: '苏铁', value: 'sutie' },
      { label: '银杏', value: 'yinxin' },
      { label: '松柏', value: 'songbai' }
    ]
  }
]
```

### <a name="value">value 的结构</a>

```
[ 'zaolei', 'lvzao' ]
```

当 formatString 为 true 时，根据分割线 `/` 返回：

```
zaolei/lvzao
```

## Event

### change 等回调参数的 detail 结构

| 值          | 类型              | 说明                 |
| ----------- | ----------------- | -------------------- |
| value       | number[]/string[] | ["zaolei", "lunzao"] |
| valueString | string            | "zaolei/lunzao"      |
| value       | number[]/string[] | ["藻类", "轮藻"]     |
| valueString | string            | "藻类/轮藻"          |

# <a name="Picker">Picker 组件</a>

选择器。可以配合 [Form](./README.Form.md) 和 [FormItem](./README.FormItem.md) 使用。

## 独有 Props

| 属性        | 类型    | 默认值 | 必填 | 说明                                   |
| ----------- | ------- | ------ | ---- | -------------------------------------- |
| name        | string  |        | 否   | [form](./README.Form.md) 的标识        |
| placeholder | string  |        | 否   | 没有选中值的提示，也会用在弹窗标题上 |
| disabled    | boolean | false  | 否   | 是否禁用                               |

## Events

| 事件   | 描述                       | 回调函数参数                                                                     |
| ------ | -------------------------- | -------------------------------------------------------------------------------- |
| change | 选择后选中值发生变化时触发 | detail：{ value: array, valueString: string, label: array, labelString: string } |

# <a name="PickerPopup">PickerPopup 组件</a>

选择弹窗。

## 独有 Props

| 属性         | 类型    | 默认值 | 必填 | 说明           |
| ------------ | ------- | ------ | ---- | -------------- |
| visible.sync | boolean | false  | 否   | 是否显示弹窗 |
| title        | string  |        | 否   | 弹窗标题     |

## Events

| 事件    | 描述                 | 回调函数参数                                                                     |
| ------- | -------------------- | -------------------------------------------------------------------------------- |
| cancel  | 点击取消按钮后触发   | {}                                                                               |
| confirm | 点击确定按钮后触发   | detail：{ value: array, valueString: string, label: array, labelString: string } |
| change  | 选中值发生变化时触发 | detail：{ value: array, valueString: string, label: array, labelString: string } |
| show    | 展示时触发           | {}                                                                               |
| shown   | 展示且动画结束后触发 | {}                                                                               |
| hide    | 隐藏时触发           | {}                                                                               |
| hidden  | 隐藏且动画结束后触发 | {}                                                                               |

# <a name="PickerView">PickerView 组件</a>

选择。平铺形式。

## Events

| 事件   | 描述                       | 回调函数参数                                                                     |
| ------ | -------------------------- | -------------------------------------------------------------------------------- |
| change | 滑动后选中值发生变化时触发 | detail：{ value: array, valueString: string, label: array, labelString: string } |
