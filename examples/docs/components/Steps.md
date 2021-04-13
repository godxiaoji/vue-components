# Steps 步骤条

## Steps Props

| 属性                 | 类型    | 默认值 | 必填 | 说明                 |
| -------------------- | ------- | ------ | ---- | -------------------- |
| v-model:active-index | number  | 0      | 否   | 当前步骤对应的索引值 |
| dot                  | boolean | false  | 否   | 是否开启小点样式     |

## Steps CSS

| 属性                 | 默认值                               | 说明           |
| -------------------- | ------------------------------------ | -------------- |
| --steps-color        | <font color="#8c8c8c">#8c8c8c</font> | 步骤条默认颜色 |
| --steps-active-color | <font color="#1890ff">#1890ff</font> | 步骤条激活颜色 |

## Steps Slots

### 默认（#default）

注：其中只可放置 [Step](./Steps.md#step-步骤子项) 组件，否则会导致未定义的行为。

```
<fx-steps v-model:activeIndex="activeIndex">
  <fx-step title="成功获得0.01元收益" content="搞半天就这点？"></fx-step>
  <fx-step title="十天后到账" content="0.01元还要十天到账？"></fx-step>
  <fx-step title="爱要不要" content="不要了，滚。"></fx-step>
</fx-steps>
```

## Step 步骤子项

## Step Props

| 属性        | 类型   | 默认值 | 必填 | 说明                                            |
| ----------- | ------ | ------ | ---- | ----------------------------------------------- |
| title       | string | ''     | 否   | 步骤子项标题                                    |
| content     | string | ''     | 否   | 步骤子项内容                                    |
| icon        | string |        | 否   | 步骤节点图标，使用 [Icon](./Icon.md) 组件       |
| finish-icon | string |        | 否   | 已完成步骤节点图标，使用 [Icon](./Icon.md) 组件 |
| active-icon | string |        | 否   | 当前步骤节点图标，使用 [Icon](./Icon.md) 组件   |

## Step CSS

| 属性                | 默认值                               | 说明                                                          |
| ------------------- | ------------------------------------ | ------------------------------------------------------------- |
| --step-color        | <font color="#8c8c8c">#8c8c8c</font> | 步骤条默认颜色，不设置继承 [Steps](./Steps.md#steps-css) 组件 |
| --step-active-color | <font color="#1890ff">#1890ff</font> | 步骤条激活颜色，不设置继承 [Steps](./Steps.md#steps-css) 组件 |

## Step Slots

### 内容（#default）

```
<fx-step title="标题">
  自定义内容
</fx-step>
```

PS：优先级高于 Props `content`。

### 标题（#title）

```
<fx-step content="2021-04-13 11:22:16">
  <template #title>
  【珠海市】【珠海一部】快递小哥正在派件（<a href="tel:10000">10000</a>）
  </template>
</fx-step>
```

PS：优先级高于 Props `title`。
