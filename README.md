# Vfox

## 介紹

移动端 Vue 3.x 组件库。

### 特性

- 提供 60+ 组件，覆盖移动端各类场景
- 单元测试覆盖
- 支持 Vue 2 和 Vue 3
- 支持按需引入

### 附言

由于是从 v1 版本快速适配过来的，目前还是基于 `Template` 和 `Option API`，会在后续版本改造为 `Composition API` 和 支持 `Typescipt`。

[Demo](https://cdn.fox2.cn/vfox/)

[Docs](https://cdn.fox2.cn/vfox-docs/)

## 安装

### NPM

```
npm i -S vfox@beta
```

## 引入

### 全组件引入

```
import Vfox from 'vfox'
import 'vfox/dist/index.css'

app.use(Vfox)
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

app.use(Button)
```

### 手动按需引入组件

在不使用插件的情况下，可以手动引入需要的组件。

```
import { Button } from 'vfox/src/Button'
import 'vfox/src/Button/style'

app.use(Button)
```

### 函数调用

```
import { Toast } from 'vfox'

app.use(Toast)

// app 内的子组件可以直接调用 $showToast 等方法

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

## 从 v1（基于 Vue2）版本升级

### 升级 Vue 3

升级问题请查看 [Vue3 文档](https://v3.vuejs.org/guide/introduction.html)。

### 不兼容更新

#### 弹窗组件 visible 字段变更

由原来的 `visible.sync` 变更为 `v-model:visible`，涉及组件：

- ActionSheet
- CalendarPopup
- Dialog
- Drawer
- Dropdown
- ImagePreview
- Modal
- NoticeBar
- Notify
- PickerPopup
- PopDialog
- PopMenu
- Popover
- Toast

#### 其他涉及 .sync、v-model 字段的变更

- Tab/TabBar 组件 `active-value.sync` -> `v-model:active-value`
- Swiper/Sticky 组件 `active-index.sync` -> `v-model:active-index`
- Radio/Checkbox 组件 `v-model` -> `v-model:checked`
- ImagePreview 组件 `current.sync` -> `v-model:current`
- Collapse 组件 `active-names.syc` -> `v-model:active-names`
