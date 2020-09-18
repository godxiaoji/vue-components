# Vfox

Vue 组件集合，提供一系列跟小程序组件相似的组件集。

这是个造轮子工程。特点就是在提供较多的组件和 Api 下保持 32k(Gzip)的大小。

## Install

### CDN

```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vfox@0.1.0/dist/index.css"/>
...
<script type="text/javascript" src="path/to/vue.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/vfox@0.1.0/dist/index.js"></script>
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

#### 引入单个组件

```
import Toast from 'vfox/src/components/Toast/Toast.vue'

export default {
  components: {
    Toast
  }
}
```

#### 引入单个接口

```
import { showToast } from 'vfox/src/apis/Toast'

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
