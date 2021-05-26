(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{526:function(t,a,e){"use strict";e.r(a);var s=e(49),r=Object(s.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"指南"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#指南"}},[t._v("#")]),t._v(" 指南")]),t._v(" "),e("h2",{attrs:{id:"介紹"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#介紹"}},[t._v("#")]),t._v(" 介紹")]),t._v(" "),e("p",[t._v("移动端 Vue 3.x 组件库。")]),t._v(" "),e("h3",{attrs:{id:"特性"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#特性"}},[t._v("#")]),t._v(" 特性")]),t._v(" "),e("ul",[e("li",[t._v("提供 100+ 组件，覆盖移动端各类场景")]),t._v(" "),e("li",[t._v("单元测试覆盖")]),t._v(" "),e("li",[t._v("支持 Vue 2 和 Vue 3")]),t._v(" "),e("li",[t._v("支持按需引入")])]),t._v(" "),e("h3",{attrs:{id:"附言"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#附言"}},[t._v("#")]),t._v(" 附言")]),t._v(" "),e("p",[t._v("该版本已使用 "),e("code",[t._v("Composition API")]),t._v(" 和 "),e("code",[t._v("Typescript")]),t._v(" 重构。")]),t._v(" "),e("p",[e("a",{attrs:{href:"https://cdn.fox2.cn/2.x/demo/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Demo"),e("OutboundLink")],1)]),t._v(" "),e("p",[e("a",{attrs:{href:"https://godxiaoji.github.io/vfox/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Docs"),e("OutboundLink")],1)]),t._v(" "),e("h2",{attrs:{id:"安装"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[t._v("#")]),t._v(" 安装")]),t._v(" "),e("h3",{attrs:{id:"npm"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#npm"}},[t._v("#")]),t._v(" NPM")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("npm i -S vfox@beta\n")])])]),e("h2",{attrs:{id:"引入"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#引入"}},[t._v("#")]),t._v(" 引入")]),t._v(" "),e("h3",{attrs:{id:"全组件引入"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#全组件引入"}},[t._v("#")]),t._v(" 全组件引入")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("import Vfox from 'vfox'\nimport 'vfox/es/style/index.css'\n\napp.use(Vfox)\n")])])]),e("h3",{attrs:{id:"自动按需引入组件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#自动按需引入组件"}},[t._v("#")]),t._v(" 自动按需引入组件")]),t._v(" "),e("p",[t._v("使用 ant 团队提供的 "),e("a",{attrs:{href:"https://github.com/ant-design/babel-plugin-import",target:"_blank",rel:"noopener noreferrer"}},[t._v("babel-plugin-import"),e("OutboundLink")],1),t._v(" babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式。")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("npm i babel-plugin-import -D\n")])])]),e("p",[t._v("在 "),e("code",[t._v("babel.config.js")]),t._v(" 中配置：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('module.exports = {\n  ...\n  plugins: [\n    [\n      "import",\n      {\n        libraryName: "vfox",\n        libraryDirectory: "es",\n        style: true,\n        camel2DashComponentName: false\n      },\n      "vfox"\n    ]\n  ]\n}\n')])])]),e("p",[t._v("在业务代码中引入 "),e("code",[t._v("Vfox")]),t._v(" 组件：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("import { Button } from 'vfox'\n\napp.use(Button)\n")])])]),e("h3",{attrs:{id:"手动按需引入组件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#手动按需引入组件"}},[t._v("#")]),t._v(" 手动按需引入组件")]),t._v(" "),e("p",[t._v("在不使用插件的情况下，可以手动引入需要的组件。")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("import { Button } from 'vfox/es/Button'\nimport 'vfox/src/Button/style'\n\napp.use(Button)\n")])])]),e("h3",{attrs:{id:"api调用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#api调用"}},[t._v("#")]),t._v(" API调用")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("import { Toast } from 'vfox'\n\nexport default {\n  mounted() {\n    Toast.showToast({\n      title: '成功',\n      type: 'success',\n      duration: 2000\n    })\n  }\n}\n")])])]),e("h2",{attrs:{id:"主题定制"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#主题定制"}},[t._v("#")]),t._v(" 主题定制")]),t._v(" "),e("p",[t._v("Vfox 的样式是基于 SCSS 开发的，定义了一套默认样式变量，变量可参考 "),e("a",{attrs:{href:"https://github.com/godxiaoji/vfox/blob/beta/src/style/var.scss",target:"_blank",rel:"noopener noreferrer"}},[t._v("var.scss"),e("OutboundLink")],1),t._v("。")]),t._v(" "),e("ol",[e("li",[t._v("新建自定义 SCSS 文件 "),e("code",[t._v("my-var.scss")]),t._v("，定义一些变量，如：")])]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("$primary-color: #ff0000;\n$warning: #ffff00;\n...\n")])])]),e("ol",{attrs:{start:"2"}},[e("li",[t._v("新建要入口 SCSS 文件 "),e("code",[t._v("my-style.scss")]),t._v("，引入自定义变量文件和默认主题文件。")])]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("@import 'path/to/my-var.scss';\n@import 'vfox/src/style/index.scss';\n")])])]),e("ol",{attrs:{start:"3"}},[e("li",[t._v("更改原来引入的样式文件")])]),t._v(" "),e("p",[e("code",[t._v("import 'vfox/es/style/index.css'")]),t._v(" => "),e("code",[t._v("import 'path/to/my-style.scss'")])]),t._v(" "),e("h2",{attrs:{id:"从-v1-基于-vue2-版本升级"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#从-v1-基于-vue2-版本升级"}},[t._v("#")]),t._v(" 从 v1（基于 Vue2）版本升级")]),t._v(" "),e("h3",{attrs:{id:"升级-vue-3"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#升级-vue-3"}},[t._v("#")]),t._v(" 升级 Vue 3")]),t._v(" "),e("p",[t._v("升级问题请查看 "),e("a",{attrs:{href:"https://v3.vuejs.org/guide/introduction.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Vue3 文档"),e("OutboundLink")],1),t._v("。")]),t._v(" "),e("h3",{attrs:{id:"不兼容更新"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#不兼容更新"}},[t._v("#")]),t._v(" 不兼容更新")]),t._v(" "),e("h4",{attrs:{id:"弹窗组件-visible-字段变更"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#弹窗组件-visible-字段变更"}},[t._v("#")]),t._v(" 弹窗组件 visible 字段变更")]),t._v(" "),e("p",[t._v("由原来的 "),e("code",[t._v("visible.sync")]),t._v(" 变更为 "),e("code",[t._v("v-model:visible")]),t._v("，涉及组件：")]),t._v(" "),e("ul",[e("li",[t._v("ActionSheet")]),t._v(" "),e("li",[t._v("CalendarPopup")]),t._v(" "),e("li",[t._v("Dialog")]),t._v(" "),e("li",[t._v("Drawer")]),t._v(" "),e("li",[t._v("Dropdown")]),t._v(" "),e("li",[t._v("ImagePreview")]),t._v(" "),e("li",[t._v("Modal")]),t._v(" "),e("li",[t._v("NoticeBar")]),t._v(" "),e("li",[t._v("Notify")]),t._v(" "),e("li",[t._v("PickerPopup")]),t._v(" "),e("li",[t._v("PopDialog")]),t._v(" "),e("li",[t._v("PopMenu")]),t._v(" "),e("li",[t._v("Popover")]),t._v(" "),e("li",[t._v("Toast")])]),t._v(" "),e("h4",{attrs:{id:"其他涉及-sync、v-model-字段的变更"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#其他涉及-sync、v-model-字段的变更"}},[t._v("#")]),t._v(" 其他涉及 .sync、v-model 字段的变更")]),t._v(" "),e("ul",[e("li",[t._v("Tab/TabBar 组件 "),e("code",[t._v("active-value.sync")]),t._v(" -> "),e("code",[t._v("v-model:active-value")])]),t._v(" "),e("li",[t._v("Swiper/Sticky 组件 "),e("code",[t._v("active-index.sync")]),t._v(" -> "),e("code",[t._v("v-model:active-index")])]),t._v(" "),e("li",[t._v("Radio/Checkbox 组件 "),e("code",[t._v("v-model")]),t._v(" -> "),e("code",[t._v("v-model:checked")])]),t._v(" "),e("li",[t._v("ImagePreview 组件 "),e("code",[t._v("current.sync")]),t._v(" -> "),e("code",[t._v("v-model:current")])]),t._v(" "),e("li",[t._v("Collapse 组件 "),e("code",[t._v("active-names.sync")]),t._v(" -> "),e("code",[t._v("v-model:active-names")])])])])}),[],!1,null,null,null);a.default=r.exports}}]);