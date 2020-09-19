# Copy

复制。

PS：

- 这是个包裹组件，本身不带展示效果，怎么展示通过 `slot` 来实现
- 不依赖 Flash，所以在某些老版本浏览器上可能失败

## Props

| 属性 | 类型   | 默认值 | 必填 | 说明           |
| ---- | ------ | ------ | ---- | -------------- |
| text | string |        | 是   | 需要复制的文本 |

## Events

| 事件    | 描述           | 回调函数参数                                        |
| ------- | -------------- | --------------------------------------------------- |
| success | 复制成功时触发 | CustomEvent，其中 event.details.text 为被复制的文本 |
| error   | 复制出错时触发 | CustomEvent，event.details = { errMsg }             |

## Slots

```
<fx-copy :text="'复制的内容'">
  <fx-button>复制</fx-button>
</fx-copy>
```
