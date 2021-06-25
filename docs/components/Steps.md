# Steps 步骤条

## Steps Props

| 属性                 | 类型    | 默认值 | 必填 | 说明                 |
| -------------------- | ------- | ------ | ---- | -------------------- |
| v-model:active-index | number  | 0      | 否   | 当前步骤对应的索引值 |
| dot                  | boolean | false  | 否   | 是否开启小点样式     |

## Steps CSS

| 属性                 | 默认值  | 说明           |
| -------------------- | ------- | -------------- |
| --steps-color        | #8c8c8c | 步骤条默认颜色 |
| --steps-active-color | #1890ff | 步骤条激活颜色 |

## Steps Slots

### 默认（#default）

注：其中只可放置 [Step](./Steps.md#step-步骤子项) 组件，否则会导致未定义的行为。

```
<fx-steps>
  <fx-step title="成功获得0.01元收益">搞半天就这点？</fx-step>
  <fx-step title="十天后到账">0.01元还要十天到账？</fx-step>
  <fx-step title="爱要不要">不要了，滚。</fx-step>
</fx-steps>
```

## Step 步骤子项

## Step Props

| 属性  | 类型   | 默认值 | 必填 | 说明         |
| ----- | ------ | ------ | ---- | ------------ |
| title | string |        | 否   | 步骤子项标题 |

## Step CSS

| 属性                | 默认值  | 说明                                                          |
| ------------------- | ------- | ------------------------------------------------------------- |
| --step-color        | #8c8c8c | 步骤条默认颜色，不设置继承 [Steps](./Steps.md#steps-css) 组件 |
| --step-active-color | #1890ff | 步骤条激活颜色，不设置继承 [Steps](./Steps.md#steps-css) 组件 |

## Step Slots

### 内容（#default）

```
<fx-step title="标题">
  自定义内容
</fx-step>
```

### 标题（#title）

```
<fx-step>
  <template #title>
  【珠海市】【珠海一部】快递小哥正在派件（<a href="tel:10000">10000</a>）
  </template>
  2021-04-13 11:22:16
</fx-step>
```

PS：优先级高于 Props `title`。

### 步骤标（#step）

```
<fx-step>
  <template #step="{ finish, index, active }">
    <fx-icon v-if="finish" icon="CheckOutlined"></fx-icon>
  </template>
</fx-step>
```

PS：只推荐写入 text 和 [Icon](./Icon.md) 组件，其他元素或组件可能会导致未定义的行为。
