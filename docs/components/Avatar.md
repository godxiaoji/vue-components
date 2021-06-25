# Avatar 头像

## Avatar Props

| 属性        | 类型                 | 默认值   | 必填 | 说明                                                                   |
| ----------- | -------------------- | -------- | ---- | ---------------------------------------------------------------------- |
| src         | string               |          | 否   | 图片连接，显示自定义图片                                               |
| size        | string/number        | 'middle' | 否   | 头像尺寸，处除了预设值，还支持传入 number                              |
| color-style | string               |          | 否   | 色彩风格                                                               |
| shape       | string               | 'circle' | 否   | 头像形状                                                               |
| badge       | string/number/object |          | 否   | 徽标，使用 [Badge](./Badge.md) 组件，可传入一个基于 Badge props 的对象 |
| gender      | string               |          | 否   | 显示男女角标，优先级高于 badge                                         |

### size 的合法值

| 值     | 说明                                            |
| ------ | ----------------------------------------------- |
| large  | 大尺寸，宽高 64px，文字 32px，图标 43px         |
| middle | 默认值，中尺寸，宽高 48px，文字 24px，图标 32px |
| large  | 小尺寸，宽高 36px，文字 18px，图标 21px         |

### color-style 的合法值

| 值            | 说明   |
| ------------- | ------ |
| DustRed       | 前景色 |
| Volcano       | 前景色 |
| SunsetOrange  | 前景色 |
| CalendulaGold | 前景色 |
| SunriseYellow | 前景色 |
| Lime          | 前景色 |
| PolarGreen    | 前景色 |
| Cyan          | 前景色 |
| DaybreakBlue  | 前景色 |
| GeekBlue      | 前景色 |
| GoldenPurple  | 前景色 |
| Magenta       | 前景色 |

### shape 的合法值

| 值     | 说明         |
| ------ | ------------ |
| circle | 圆形头像     |
| square | 圆角方形头像 |

## Avatar Slots

### 默认（#default）

```
<fx-avatar>曹</fx-avatar>
```

## AvatarGroup 头像组

## AvatarGroup Props

| 属性              | 类型          | 默认值   | 必填 | 说明                                                          |
| ----------------- | ------------- | -------- | ---- | ------------------------------------------------------------- |
| size              | string/number | 'middle' | 否   | 组内头像尺寸，处除了预设值，还支持传入 number                 |
| total-count       | number        |          | 否   | 尾部显示头像数，如果数值过高，会对数值简化处理，如 1.1w       |
| count-color-style | string        |          | 否   | 头像数色彩风格，同 [Avatar](./Avatar.md#color-style-的合法值) |

## AvatarGroup Slots

### 默认（#default）

注：其中只可放置 [Avatar](./Collapse.md#avatar-头像) 组件，否则会导致未定义的行为。

```
<fx-avatar-group>
  <fx-avatar src="https://cdn.fox2.cn/vfox/avatar/5.png" />
  <fx-avatar src="https://cdn.fox2.cn/vfox/avatar/6.png" />
  <fx-avatar src="https://cdn.fox2.cn/vfox/avatar/7.png" />
</fx-avatar-group>
```
