# Button

按钮。

## Props

| 属性      | 类型    | 默认值    | 必填 | 说明                                                  |
| --------- | ------- | --------- | ---- | ----------------------------------------------------- |
| size      | string  | 'default' | 否   | 按钮尺寸，可选值：'default' / 'mini' / 'large'        |
| type      | string  | 'default' | 否   | 按钮类型，可选值：'primary' / 'secondary' / 'warning' |
| disabled  | boolean | false     | 否   | 是否禁用                                              |
| loading   | boolean | false     | 否   | 名称前是否带 loading 图标                             |
| form-type | string  |           | 否   | 'submit' / 'reset'                                    |

### size 的合法值

| 值      | 说明                           |
| ------- | ------------------------------ |
| default | 默认大小，高度 32px，文字 14px |
| mini    | 小尺寸，高度 24px，文字 12px   |
| large   | 大尺寸，高度 40px，文字 16px   |

### type 的合法值

| 值        | 说明                            |
| --------- | ------------------------------- |
| primary   | <font color=#09bb07>主要</font> |
| secondary | 次要                            |
| warning   | <font color=#e94f4f>警告</font> |

### form-type 的合法值

| 值     | 说明     |
| ------ | -------- |
| submit | 提交表单 |
| reset  | 重置表单 |

## CSS

| 属性         | 默认值  | 说明           |
| ------------ | ------- | -------------- |
| --icon-color | #000000 | 按钮内图标颜色 |
| --icon-size  | 20px    | 按钮内图标大小 |
