---
sidebarDepth: 2
---

# 指南

## 介紹

移动端 Vue 2.x 组件库。

### 特性

- 提供 60+ 组件，覆盖移动端各类场景
- 单元测试覆盖
- 支持 Vue 2 和 Vue 3
- 支持按需引入

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

### 全组件引入

```
import Vfox from 'vfox'
import 'vfox/dist/index.css'

Vue.use(Vfox)
```

### 自动按需引入组件

使用 ant 团队提供的 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式。

```
npm i babel-plugin-import -D
```

在 `babel.config.js` 中配置：

```
module.exports = {
  ...
  plugins: [
    [
      "import",
      {
        libraryName: "vfox",
        libraryDirectory: "src",
        style: true,
        camel2DashComponentName: false
      },
      "vfox"
    ]
  ]
}
```

在业务代码中引入 `Vfox` 组件：

```
import { Button } from 'vfox'

Vue.use(Button)
```

### 手动按需引入组件

在不使用插件的情况下，可以手动引入需要的组件。

```
import { Button } from 'vfox/src/Button'
import 'vfox/src/Button/style'

Vue.use(Button)
```

### 函数调用

```
import { Toast } from 'vfox'

Vue.use(Toast)

export default {
  mounted() {
    this.$showToast({
      title: '成功',
      type: 'success',
      duration: 2000
    })
  }
}
```
