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

| 值            | 说明                                                                |
| ------------- | ------------------------------------------------------------------- |
| DustRed       | <font color=#ff4d4f>背景色</font> <font color=#ffffff>前景色</font> |
| Volcano       | <font color=#ff7a45>背景色</font> <font color=#ffffff>前景色</font> |
| SunsetOrange  | <font color=#fa8c16>背景色</font> <font color=#ffffff>前景色</font> |
| CalendulaGold | <font color=#faad14>背景色</font> <font color=#ffffff>前景色</font> |
| SunriseYellow | <font color=#fadb14>背景色</font> <font color=#262626>前景色</font> |
| Lime          | <font color=#a0d911>背景色</font> <font color=#ffffff>前景色</font> |
| PolarGreen    | <font color=#52c41a>背景色</font> <font color=#ffffff>前景色</font> |
| Cyan          | <font color=#36cfc9>背景色</font> <font color=#ffffff>前景色</font> |
| DaybreakBlue  | <font color=#1890ff>背景色</font> <font color=#ffffff>前景色</font> |
| GeekBlue      | <font color=#597ef7>背景色</font> <font color=#ffffff>前景色</font> |
| GoldenPurple  | <font color=#9254de>背景色</font> <font color=#ffffff>前景色</font> |
| Magenta       | <font color=#f759ab>背景色</font> <font color=#ffffff>前景色</font> |

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
| total-count        | number        |          | 否   | 尾部显示头像数，如果数值过高，会对数值简化处理，如 1.1w       |
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
