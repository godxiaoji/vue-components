# Skeleton

骨架屏。

## SkeletonProps

| 属性          | 类型    | 默认值    | 必填 | 说明                                        |
| ------------- | ------- | --------- | ---- | ------------------------------------------- |
| loading       | boolean | true      | 否   | 是否显示骨架屏，传 false 时会展示子组件内容 |
| avatar        | boolean | false     | 否   | 是否显示头像占位图                          |
| animated      | boolean | false     | 否   | 是否开启动画                                |
| avatar-shape  | string  | 'default' | 否   | 可选 'default', 'circle'                    |
| button-shape  | string  | 'default' | 否   | 可选 'default', 'round', 'circle'           |
| paragraph-row | number  | 3         | 否   | 段落占位图行数                              |

## SkeletonSlots

### 内容（default）

```
<fx-skeleton>
  <div>详情...</div>
</fx-skeleton>
```

注：vue 要求组件只有一个 root，建议默认`slot`内容包裹在一个标签中，不然会被加一个包裹标签，可能会导致展示效果不符合预期。

### 骨架屏重新布局（layout）

还可以在 layout 插槽中重新组合骨架屏，目前提供 `image`、`avatar`、`title`、`paragraph`、`button` 5 款子组件。

```
<fx-skeleton>
  <template #layout>
    <fx-skeleton-image></fx-skeleton-image>
    <fx-skeleton-title></fx-skeleton-title>
    <fx-skeleton-paragraph></fx-skeleton-paragraph>
  </template>
  <div>详情...</div>
</fx-skeleton>
```

## SkeletonAvatarProps

| 属性     | 类型    | 默认值    | 必填 | 说明                                     |
| -------- | ------- | --------- | ---- | ---------------------------------------- |
| shape    | string  | 'default' | 否   | 可选 'default', 'circle'                 |
| animated | boolean | false     | 否   | 是否开启动画，仅在单独使用头像骨架时生效 |

## SkeletonImageProps

| 属性     | 类型    | 默认值 | 必填 | 说明                                     |
| -------- | ------- | ------ | ---- | ---------------------------------------- |
| animated | boolean | false  | 否   | 是否开启动画，仅在单独使用头像骨架时生效 |

## SkeletonTitleProps

| 属性     | 类型    | 默认值 | 必填 | 说明                                     |
| -------- | ------- | ------ | ---- | ---------------------------------------- |
| animated | boolean | false  | 否   | 是否开启动画，仅在单独使用头像骨架时生效 |

## SkeletonParagraphProps

| 属性     | 类型    | 默认值 | 必填 | 说明                                     |
| -------- | ------- | ------ | ---- | ---------------------------------------- |
| row      | number  | 3      | 否   | 段落占位图行数                           |
| animated | boolean | false  | 否   | 是否开启动画，仅在单独使用头像骨架时生效 |

## SkeletonButtonProps

| 属性     | 类型    | 默认值    | 必填 | 说明                                     |
| -------- | ------- | --------- | ---- | ---------------------------------------- |
| shape    | string  | 'default' | 否   | 可选 'default', 'round', 'circle'        |
| animated | boolean | false     | 否   | 是否开启动画，仅在单独使用头像骨架时生效 |
