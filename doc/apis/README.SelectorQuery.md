# SelectorQuery

## <a name="createSelectorQuery">Vue.prototype.\$createSelectorQuery()</a>

返回一个 SelectorQuery 对象实例。

### 返回

<a href="#SelectorQuery">SelectorQuery</a> 实例

### 用法

```
const query = this.$createSelectorQuery()
query.select('#id').boundingClientRect()
query.selectViewport().scrollOffset()
query.exec(function(res) {
  res[0].top // #id节点的上边界坐标
  res[1].scrollTop // 显示区域的竖直滚动位置
})
```

## <a name="SelectorQuery">SelectorQuery</a>

查询节点信息的对象。

### SelectorQuery.prototype.in(component)

将选择器的选取范围更改为其他 VueComponent 组件内。

#### 参数

| 参数      | 类型         | 默认值 | 必填 | 说明         |
| --------- | ------------ | ------ | ---- | ------------ |
| component | VueComponent |        | 是   | Vue 组件实例 |

#### 返回

<a href="#SelectorQuery">SelectorQuery</a> 实例

### SelectorQuery.prototype.select(selector)

在当前页面下选择第一个匹配选择器 selector 的节点。返回一个 NodesRef 对象实例，可以用于获取节点信息。

#### 参数

| 参数     | 类型   | 默认值 | 必填 | 说明                          |
| -------- | ------ | ------ | ---- | ----------------------------- |
| selector | string |        | 是   | CSS 选择器。同`querySelector` |

#### 返回

<a href="#NodesRef">NodesRef</a> 实例

#### 用法

```
this.$createSelectorQuery()
  .select('#id')
  .boundingClientRect(function(rect) {
    rect.id // 节点的ID
    rect.dataset // 节点的dataset
    rect.left // 节点的左边界坐标
    rect.right // 节点的右边界坐标
    rect.top // 节点的上边界坐标
    rect.bottom // 节点的下边界坐标
    rect.width // 节点的宽度
    rect.height // 节点的高度
  })
  .exec()
```

### SelectorQuery.prototype.selectAll(selector)

在当前页面下选择匹配选择器 selector 的所有节点。返回一个 NodesRef 对象实例，可以用于获取节点信息。

#### 参数

| 参数     | 类型   | 默认值 | 必填 | 说明                             |
| -------- | ------ | ------ | ---- | -------------------------------- |
| selector | string |        | 是   | CSS 选择器。同`querySelectorAll` |

#### 返回

<a href="#NodesRef">NodesRef</a> 实例

#### 用法

```
this.$createSelectorQuery()
  .selectAll('.a-class')
  .boundingClientRect(function(rects) {
    rects.forEach(function(rect) {
      rect.id // 节点的ID
      rect.dataset // 节点的dataset
      rect.left // 节点的左边界坐标
      rect.right // 节点的右边界坐标
      rect.top // 节点的上边界坐标
      rect.bottom // 节点的下边界坐标
      rect.width // 节点的宽度
      rect.height // 节点的高度
    })
  })
  .exec()
```

### SelectorQuery.prototype.selectViewport()

选择显示区域。可用于获取显示区域的尺寸、滚动位置等信息。返回一个 NodesRef 对象实例，可以用于获取节点信息。

#### 返回

<a href="#NodesRef">NodesRef</a> 实例

#### 用法

```
this.$createSelectorQuery()
  .selectViewport()
  .scrollOffset(function(res) {
    res.id // 节点的ID
    res.dataset // 节点的dataset
    res.scrollLeft // 节点的水平滚动位置
    res.scrollTop // 节点的竖直滚动位置
  })
  .exec()
```

### SelectorQuery.prototype.exec([callback])

执行所有的请求。请求结果按请求次序构成数组，在 callback 的第一个参数中返回。

#### 参数

| 参数     | 类型     | 默认值 | 必填 | 说明     |
| -------- | -------- | ------ | ---- | -------- |
| callback | Function |        | 否   | 回调函数 |

#### 返回

<a href="#NodesRef">NodesRef</a> 实例

## <a name="NodesRef">NodesRef</a>

### NodesRef.prototype.boundingClientRect([callback])

添加节点的布局位置的查询请求。返回 NodesRef 对应的 SelectorQuery。

#### 参数

| 参数     | 类型     | 默认值 | 必填 | 说明                                                                       |
| -------- | -------- | ------ | ---- | -------------------------------------------------------------------------- |
| callback | Function |        | 否   | 回调函数，在执行 mySelectorQuery.exec 方法后，节点信息会在 callback 中返回 |

#### callback 参数 res 的结构

| 参数    | 类型   | 说明             |
| ------- | ------ | ---------------- |
| id      | string | 节点的 ID        |
| dataset | Object | 节点的 dataset   |
| left    | number | 节点的左边界坐标 |
| right   | number | 节点的右边界坐标 |
| top     | number | 节点的上边界坐标 |
| bottom  | number | 节点的下边界坐标 |
| width   | number | 节点的宽度       |
| height  | number | 节点的高度       |

#### 返回

<a href="#SelectorQuery">SelectorQuery</a> 实例

#### 用法

```
this.$createSelectorQuery()
  .selectAll('.a-class')
  .boundingClientRect(function(rects) {
    rects.forEach(function(rect) {
      rect.id // 节点的ID
      rect.dataset // 节点的dataset
      rect.left // 节点的左边界坐标
      rect.right // 节点的右边界坐标
      rect.top // 节点的上边界坐标
      rect.bottom // 节点的下边界坐标
      rect.width // 节点的宽度
      rect.height // 节点的高度
    })
  })
  .exec()
```

### NodesRef.prototype.scrollOffset([callback])

添加节点的滚动位置查询请求。返回 NodesRef 对应的 SelectorQuery。

#### 参数

| 参数     | 类型     | 默认值 | 必填 | 说明                                                                       |
| -------- | -------- | ------ | ---- | -------------------------------------------------------------------------- |
| callback | Function |        | 否   | 回调函数，在执行 mySelectorQuery.exec 方法后，节点信息会在 callback 中返回 |

#### callback 参数 res 的结构

| 参数       | 类型   | 说明               |
| ---------- | ------ | ------------------ |
| id         | string | 节点的 ID          |
| dataset    | Object | 节点的 dataset     |
| scrollLeft | number | 节点的水平滚动位置 |
| scrollTop  | number | 节点的竖直滚动位置 |

### 返回

<a href="#SelectorQuery">SelectorQuery</a> 实例

#### 用法

```
this.$createSelectorQuery()
  .selectViewport()
  .scrollOffset(function(res) {
    res.id // 节点的ID
    res.dataset // 节点的dataset
    res.scrollLeft // 节点的水平滚动位置
    res.scrollTop // 节点的竖直滚动位置
  })
  .exec()
```

### NodesRef.prototype.fields(fields[, callback])

获取节点的相关信息。需要获取的字段在 fields 中指定。返回 NodesRef 对应的 SelectorQuery。

#### 参数

| 参数     | 类型     | 默认值 | 必填 | 说明                                                                       |
| -------- | -------- | ------ | ---- | -------------------------------------------------------------------------- |
| fields   | Object   |        | 是   | 指定获取字段                                                               |
| callback | Function |        | 否   | 回调函数，在执行 mySelectorQuery.exec 方法后，节点信息会在 callback 中返回 |

#### fields 的合法值

| 参数          | 类型     | 默认值 | 必填 | 说明                                           |
| ------------- | -------- | ------ | ---- | ---------------------------------------------- |
| id            | boolean  | false  | 否   | 是否返回节点 id                                |
| dataset       | boolean  | false  | 否   | 是否返回节点 dataset                           |
| rect          | boolean  | false  | 否   | 是否返回节点布局位置（left right top bottom）  |
| size          | boolean  | false  | 否   | 是否返回节点尺寸（width height）               |
| scrollOffset  | boolean  | false  | 否   | 是否返回节点的（scrollLeft scrollTop）         |
| properties    | string[] | []     | 否   | 指定属性名列表，返回节点对应属性名的当前属性值 |
| computedStyle | string[] | []     | 否   | 指定样式名列表，返回节点对应样式名的当前值     |

#### callback 参数 res 的结构

节点的相关信息。

#### 返回

<a href="#SelectorQuery">SelectorQuery</a> 实例

#### 用法

```
this.$createSelectorQuery()
  .select('#id')
  .fields(
    {
      dataset: true,
      size: true,
      scrollOffset: true,
      properties: ['scrollWidth'],
      computedStyle: ['margin', 'backgroundColor']
    },
    function(res) {
      res.dataset // 节点的 dataset
      res.width // 节点的宽度
      res.height // 节点的高度
      res.scrollLeft // 节点的水平滚动位置
      res.scrollTop // 节点的竖直滚动位置
      res.scrollWidth // 节点 scrollWidth 属性的当前值
      // 此处返回指定要返回的样式名
      res.margin
      res.backgroundColor
    }
  )
  .exec()
```
