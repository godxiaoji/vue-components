# Badge

徽标数/角标数。

PS：

- 这是个包裹组件，需要 `slot` 中提供被挂在的内容

## Props

| 属性      | 类型     | 默认值 | 必填 | 说明                  |
| --------- | -------- | ------ | ---- | --------------------- |
| count     | number   | 0      | 否   | 消息条数              |
| max-count | number   | 99     | 否   | 最大完全显示消息条数  |
| dot       | boolean  | false  | 否   | 是否显示为小红点      |
| show-zero | boolean  | false  | 否   | 消息数为 0 时是否显示 |
| offset    | number[] | [0, 0] | 否   | 偏移量，格式为 [x, y] |

## Slots

```
<fx-badge :count="1" show-zero>
  <fx-button>badge</fx-button>
</fx-badge>
```
