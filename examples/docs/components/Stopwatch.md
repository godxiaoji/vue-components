# Stopwatch 秒表

PS：本组件没有指定样式，默认情况下可对文字样式进行自定义。

## Props

| 属性              | 类型    | 默认值 | 必填 | 说明                       |
| ----------------- | ------- | ------ | ---- | -------------------------- |
| show-milliseconds | boolean | true   | 否   | 是否显示毫秒数             |
| thousands         | boolean | true   | 否   | 小时位是否以千分位形式显示 |

## Events

| 事件  | 描述           | 回调函数参数                                                                         |
| ----- | -------------- | ------------------------------------------------------------------------------------ |
| start | 计时启动时触发 | { }                                                                                  |
| stop  | 计时停止时触发 | { }                                                                                  |
| reset | 计时复位时触发 | { detail: CountTime, laps: CountTime[] } detail 周期总时间，laps，周期内所有计次时间 |

### CountTime 的结构

| 字段名             | 类型   | 说明                                        |
| ------------------ | ------ | ------------------------------------------- |
| time               | number | 持续时间                                    |
| days               | string | 天数                                        |
| hours              | string | 小时数（<24），需要跟 days 配合，保留 2 位  |
| fullHours          | string | 小时数，含天数综合，如 '124'，至少保留 2 位 |
| thousandsFullHours | string | 千分位形式的小时数，含天数综合，如 '1,234'  |
| minutes            | string | 分钟数，保留 2 位                           |
| seconds            | string | 秒钟数，保留 2 位                           |
| milliseconds       | string | 毫秒数，保留 3 位                           |

## Methods

| 方法名 | 说明                        | 参数              |
| ------ | --------------------------- | ----------------- |
| start  | 开始计时                    | () => void        |
| stop   | 停止计时                    | () => void        |
| reset  | 复位/重置                   | () => void        |
| lap    | 触发 1 次计次，返回一个周期 | () => CountTime[] |

## Slots

支持自定义风格显示

```
<fx-stopwatch>
  <template #default="countTime">
    {{ countTime.fullHours }}:{{ countTime.minutes }}:{{
        countTime.seconds
    }}.{{ countTime.milliseconds }}
  </template>
</fx-stopwatch>
```
