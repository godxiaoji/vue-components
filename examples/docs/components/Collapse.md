# Collapse 折叠面板

## Collapse Props

| 属性                | 类型     | 默认值 | 必填 | 说明                                                                |
| ------------------- | -------- | ------ | ---- | ------------------------------------------------------------------- |
| v-model:activeNames | string[] | []     | 否   | 当前展开面板的 `name` 列表，需要每个 `CollapseItem` 都设置上 `name` |
| accordion           | boolean  | false  | 否   | 是否开启手风琴模式                                                  |

## Collapse Events

| 事件   | 描述           | 回调函数参数                             |
| ------ | -------------- | ---------------------------------------- |
| change | 切换面板时触发 | activeNames: 类型与 v-model 绑定的值一致 |

## Collapse Slots

### 默认（#default）

注：其中只可放置 [CollapseItem](./Collapse.md#collapseitem-折叠面板子项) 组件，否则会导致未定义的行为。

```
<fx-collapse>
  <fx-collapse-item title="标题1" name="row1">
    <div class="pad">
    代码是写出来给人看的，附带能在机器上运行
    </div>
  </fx-collapse-item>
  <fx-collapse-item title="标题2" name="row2">
    <div class="pad">
    代码是写出来给人看的，附带能在机器上运行
    </div>
  </fx-collapse-item>
  <fx-collapse-item title="标题3" name="row3">
    <div class="pad">
    代码是写出来给人看的，附带能在机器上运行
    </div>
  </fx-collapse-item>
</fx-collapse>
```

## CollapseItem 折叠面板子项

## CollapseItem Props

| 属性     | 类型    | 默认值 | 必填 | 说明                                            |
| -------- | ------- | ------ | ---- | ----------------------------------------------- |
| title    | string  | ''     | 否   | 面板子项标题                                    |
| icon     | string  |        | 否   | 面板子项标题前图标，使用 [Icon](./Icon.md) 组件 |
| name     | string  |        | 否   | 唯一标识，设置后可以配合 `v-model` 使用         |
| disabled | boolean | false  | 否   | 是否禁用                                        |

## CollapseItem Events

| 事件   | 描述                    | 回调函数参数                                               |
| ------ | ----------------------- | ---------------------------------------------------------- |
| toggle | 面板子项展开/收起时触发 | {spread: boolean}，其中 spread=true 展开/spread=false 收起 |
