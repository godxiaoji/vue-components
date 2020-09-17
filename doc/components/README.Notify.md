# Notify

消息提示。

## Props

| 属性                       | 类型    | 默认值    | 必填 | 说明                                                                         |
| -------------------------- | ------- | --------- | ---- | ---------------------------------------------------------------------------- |
| visibility/visibility.sync | boolean |           | true | 是否显示                                                                     |
| type                       | string  | 'default' | 否   | 提示类型，可选值：'primary' / 'success' / 'warning' / 'danger'               |
| duration                   | number  | 0         | 否   | 展示时长(单位 ms)，值为 0 时，`notify` 不会消失，在 `visibility.sync` 下生效 |
| backgroundColor            | string  |           | 否   | 指定背景颜色，会覆盖 type 的颜色                                             |
| color                      | string  |           | 否   | 指定字体颜色                                                                 |

### type 的合法值

| 值      | 说明                                |
| ------- | ----------------------------------- |
| primary | <font color=#10aeff>提示</font>     |
| success | <font color=#09bb07>成功</font>     |
| warning | <font color=#ffbe00>警告</font>     |
| danger  | <font color=#f76260>强烈警告</font> |

## Events

| 事件  | 描述         | 回调函数参数                                                                           |
| ----- | ------------ | -------------------------------------------------------------------------------------- |
| close | 被关闭时触发 | CustomEvent，其中 event.details,source = 'activeClose' 主动关闭 / 'autoClose' 自动关闭 |

## Slots

### default

```
<notify>提示内容</notify>
```

支持插入 `Icon` ：

```
<notify type="success">
  <icon type="success"></icon>
  <span>提交成功</span>
</notify>
```
