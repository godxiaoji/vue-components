# Empty 空状态

## Props

| 属性        | 类型   | 默认值    | 必填 | 说明                                                      |
| ----------- | ------ | --------- | ---- | --------------------------------------------------------- |
| description | string |           | 否   | 描述文字                                                  |
| type        | string | 'default' | 否   | 图片类型，可选 'default' / 'error' / 'network' / 'search' |

## CSS

| 属性               | 默认值  | 说明   |
| ------------------ | ------- | ------ |
| --empty-font-color | #8c8c8c | 文本色 |

## Slots

### 底部（#default）

```
<fx-empty description="网络错误" type="network">
  <fx-button>刷新试试</fx-button>
</fx-empty>
```

### 图片区域（image）

```
<fx-empty description="描述文字">
  <template #image>
    <fx-image src="xxx.jpg" />
  </template>
</fx-empty>
```

注：设置了该 `slot` 则不展示内置图片
