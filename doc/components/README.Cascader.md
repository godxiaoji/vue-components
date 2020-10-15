# Cascader

级联选择器。

## Props

| 属性            | 类型              | 默认值                                                   | 必填 | 说明                                                                            |
| --------------- | ----------------- | -------------------------------------------------------- | ---- | ------------------------------------------------------------------------------- |
| name            | string            |                                                          | 否   | [form](./README.Form.md) 的标识                                                 |
| default-mode    | string            |                                                          | 否   | 初始化内置选择器 date / time / datetime，为了防止逻辑混乱，组件创建后不支持更改 |
| options         | array             | []                                                       | 否   | 数据集                                                                          |
| value / v-modal | string[]/number[] | []                                                       | 否   | 默认的选中项                                                                    |
| size            | string            | 'default'                                                | 否   | 设置大小，可选值：default / mini / large                                        |
| align           | string            | 'left'                                                   | 否   | 左右对齐，可选值：left / center / right                                         |
| border          | boolean           | true                                                     | 否   | 是否显示边框                                                                    |
| placeholder     | string            | '请选择'                                                 | 否   | 未进行选择时的提示                                                              |
| disabled        | boolean           | false                                                    | 否   | 是否被禁用                                                                      |
| separator       | string            | '/'                                                      | 否   | 分隔符                                                                          |
| field-names     | object            | { label: 'label', value: 'value', children: 'children' } | 否   | 自定义 options 中 label name children 的字段 key                                |

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

### value 的结构

```
[ 'zaolei', 'lvzao' ]
```

## CSS

| 属性             | 默认值               | 说明           |
| ---------------- | -------------------- | -------------- |
| --color          | #09bb07              | 主色调         |
| --dropdown-color | rgba(9, 187, 7, 0.1) | 下拉菜单主色调 |

## Events

| 事件              | 描述                    | 回调函数参数                                                     |
| ----------------- | ----------------------- | ---------------------------------------------------------------- |
| change            | 选中值发生变化时触发    | CustomEvent，可通过 event.details.value 取值                     |
| visibility-change | 下拉框出现/隐藏时触发   | CustomEvent，event.details.visibility = true(显示) / false(隐藏) |
| blur              | 当 input 失去焦点时触发 | FocusEvent                                                       |
| focus             | 当 input 获得焦点时触发 | FocusEvent                                                       |

### prop mode = date / time / datetime 模式下， change 事件的 event.details

| 值     | 类型              | 说明                                                        |
| ------ | ----------------- | ----------------------------------------------------------- |
| value  | string            | 格式化后的数值，如：1, "a/b", "北京市/北京市/东城区"        |
| values | number[]/string[] | 数组形式，如：[1]，["a", "b"]，["北京市","北京市","东城区"] |

### prop mode = date / time / datetime 模式下， change 事件的 event.details

| 值     | 类型     | 说明                              |
| ------ | -------- | --------------------------------- |
| value  | string   | 常用格式，如 2020-02-14 00:00:00  |
| values | string[] | 数组形式，如 ["2020", "02", "14"] |
| date   | Date     | 时间对应的 Date 实例              |

## Slots

### 前置元素

```
<fx-cascader>
  <template #prepend>性别</template>
</fx-cascader>
```
