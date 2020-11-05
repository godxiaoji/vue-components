# Modal

模态框。

## Props

| 属性          | 类型    | 默认值 | 必填 | 说明                     |
| ------------- | ------- | ------ | ---- | ------------------------ |
| visible.sync  | boolean | false  | 否   | 是否显示                 |
| width         | string  |        | 否   | 模态框的宽度             |
| mask-closable | boolean | false  | 否   | 点击蒙层是否触发关闭操作 |
| show-close    | boolean | true   | 否   | 是否显示关闭按钮         |

## Events

| 事件   | 描述                 | 回调函数参数 |
| ------ | -------------------- | ------------ |
| show   | 展示时触发           | {}           |
| shown  | 展示且动画结束后触发 | {}           |
| hide   | 隐藏时触发           | {}           |
| hidden | 隐藏且动画结束后触发 | {}           |

## Slots

### 默认内容

```
<fx-modal>
  提示内容
  ...
</fx-modal>
```

### 头部

```
<fx-modal>
  <template #header>标题</template>
</fx-modal>
```

### 尾部

```
<fx-modal>
  <template #footer>
    <fx-button type="primary">
      确定
    </fx-button>
  </template>
</fx-modal>
```
