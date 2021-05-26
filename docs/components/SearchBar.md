# SearchBar 搜索栏

- 该组件本身没有固定顶部功能，可以配合 [Sticky](./Sticky.md) 组件实现置顶功能。

## Props

| 属性                 | 类型            | 默认值 | 必填 | 说明                                                        |
| -------------------- | --------------- | ------ | ---- | ----------------------------------------------------------- |
| placeholders         | string/string[] |        | 否   | 设置候选值列表，多个时轮询显示                              |
| placeholder-interval | number          | 5000   | 否   | placeholder 切换时间，placeholders 有多个时生效             |
| ghost                | boolean         | false  | 否   | 是否开启反色模式，开始后适用于深色底色，通过 CSS 设置背景色 |
| readonly             | boolean         | false  | 否   | 是否只读模式，开启后主要用于搜索入口场景                    |
| maxlength            | number          | 100    | 否   | 最大长度                                                    |
| focus                | boolean         | false  | 否   | 加载时是否获取焦点                                          |
| show-cancel          | boolean         | false  | 否   | 是否展示取消按钮                                            |

## Events

| 事件   | 描述                                             | 回调函数参数                                            |
| ------ | ------------------------------------------------ | ------------------------------------------------------- |
| input  | 输入值改变时触发，包括 clear 的                  | ({ text: string }, setSuggestList: suggestList => void) |
| focus  | 输入框获取焦点时触发                             | ({ text: string }, setSuggestList: suggestList => void) |
| blur   | 输入框移出焦点时触发                             | ({ text: string }, setSuggestList: suggestList => void) |
| cancel | 取消按钮点击                                     | ({})                                                    |
| click  | 输入框点击，配合 readonly 使用，获取到当前候选值 | ({ searchText: string})                                 |

### setSuggestList 的参数 suggestList 结构

```
['suggest A', 'suggest B']
```

或者

```
[{
  text: '油烟机',
  tags: ['厨房', '电器']
}]
```
