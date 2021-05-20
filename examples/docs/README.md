---
sidebarDepth: 2
---

# 指南

## 介紹

移动端 Vue 3.x 组件库。

### 特性

- 提供 100+ 组件，覆盖移动端各类场景
- 单元测试覆盖
- 支持 Vue 2 和 Vue 3
- 支持按需引入

### 附言

该版本已使用 `Composition API` 和 `Typescript` 重构。

[Demo](https://cdn.fox2.cn/2.x/demo/)

[Docs](https://cdn.fox2.cn/2.x/docs/)

## 安装

### NPM

```
npm i -S vfox@beta
```

## 引入

### 全组件引入

```
import Vfox from 'vfox'
import 'vfox/es/style/index.css'

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
        libraryDirectory: "es",
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
import { Button } from 'vfox/es/Button'
import 'vfox/src/Button/style'

app.use(Button)
```

### API调用

```
import { Toast } from 'vfox'

export default {
  mounted() {
    Toast.showToast({
      title: '成功',
      type: 'success',
      duration: 2000
    })
  }
}
```

## 主题定制

Vfox 的样式是基于 SCSS 开发的，定义了一套默认样式变量，变量可参考 [var.scss](https://github.com/godxiaoji/vfox/blob/beta/src/style/var.scss)。

1. 新建自定义 SCSS 文件 `my-var.scss`，定义一些变量，如：

```
$primary-color: #ff0000;
$warning: #ffff00;
...
```

2. 新建要入口 SCSS 文件 `my-style.scss`，引入自定义变量文件和默认主题文件。

```
@import 'path/to/my-var.scss';
@import 'vfox/src/style/index.scss';
```

3. 更改原来引入的样式文件

`import 'vfox/es/style/index.css'` => `import 'path/to/my-style.scss'`

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
- Collapse 组件 `active-names.sync` -> `v-model:active-names`
