# Tab 标签列

## Props

| 属性              | 类型                       | 默认值                             | 必填 | 说明                                       |
| ----------------- | -------------------------- | ---------------------------------- | ---- | ------------------------------------------ |
| options           | object[]/string[]/number[] | []                                 | 是   | tab 数据集                                 |
| active-value.sync | string, number             |                                    | 否   | 当前激活项的 value 值                      |
| scroll-threshold  | number                     | 4                                  | 否   | 超过 `scrollThreshold` 个 Tab 使用滚动形式 |
| vertical          | boolean                    | false                              | 否   | 纵向展示                                   |
| field-names       | object                     | { label: 'label', value: 'value' } | 否   | 自定义 options 中 label value 的字段 key   |

### options 的结构

| key         | 类型                 | 默认值 | 必填 | 说明                                                                    |
| ----------- | -------------------- | ------ | ---- | ----------------------------------------------------------------------- |
| value       | string/number        |        | 是   | 唯一值（active-value 使用）                                             |
| label       | string               |        | 是   | 标签名                                                                  |
| icon        | string/Component     |        | 否   | 设置图标，使用 [Icon](./Icon.md) 组件                                   |
| active-icon | string/Component     |        | 否   | 设置激活态图标，没有设置则沿用 `icon` 属性，使用 [Icon](./Icon.md) 组件 |
| badge       | string/number/object |        | 否   | 徽标，使用 [Badge](./Badge.md) 组件，可传入一个基于 Badge props 的对象  |

```
[
  {
    value: 1,
    label: '首页',
    icon: 'HomeOutlined',
    badge: '热'
  },
  {
    value: 2,
    label: '搜索',
    icon: 'SearchOutlined',
    badge: {
      dot: true,
      content: 1
    }
  }
]
```

也可以直接设置为 `string[]` 或 `number[]`，如：

```
['aaa', 'bbb', 'ccc']
```

将被转为：

```
[
  {
    value: 'aaa',
    label: 'aaa'
  },
  {
    value: 'bbb',
    label: 'bbb'
  }
  {
    value: 'ccc',
    label: 'ccc'
  }
]
```

注：注意数组项要保持唯一性。

## CSS

| 属性               | 默认值                               | 说明   |
| ------------------ | ------------------------------------ | ------ |
| --tab-active-color | <font color="#262626">#262626</font> | 激活色 |
| --tab-color        | <font color="#595959">#595959</font> | 默认色 |

## Events

| 事件   | 描述                | 回调函数参数     |
| ------ | ------------------- | ---------------- |
| change | 点击切换 tab 时触发 | { value, index } |

### change 的回调参数

| 参数  | 类型          | 描述                  |
| ----- | ------------- | --------------------- |
| value | string/number | 当前激活项的 value 值 |
| index | number        | 当前激活项的索引值    |

## Methods

| 方法名        | 说明                 | 参数                           |
| ------------- | -------------------- | ------------------------------ |
| switchTo      | 切换到指定 Tab       | (value: string/number) => void |
| switchToIndex | 切换到指定索引的 Tab | (index: number) => void        |
