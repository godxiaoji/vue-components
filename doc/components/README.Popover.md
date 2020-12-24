# Popover/PopDialog/PopMenu

气泡。

## 公共 Props

| 属性         | 类型           | 默认值   | 必填 | 说明                                                                              |
| ------------ | -------------- | -------- | ---- | --------------------------------------------------------------------------------- |
| visible.sync | boolean        | false    | 否   | 是否显示                                                                          |
| selector     | string/element |          | 是   | 从哪个元素展开，如果是 string，则为可以被 document.querySelector(selector) 获取到 |
| placement    | string         | 'bottom' | 否   | 展开位置，可选 'bottom', 'top', 'left', 'right'                                   |
| show-mask    | boolean        | true     | 否   | 是否展示蒙层，如果设置不展示，气泡则是跟随 `selector` 对应的元素                  |

## Events

| 事件   | 描述                 | 回调函数参数 |
| ------ | -------------------- | ------------ |
| show   | 展示时触发           | {}           |
| shown  | 展示且动画结束后触发 | {}           |
| hide   | 隐藏时触发           | {}           |
| hidden | 隐藏且动画结束后触发 | {}           |

# <a name="Popover">Popover 组件</a>

气泡内容。

## 独有 Props

| 属性    | 类型   | 默认值 | 必填 | 说明                                      |
| ------- | ------ | ------ | ---- | ----------------------------------------- |
| content | string |        | 否   | 展示文本，如设置了 `slot`，则不使用该字段 |

## Slots

```
<fx-popover>
  自定义内容
</fx-popover>
```

# <a name="PopDialog">PopDialog 组件</a>

气泡对话框。

## 独有 Props

| 属性         | 类型    | 默认值 | 必填 | 说明             |
| ------------ | ------- | ------ | ---- | ---------------- |
| content      | string  |        | 是   | 文本内容         |
| show-cancel  | boolean | true   | 否   | 是否显示取消按钮 |
| cancel-text  | string  | '取消' | 否   | 取消按钮的文本   |
| confirm-text | string  | '确定' | 否   | 确定按钮的文本   |

## Events

| 事件    | 描述               | 回调函数参数                     |
| ------- | ------------------ | -------------------------------- |
| cancel  | 取消按钮点击时触发 | { confirm: false, cancel: true } |
| confirm | 确认按钮点击时触发 | { confirm: true, cancel: false } |

# <a name="PopMenu">PopMenu 组件</a>

气泡菜单。

## Props

| 属性    | 类型  | 默认值 | 必填 | 说明     |
| ------- | ----- | ------ | ---- | -------- |
| options | array |        | 否   | 选项列表 |

### options 的结构

| options[index] 值 | 类型   | 默认值 | 必填 | 说明     |
| ----------------- | ------ | ------ | ---- | -------- |
| name              | string |        | 是   | 选项名   |
| disabled          | string | false  | 否   | 是否禁用 |
| icon              | string |        | 否   | 图标     |

```
[
  {
    name: '选项1',
    disabled: false,
    icon: 'MenuOutlined'
  }
]
```

## Events

| 事件   | 描述               | 回调函数参数                       |
| ------ | ------------------ | ---------------------------------- |
| select | 确认按钮点击时触发 | detail: {item: any: index: number} |

### select 回调参数的 detail 结构

| 值    | 类型   | 说明                  |
| ----- | ------ | --------------------- |
| item  | any    | options[index] 的副本 |
| index | number | 索引                  |
