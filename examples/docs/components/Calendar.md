# Calendar 日历

## Calendar/CalendarPopup/CalendarView 的公共 Props

| 属性           | 类型        | 默认值             | 必填 | 说明                                                      |
| -------------- | ----------- | ------------------ | ---- | --------------------------------------------------------- |
| v-modal        | Date/Date[] | []                 | 否   | 选中值                                                    |
| min-date       | Date        | 当前日期           | 否   | 可选最小值                                                |
| max-date       | Date        | 当前日期的六个月后 | 否   | 可选最大值                                                |
| initial-type   | string      | 'single'           | 否   | 选择类型：`single` 表示选择一天，`range` 选择一个日期区间 |
| allow-same-day | boolean     | false              | 否   | `initialType="range"`生效，设置开始结束时间是否可以同一天 |
| max-range      | number      | Infinity           | 否   | `initialType="range"`生效，选择区间的最长天数             |
| day-handler    | Function    |                    | 否   | 日历每个日期处理函数                                      |

### v-modal 的合法值

`Date` 类型，或者可以被 `new Date(value)`的有效值，如果`initialType="range"`，则为数组形式

### day-handler 函数 (Object: Day) => Day

日历中的每个日期都对应一个 Day 对象，通过 `day-handler` 属性可以修改 Day 对象的内容后返回。

| 值              | 类型    | 说明                                                                                                                                                                                                                                         |
| --------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| date            | Date    | 日期对应的 Date 对象，该字段修改无效                                                                                                                                                                                                         |
| state           | string  | 日期当前的状态，有：`selected` 选中，`startSelected` 开始（initialType="range"下），`endSelected` 结束（initialType="range"下），`disabled` 禁用。在空字符串的情况下，可以设置为 `disabled` 强制设置该日期为禁用（一般在票卖完的情况下设置） |
| text            | string  | 日期文本，不建议修改                                                                                                                                                                                                                         |
| topText         | string  | 日期上方展示文本，一般可修改为“节日名称”、“今天”、“明天”、“开始”、“结束”等                                                                                                                                                                   |
| topHighlight    | boolean | 日期上方展示文本是否高亮                                                                                                                                                                                                                     |
| bottomText      | string  | 日期下方展示文本，一般可修改为“机票价格”、“酒店价格”、“特价”、“热门”等                                                                                                                                                                       |
| bottomHighlight | boolean | 日期下方展示文本是否高亮                                                                                                                                                                                                                     |
| dateString      | string  | 日期对应的格式化时间（`YYYY-MM-DD`），如：2020-11-11，该字段不影响展示                                                                                                                                                                       |

## Calendar 日历选择器

- 可以配合 [Form](./Form.md) 和 [FormItem](./Form.md#formitem-表单项)  使用。

## Calendar Props

| 属性               | 类型     | 默认值 | 必填 | 说明                                   |
| ------------------ | -------- | ------ | ---- | -------------------------------------- |
| name               | string   |        | 否   | [Form](./Form.md) 的标识        |
| placeholder        | string   |        | 否   | 没有选中值的提示，也会用在弹窗标题上 |
| disabled           | boolean  | false  | 否   | 是否禁用                               |
| formatter          | Function |        | 否   | 选中项格式化函数                       |
| popup-show-confirm | boolean  | false  | 否   | 弹窗是否展示确定按钮               |
| popup-show-close   | boolean  | false  | 否   | 弹窗是否展示关闭按钮                 |

### formatter 函数

formatter(value: Date[]) => any

可以对选中后的 value 进行修改，会应用在 `v-modal` 和表单校验中

## Calendar Events

| 事件   | 描述                   | 回调函数参数                                        |
| ------ | ---------------------- | --------------------------------------------------- |
| change | 选择后值发生改变时触发 | { value: array, label: string, rangeCount: number } |

### change 事件的回调参数

| 值         | 类型   | 说明                                                             |
| ---------- | ------ | ---------------------------------------------------------------- |
| value      | Date[] | 选择的值，`initialType="range"` 下有开始 Date 和结束 Date 两个值 |
| label      | label  | 选中值对应的描述文本                                             |
| rangeCount | number | 选择区间持续的天数                                               |

## CalendarPopup 日历弹窗

## CalendarPopup Props

| 属性         | 类型    | 默认值 | 必填 | 说明                   |
| ------------ | ------- | ------ | ---- | ---------------------- |
| visible.sync | boolean | false  | 否   | 是否显示               |
| title        | string  |        | 否   | 弹窗标题               |
| show-confirm | boolean | false  | 否   | 选择时是否展示确定按钮 |
| show-close   | boolean | false  | 否   | 是否展示关闭按钮       |

## CalendarPopup Events

| 事件    | 描述                                                    | 回调函数参数                                        |
| ------- | ------------------------------------------------------- | --------------------------------------------------- |
| confirm | 选择完毕后触发 / `show-confirm=true` 点击确定按钮后触发 | { value: array, label: string, rangeCount: number } |
| show    | 展示时触发                                              | {}                                                  |
| shown   | 展示且动画结束后触发                                    | {}                                                  |
| hide    | 隐藏时触发                                              | {}                                                  |
| hidden  | 隐藏且动画结束后触发                                    | {}                                                  |

## CalendarView 日历选择

平铺形式。

## CalendarView Events

| 事件   | 描述       | 回调函数参数                                        |
| ------ | ---------- | --------------------------------------------------- |
| select | 选择后触发 | { value: array, label: string, rangeCount: number } |
