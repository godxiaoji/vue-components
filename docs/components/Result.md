# Result 结果

## Props

| 属性         | 类型    | 默认值 | 必填 | 说明                                                                |
| ------------ | ------- | ------ | ---- | ------------------------------------------------------------------- |
| type         | string  | 'info' | 否   | 类型，对应不同的提示图标，可选 'info', 'warning', 'success', 'fail' |
| title        | string  | ''     | 否   | 标题                                                                |
| description  | string  | ''     | 否   | 小标题，副标题，描述                                                |
| show-back    | boolean | true   | 否   | 是否显示返回按钮                                                    |
| confirm-text | string  | '确定' | 否   | 确认按钮的文字                                                      |
| back-text    | string  | '返回' | 否   | 返回按钮的文字                                                      |

## Slots

### 附加内容（#default）

```
<fx-result
  type="fail"
  title="支付失败"
  description=""
>
  <div class="result-extra">
    在这里可以附加组件元素或者相应的提示文案，样式自定。
  </div>
</fx-result>
```
