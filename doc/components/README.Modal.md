# Modal

模态框。

## Props

| 属性          | 类型    | 默认值 | 必填 | 说明                     |
| ------------- | ------- | ------ | ---- | ------------------------ |
| visible.sync  | boolean | false  | 否   | 是否显示                 |
| title         | string  |        | 否   | 提示的标题               |
| mask-closable | boolean | false  | 否   | 点击蒙层是否触发关闭操作 |
| show-close    | boolean | true   | 否   | 是否显示关闭按钮         |

## Events

| 事件  | 描述         | 回调函数参数 |
| ----- | ------------ | ------------ |
| close | 被关闭时触发 | CustomEvent  |

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
