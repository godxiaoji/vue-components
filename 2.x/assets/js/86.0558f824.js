(window.webpackJsonp=window.webpackJsonp||[]).push([[86],{449:function(t,v,_){"use strict";_.r(v);var a=_(42),e=Object(a.a)({},(function(){var t=this,v=t.$createElement,_=t._self._c||v;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("h1",{attrs:{id:"tabbar-标签列"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#tabbar-标签列"}},[t._v("#")]),t._v(" TabBar 标签列")]),t._v(" "),_("h2",{attrs:{id:"props"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#props"}},[t._v("#")]),t._v(" Props")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",[t._v("属性")]),t._v(" "),_("th",[t._v("类型")]),t._v(" "),_("th",[t._v("默认值")]),t._v(" "),_("th",[t._v("必填")]),t._v(" "),_("th",[t._v("说明")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("options")]),t._v(" "),_("td",[t._v("object[]/string[]/number[]")]),t._v(" "),_("td",[t._v("[]")]),t._v(" "),_("td",[t._v("是")]),t._v(" "),_("td",[t._v("tab 数据集")])]),t._v(" "),_("tr",[_("td",[t._v("v-model:active-value")]),t._v(" "),_("td",[t._v("string, number")]),t._v(" "),_("td"),t._v(" "),_("td",[t._v("否")]),t._v(" "),_("td",[t._v("当前激活项的 value 值")])]),t._v(" "),_("tr",[_("td",[t._v("field-names")]),t._v(" "),_("td",[t._v("object")]),t._v(" "),_("td",[t._v("{ label: 'label', value: 'value' }")]),t._v(" "),_("td",[t._v("否")]),t._v(" "),_("td",[t._v("自定义 options 中 label value 的字段 key")])])])]),t._v(" "),_("h3",{attrs:{id:"options-的结构"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#options-的结构"}},[t._v("#")]),t._v(" options 的结构")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",[t._v("key")]),t._v(" "),_("th",[t._v("类型")]),t._v(" "),_("th",[t._v("默认值")]),t._v(" "),_("th",[t._v("必填")]),t._v(" "),_("th",[t._v("说明")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("value")]),t._v(" "),_("td",[t._v("string/number")]),t._v(" "),_("td"),t._v(" "),_("td",[t._v("是")]),t._v(" "),_("td",[t._v("唯一值（v-model:active-value 使用）")])]),t._v(" "),_("tr",[_("td",[t._v("label")]),t._v(" "),_("td",[t._v("string")]),t._v(" "),_("td"),t._v(" "),_("td",[t._v("是")]),t._v(" "),_("td",[t._v("标签名")])]),t._v(" "),_("tr",[_("td",[t._v("icon")]),t._v(" "),_("td",[t._v("string/Component")]),t._v(" "),_("td"),t._v(" "),_("td",[t._v("否")]),t._v(" "),_("td",[t._v("设置图标，使用 "),_("RouterLink",{attrs:{to:"/components/Icon.html"}},[t._v("Icon")]),t._v(" 组件")],1)]),t._v(" "),_("tr",[_("td",[t._v("activeIcon")]),t._v(" "),_("td",[t._v("string/Component")]),t._v(" "),_("td"),t._v(" "),_("td",[t._v("否")]),t._v(" "),_("td",[t._v("设置激活态图标，没有设置则沿用 "),_("code",[t._v("icon")]),t._v(" 属性，使用 "),_("RouterLink",{attrs:{to:"/components/Icon.html"}},[t._v("Icon")]),t._v(" 组件")],1)]),t._v(" "),_("tr",[_("td",[t._v("badge")]),t._v(" "),_("td",[t._v("string/number/object")]),t._v(" "),_("td"),t._v(" "),_("td",[t._v("否")]),t._v(" "),_("td",[t._v("徽标，使用 "),_("RouterLink",{attrs:{to:"/components/Badge.html"}},[t._v("Badge")]),t._v(" 组件，可传入一个基于 Badge props 的对象")],1)])])]),t._v(" "),_("div",{staticClass:"language- extra-class"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[t._v("[\n  {\n    value: 1,\n    label: '首页',\n    icon: 'HomeOutlined',\n    badge: '热'\n  },\n  {\n    value: 2,\n    label: '搜索',\n    icon: 'SearchOutlined',\n    badge: {\n      dot: true,\n      content: 1\n    }\n  }\n]\n")])])]),_("p",[t._v("也可以直接设置为 "),_("code",[t._v("string[]")]),t._v(" 或 "),_("code",[t._v("number[]")]),t._v("，如：")]),t._v(" "),_("div",{staticClass:"language- extra-class"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[t._v("['aaa', 'bbb', 'ccc']\n")])])]),_("p",[t._v("将被转为：")]),t._v(" "),_("div",{staticClass:"language- extra-class"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[t._v("[\n  {\n    value: 'aaa',\n    label: 'aaa'\n  },\n  {\n    value: 'bbb',\n    label: 'bbb'\n  }\n  {\n    value: 'ccc',\n    label: 'ccc'\n  }\n]\n")])])]),_("p",[t._v("注：注意数组项要保持唯一性。")]),t._v(" "),_("h2",{attrs:{id:"css"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#css"}},[t._v("#")]),t._v(" CSS")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",[t._v("属性")]),t._v(" "),_("th",[t._v("默认值")]),t._v(" "),_("th",[t._v("说明")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("--tab-bar-color")]),t._v(" "),_("td",[_("font",{attrs:{color:"#595959"}},[t._v("#595959")])],1),t._v(" "),_("td",[t._v("默认色")])]),t._v(" "),_("tr",[_("td",[t._v("--tab-bar-active-color")]),t._v(" "),_("td",[_("font",{attrs:{color:"#1890ff"}},[t._v("#1890ff")])],1),t._v(" "),_("td",[t._v("激活色")])]),t._v(" "),_("tr",[_("td",[t._v("--tab-bar-background-color")]),t._v(" "),_("td",[_("font",{attrs:{color:"#ffffff"}},[t._v("#ffffff")])],1),t._v(" "),_("td",[t._v("背景色")])])])]),t._v(" "),_("h2",{attrs:{id:"events"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#events"}},[t._v("#")]),t._v(" Events")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",[t._v("事件")]),t._v(" "),_("th",[t._v("描述")]),t._v(" "),_("th",[t._v("回调函数参数")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("change")]),t._v(" "),_("td",[t._v("点击切换 tab 时触发")]),t._v(" "),_("td",[t._v("{ value, index }")])])])]),t._v(" "),_("h3",{attrs:{id:"change-的回调参数"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#change-的回调参数"}},[t._v("#")]),t._v(" change 的回调参数")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",[t._v("参数")]),t._v(" "),_("th",[t._v("类型")]),t._v(" "),_("th",[t._v("描述")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("value")]),t._v(" "),_("td",[t._v("string/number")]),t._v(" "),_("td",[t._v("当前激活项的 value 值")])]),t._v(" "),_("tr",[_("td",[t._v("index")]),t._v(" "),_("td",[t._v("number")]),t._v(" "),_("td",[t._v("当前激活项的索引值")])])])]),t._v(" "),_("h2",{attrs:{id:"methods"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#methods"}},[t._v("#")]),t._v(" Methods")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",[t._v("方法名")]),t._v(" "),_("th",[t._v("说明")]),t._v(" "),_("th",[t._v("参数")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("switchTo")]),t._v(" "),_("td",[t._v("切换到指定 Tab")]),t._v(" "),_("td",[t._v("(value: string/number) => void")])]),t._v(" "),_("tr",[_("td",[t._v("switchToIndex")]),t._v(" "),_("td",[t._v("切换到指定索引的 Tab")]),t._v(" "),_("td",[t._v("(index: number) => void")])])])])])}),[],!1,null,null,null);v.default=e.exports}}]);