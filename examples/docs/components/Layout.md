# Layout 布局

基于 Flex 栅格化系统，利用 Row 和列 Col 来定义信息区块的外部框架，以保证页面的每个区域能够稳健地排布起来。

## Row Props

| 属性    | 类型            | 默认值  | 必填 | 说明                                                                                        |
| ------- | --------------- | ------- | ---- | ------------------------------------------------------------------------------------------- |
| gutter  | number/number[] | 0       | 否   | 栅格间隔，通过数值设置水平间隔，也可以通过数组的形式设置水平和垂直间隔 [水平间隔, 垂直间隔] |
| justify | string          | 'start' | 否   | 水平排列方式，可选值：'start' / 'end' / 'center' / 'space-around' / 'space-between'         |
| align   | string          | 'top'   | 否   | 水平排列方式，可选值：'top' / 'middle' / 'bottom'                                           |

## Row Slots

```
<fx-row :gutter="10">
  <fx-col :span="24">Layout</fx-col>
</fx-row>
```

## Col Props

| 属性    | 类型            | 默认值  | 必填 | 说明                                                                                        |
| ------- | --------------- | ------- | ---- | ------------------------------------------------------------------------------------------- |
| gutter  | number/number[] | 0       | 否   | 栅格间隔，通过数值设置水平间隔，也可以通过数组的形式设置水平和垂直间隔 [水平间隔, 垂直间隔] |
| justify | string          | 'start' | 否   | 水平排列方式，可选值：'start' / 'end' / 'center' / 'space-around' / 'space-between'         |
| align   | string          | 'top'   | 否   | 水平排列方式，可选值：'top' / 'middle' / 'bottom'                                           |

## Col Slots

```
<fx-row :gutter="10">
  <fx-col :span="24">Layout</fx-col>
</fx-row>
```
