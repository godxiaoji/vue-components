# Vfox

移动端 Vue 组件库。

[Demo](https://cdn.fox2.cn/vfox/)

[Docs](https://cdn.fox2.cn/vfox-docs/)

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
import Vue from 'vue'
import Vfox from 'vfox'
import 'vfox/dist/index.css'

Vue.use(Vfox)

```

注：由于地区涉及的数据较大，使用 `Cascader` 、 `PickerView` 和 `Picker` 组件的地区选择器时，需要额外引入地区数据。

```
import regionData from 'vfox/data/region'

Vfox.addRegionData(regionData)
```

### 自动按需引入组件

使用 antV 团队提供的 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式。

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
import Vue from 'vue'
import { Button } from 'vfox'

Vue.use(Button)
```

### 手动按需引入组件

在不使用插件的情况下，可以手动引入需要的组件。

```
import Vue from 'vue'
import { Button } from 'vfox/src/Button'
import 'vfox/src/Button/style'

Vue.use(Button)
```

### 函数调用

```
import Vue from 'vue';
import { Toast } from 'vfox';

...
this.$showToast({
  title: '成功',
  type: 'success',
  duration: 2000
})
```
