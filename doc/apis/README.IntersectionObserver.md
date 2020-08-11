# IntersectionObserver

## <a name="createIntersectionObserver">Vue.prototype.\$createIntersectionObserver([options])</a>

返回一个 IntersectionObserver 对象实例。

### 参数

| 参数    | 类型   | 默认值 | 必填 | 说明 |
| ------- | ------ | ------ | ---- | ---- |
| options | Object |        | 否   | 选项 |

### options 的合法值

| 参数       | 类型     | 默认值 | 必填 | 说明                                                                                                                                   |
| ---------- | -------- | ------ | ---- | -------------------------------------------------------------------------------------------------------------------------------------- |
| 属性       | 类型     | 默认值 | 必填 | 说明                                                                                                                                   | 最低版本 |
| thresholds | number[] | [0]    | 否   | 一个数值数组，包含所有阈值。                                                                                                           |
| observeAll | boolean  | false  | 否   | 是否同时观测多个目标节点（而非一个），如果设为 true ，observe 的 targetSelector 将选中多个节点（注意：同时选中过多节点将影响渲染性能） |

### 返回

<a href="#IntersectionObserver">IntersectionObserver</a> 实例

## <a name="IntersectionObserver">IntersectionObserver</a>

IntersectionObserver 对象，用于推断某些节点是否可以被用户看见、有多大比例可以被用户看见。

### IntersectionObserver.prototype.relativeTo(selector[, margins])

使用选择器指定一个节点，作为参照区域之一。

#### 参数

| 参数     | 类型   | 默认值 | 必填 | 说明                                     |
| -------- | ------ | ------ | ---- | ---------------------------------------- |
| selector | string |        | 是   | CSS 选择器。同`querySelector`参数        |
| margins  | Object |        | 否   | 用来扩展（或收缩）参照节点布局区域的边界 |

#### margins 的合法值

| 参数   | 类型   | 默认值 | 必填 | 说明                 |
| ------ | ------ | ------ | ---- | -------------------- |
| left   | number |        | 否   | 节点布局区域的左边界 |
| right  | number |        | 否   | 节点布局区域的右边界 |
| top    | number |        | 否   | 节点布局区域的上边界 |
| bottom | number |        | 否   | 节点布局区域的下边界 |

#### 返回

<a href="#IntersectionObserver">IntersectionObserver</a> 实例

### IntersectionObserver.prototype.relativeToViewport([margins])

指定页面显示区域作为参照区域之一。

#### 参数

| 参数    | 类型   | 默认值 | 必填 | 说明                                     |
| ------- | ------ | ------ | ---- | ---------------------------------------- |
| margins | Object |        | 否   | 用来扩展（或收缩）参照节点布局区域的边界 |

#### margins 的合法值

| 参数   | 类型   | 默认值 | 必填 | 说明                 |
| ------ | ------ | ------ | ---- | -------------------- |
| left   | number |        | 否   | 节点布局区域的左边界 |
| right  | number |        | 否   | 节点布局区域的右边界 |
| top    | number |        | 否   | 节点布局区域的上边界 |
| bottom | number |        | 否   | 节点布局区域的下边界 |

#### 返回

<a href="#IntersectionObserver">IntersectionObserver</a> 实例

#### 用法

```
this.$createIntersectionObserver()
  .relativeToViewport({ bottom: 100 })
  .observe('.target-class', res => {
    res.intersectionRatio // 相交区域占目标节点的布局区域的比例
    res.intersectionRect // 相交区域
    res.intersectionRect.left // 相交区域的左边界坐标
    res.intersectionRect.top // 相交区域的上边界坐标
    res.intersectionRect.width // 相交区域的宽度
    res.intersectionRect.height // 相交区域的高度
  })
```

### IntersectionObserver.prototype.observe(targetSelector[, callback])

指定目标节点并开始监听相交状态变化情况。

#### 参数

| 参数           | 类型     | 默认值 | 必填 | 说明                              |
| -------------- | -------- | ------ | ---- | --------------------------------- |
| targetSelector | string   |        | 是   | CSS 选择器。同`querySelector`参数 |
| callback       | Function |        | 否   | 监听相交状态变化的回调函数        |

#### callback 参数 res 的结构

| 参数               | 类型   | 说明               |
| ------------------ | ------ | ------------------ |
| intersectionRatio  | number | 相交比例           |
| intersectionRect   | Object | 相交区域的边界     |
| boundingClientRect | Object | 目标边界           |
| relativeRect       | Object | 参照区域的边界     |
| time               | number | 相交检测时的时间戳 |

#### callback 参数 res.intersectionRect 的结构

| 参数   | 类型   | 说明   |
| ------ | ------ | ------ |
| left   | number | 左边界 |
| right  | number | 右边界 |
| top    | number | 上边界 |
| bottom | number | 下边界 |
| width  | number | 宽度   |
| height | number | 高度   |

#### callback 参数 res.boundingClientRect 的结构

| 参数   | 类型   | 说明   |
| ------ | ------ | ------ |
| left   | number | 左边界 |
| right  | number | 右边界 |
| top    | number | 上边界 |
| bottom | number | 下边界 |
| width  | number | 宽度   |
| height | number | 高度   |

#### callback 参数 res.relativeRect 的结构

| 参数   | 类型   | 说明   |
| ------ | ------ | ------ |
| left   | number | 左边界 |
| right  | number | 右边界 |
| top    | number | 上边界 |
| bottom | number | 下边界 |

### IntersectionObserver.prototype.disconnect()

停止监听。回调函数将不再触发。
