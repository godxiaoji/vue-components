---
sidebarDepth: 2
---

# 指南

移动端 Vue 组件库。

## 安装

### CDN

```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vfox/dist/index.css"/>
...
<script type="text/javascript" src="path/to/vue.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/vfox/dist/index.js"></script>
```

### NPM

```
npm i vfox -S
```

## 引入

### 全局注册

```
import Vue from 'vue'
import Vfox from 'vfox'

// require styles
import 'vfox/dist/index.css'

```

注：由于地区涉及的数据较大，使用 `Cascader` 、 `PickerView` 和 `Picker` 组件的地区选择器时，需要额外引入地区数据。

```
import regionData from 'vfox/data/region'

Vfox.addRegionData(regionData)
```

### 局部注册

```
import 'vfox/dist/index.css'
import { Toast } from 'vfox'

export default {
  components: {
    Toast
  }
}
```

### 函数调用

```
import 'vfox/dist/index.css'
import { showToast } from 'vfox'

showToast({
  title: '成功',
  type: 'success',
  duration: 2000
})
```
