# VueComponents

Vue 组件集合，提供一系列跟小程序组件相似的组件集。

这是个造轮子工程。特点就是在提供较多的组件和 Api 下保持 32k(Gzip)的大小。

## Install

### CDN

```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@godxiaoji/vue-components@1.2.5/dist/index.css"/>
...
<script type="text/javascript" src="path/to/vue.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@godxiaoji/vue-components@1.2.5/dist/index.js"></script>
```

### Mount

```
npm i @godxiaoji/vue-components -S
```

#### 全局注册

```
import Vue from 'vue'
import VueComponents from '@godxiaoji/vue-components'

// require styles
import '@godxiaoji/vue-components/dist/index.css'

```

#### 引入单个组件

```
import Toast from '@godxiaoji/vue-components/src/components/Toast/Toast.vue'

export default {
  components: {
    Toast
  }
}
```

#### 引入单个接口

```
import { showToast } from '@godxiaoji/vue-components/src/apis/Toast'

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
