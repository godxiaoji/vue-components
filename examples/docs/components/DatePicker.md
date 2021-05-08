# DatePicker 时间选择器

## DatePicker/DatePickerPopup/DatePickerView 的公共 Props

| 属性            | 类型        | 默认值                       | 必填 | 说明                                                                                                                                                                                                                                                                                                         |
| --------------- | ----------- | ---------------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| v-modal         | Date/string |                              | 否   | 选中值                                                                                                                                                                                                                                                                                                       |
| initial-mode    | string      |                              | 否   | 选择的模式，可选 'date', 'time', 'datetime' 等                                                                                                                                                                                                                                                               |
| min-date        | Date        | 当天对应 10 年前的 Date 实例 | 否   | 最小时间对应的 Date 实例（含）                                                                                                                                                                                                                                                                               |
| max-date        | Date        | 当天最后一秒的 Date 实例     | 否   | 最大时间对应的 Date 实例（含）                                                                                                                                                                                                                                                                               |
| format-template | string      |                              | 否   | 格式的模板，如 `YYYY-MM-DD`，模板规则参考 [Dayjs](https://dayjs.fenxianglu.cn/category/parse.html#%E5%AD%97%E7%AC%A6%E4%B8%B2)。设置后 v-model 的绑定变为格式化后的 string 类型，不再是 Date 实例。推荐根据 `initialMode` 选型来确定，如 `initialMode='minute-second'`，则可设置 `formatTemplate='mm分ss秒'` |
| filter          | Function    |                              | 否   | 选项过滤器，`filter(number: number, type: 'year' \| 'month' \| 'day' \| 'hour' \| 'minute' \| 'second') => boolean`                                                                                                                                                                                          |

PS：Date 实例对未设置的前段值采用当前时间补上，后段则采用初始时间，如：initialMode='month-day-hour'下， 选取 5 月 7 日 12 点，则 Date 实例对应的时间为：`Fri May 07 2021 12:00:00 GMT+0800`，设置 `minDate`，`maxDate` 的时候需要考虑到。

### initialMode 的合法值

| 值                                | 说明                                         |
| --------------------------------- | -------------------------------------------- |
| date                              | 日期 (year-month-day)                        |
| time                              | 时间 (hour-minute-second)                    |
| datetime                          | 日期时间 (year-month-day-hour-minute-second) |
| minute-second                     | 分秒                                         |
| hour-minute                       | 时分                                         |
| hour-minute-second                | 时分秒                                       |
| day-hour                          | 天时                                         |
| month-day                         | 月日                                         |
| month-day-hour                    | 月日时                                       |
| month-day-hour-minute             | 月日时分                                     |
| year-month                        | 年月                                         |
| year-month-day                    | 年月日                                       |
| year-month-day-hour               | 年月日时                                     |
| year-month-day-hour-minute        | 年月日时分                                   |
| year-month-day-hour-minute-second | 年月日时分秒                                 |

## DatePicker 时间选择器

- 可以配合 [Form](./Form.md) 和 [FormItem](./Form.md#formitem-表单项) 使用。

## Picker Props

| 属性        | 类型    | 默认值 | 必填 | 说明                                 |
| ----------- | ------- | ------ | ---- | ------------------------------------ |
| name        | string  |        | 否   | [Form](./Form.md) 的标识             |
| placeholder | string  |        | 否   | 没有选中值的提示，也会用在弹窗标题上 |
| disabled    | boolean | false  | 否   | 是否禁用                             |

## Picker Events

| 事件   | 描述                       | 回调函数参数                                                    |
| ------ | -------------------------- | --------------------------------------------------------------- |
| change | 选择后选中值发生变化时触发 | { detail: [DetailObject](./DatePicker.md#detailobject-的结构) } |

### DetailObject 的结构

| 字段       | 类型     | 说明                                                      |
| ---------- | -------- | --------------------------------------------------------- |
| value      | Date     | 选择时间的 Date 实例                                      |
| formatted  | string   | 格式化内容，如果没有设置 `formatTemplate`，则采用内置模板 |
| valueArray | number[] | 选项对应的数组                                            |

## DatePickerPopup 时间选择弹窗

## DatePickerPopup Props

| 属性            | 类型    | 默认值 | 必填 | 说明         |
| --------------- | ------- | ------ | ---- | ------------ |
| v-model:visible | boolean | false  | 否   | 是否显示弹窗 |
| title           | string  |        | 否   | 弹窗标题     |

## DatePickerPopup Events

| 事件                 | 描述                 | 回调函数参数                                                    |
| -------------------- | -------------------- | --------------------------------------------------------------- |
| cancel               | 点击取消按钮后触发   | {}                                                              |
| confirm              | 点击确定按钮后触发   | { detail: [DetailObject](./DatePicker.md#detailobject-的结构) } |
| change               | 选中值发生变化时触发 | { detail: [DetailObject](./DatePicker.md#detailobject-的结构) } |
| visible-state-change | 展示隐藏时触发       | { state: [VisibleState](./DatePicker.md#visiblestate-可选值) }  |

### VisibleState 可选值

| 值     | 说明                 | 备注                                              |
| ------ | -------------------- | ------------------------------------------------- |
| show   | 展示时触发           |                                                   |
| shown  | 展示且动画结束后触发 |                                                   |
| hide   | 隐藏时触发           | 可能携带其他参数 cancel, maskClick, closeClick 等 |
| hidden | 隐藏且动画结束后触发 | 可能携带其他参数 cancel, maskClick, closeClick 等 |

## DatePickerView 时间选择

平铺形式的选择器。

## DatePickerView Events

| 事件   | 描述                       | 回调函数参数                                                    |
| ------ | -------------------------- | --------------------------------------------------------------- |
| change | 滑动后选中值发生变化时触发 | { detail: [DetailObject](./DatePicker.md#detailobject-的结构) } |
