# Vfox

移动端 Vue 组件集合。

这是个造轮子工程。特点就是在提供较多的组件和 Api 下保持 48k(Gzip)的大小。

## Install

### CDN

```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vfox/dist/index.css"/>
...
<script type="text/javascript" src="path/to/vue.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/vfox/dist/index.js"></script>
```

### Mount

```
npm i vfox -S
```

#### 全局注册

```
import Vue from 'vue'
import Vfox from 'vfox'

// require styles
import 'vfox/dist/index.css'

```

注：由于地区涉及的数据较大，使用`Cascader`组件的地区选择器时，需要额外引入地区数据。

```
import regionData from 'vfox/data/region'

Vfox.addRegionData(regionData)
```

#### 局部注册

```
import 'vfox/dist/index.css'
import { Toast } from 'vfox'

export default {
  components: {
    Toast
  }
}
```

#### 函数调用

```
import 'vfox/dist/index.css'
import { showToast } from 'vfox'

showToast({
  title: '成功',
  icon: 'success',
  duration: 2000
})
```

其中接口`createIntersectionObserver`，`createSelectorQuery`单独使用需要传入组件本身

```
const query = createSelectorQuery().in(this)
const io = createIntersectionObserver(this, options)
```

## Documents

[Components 组件](./doc/README.COMPONENTS.md)

[APIs 接口](./doc/README.APIS.md)
