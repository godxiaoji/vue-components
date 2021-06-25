import{o as t,c as d,a as e}from"./app.28c4bf22.js";const o='{"title":"Popover 气泡类型弹窗","description":"","frontmatter":{},"headers":[{"level":2,"title":"Popover.showPopover(object)","slug":"popover-showpopover-object"},{"level":3,"title":"Params","slug":"params"},{"level":3,"title":"Usage","slug":"usage"},{"level":2,"title":"PopDialog.showPopDialog(object)","slug":"popdialog-showpopdialog-object"},{"level":3,"title":"Params","slug":"params-1"},{"level":3,"title":"Usage","slug":"usage-1"},{"level":2,"title":"PopMenu.showPopMenu(object)","slug":"popmenu-showpopmenu-object"},{"level":3,"title":"Params","slug":"params-2"},{"level":3,"title":"Usage","slug":"usage-2"}],"relativePath":"apis/Popover.md","lastUpdated":1624583539153}',r={},a=e('<h1 id="popover-气泡类型弹窗"><a class="header-anchor" href="#popover-气泡类型弹窗" aria-hidden="true">#</a> Popover 气泡类型弹窗</h1><h2 id="popover-showpopover-object"><a class="header-anchor" href="#popover-showpopover-object" aria-hidden="true">#</a> Popover.showPopover(object)</h2><p>显示气泡。</p><h3 id="params"><a class="header-anchor" href="#params" aria-hidden="true">#</a> Params</h3><p>Object object</p><table><thead><tr><th>属性</th><th>类型</th><th>默认值</th><th>必填</th><th>说明</th></tr></thead><tbody><tr><td>selector</td><td>string/element</td><td></td><td>是</td><td>从哪个元素展开，如果是 string，则为可以被 document.querySelector(selector) 获取到</td></tr><tr><td>placement</td><td>string</td><td>&#39;bottom&#39;</td><td>否</td><td>展开位置，可选 &#39;bottom&#39;, &#39;top&#39;, &#39;left&#39;, &#39;right&#39;</td></tr><tr><td>content</td><td>string</td><td></td><td>是</td><td>文本内容</td></tr><tr><td>showMask</td><td>boolean</td><td>true</td><td>否</td><td>是否展示蒙层，如果设置不展示，气泡则是跟随 <code>selector</code> 对应的元素</td></tr><tr><td>success</td><td>function</td><td></td><td>否</td><td>接口调用成功的回调函数</td></tr><tr><td>fail</td><td>function</td><td></td><td>否</td><td>接口调用失败（如传入错误的参数）的回调函数（不传入 fail 遇错误直接抛出）</td></tr><tr><td>complete</td><td>function</td><td></td><td>否</td><td>弹窗关闭或调用失败的回调函数</td></tr></tbody></table><h3 id="usage"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h3><div class="language-"><pre><code>import { Popover } from &#39;vfox&#39;\n\nPopover.showPopover({\n  selector: &#39;#popoverTarget&#39;,\n  content: &#39;这是气泡内容&#39;,\n  success: res =&gt; {\n    console.log(&#39;success&#39;, res)\n  }\n})\n</code></pre></div><h2 id="popdialog-showpopdialog-object"><a class="header-anchor" href="#popdialog-showpopdialog-object" aria-hidden="true">#</a> PopDialog.showPopDialog(object)</h2><p>显示气泡对话框。</p><h3 id="params-1"><a class="header-anchor" href="#params-1" aria-hidden="true">#</a> Params</h3><p>Object object</p><table><thead><tr><th>属性</th><th>类型</th><th>默认值</th><th>必填</th><th>说明</th></tr></thead><tbody><tr><td>selector</td><td>string/element</td><td></td><td>是</td><td>从哪个元素展开，如果是 string，则为可以被 document.querySelector(selector) 获取到</td></tr><tr><td>placement</td><td>string</td><td>&#39;bottom&#39;</td><td>否</td><td>展开位置，可选 &#39;bottom&#39;, &#39;top&#39;, &#39;left&#39;, &#39;right&#39;</td></tr><tr><td>content</td><td>string</td><td></td><td>是</td><td>文本内容</td></tr><tr><td>showCancel</td><td>boolean</td><td>true</td><td>否</td><td>是否显示取消按钮</td></tr><tr><td>cancelText</td><td>string</td><td>&#39;取消&#39;</td><td>否</td><td>取消按钮的文本</td></tr><tr><td>confirmText</td><td>string</td><td>&#39;确定&#39;</td><td>否</td><td>确定按钮的文本</td></tr><tr><td>success</td><td>function</td><td></td><td>否</td><td>接口调用成功（在用户做出选择后，如取消，确定）的回调函数</td></tr><tr><td>fail</td><td>function</td><td></td><td>否</td><td>接口调用失败（如传入错误的参数）的回调函数（不传入 fail 遇错误直接抛出）</td></tr><tr><td>complete</td><td>function</td><td></td><td>否</td><td>弹窗关闭或调用失败的回调函数</td></tr></tbody></table><h4 id="object-success-回调参数"><a class="header-anchor" href="#object-success-回调参数" aria-hidden="true">#</a> object.success 回调参数</h4><table><thead><tr><th>属性</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>cancel?</td><td>boolean</td><td>为 true 时，表示取消</td></tr><tr><td>confirm?</td><td>boolean</td><td>为 true 时，表示点击了确定</td></tr></tbody></table><h3 id="usage-1"><a class="header-anchor" href="#usage-1" aria-hidden="true">#</a> Usage</h3><div class="language-"><pre><code>import { PopDialog } from &#39;vfox&#39;\n\nPopDialog.showPopDialog({\n  selector: &#39;#popDialogTarget&#39;,\n  content: this.content,\n  success: (res) =&gt; {\n    console.log(&#39;success&#39;, res)\n  }\n})\n</code></pre></div><h2 id="popmenu-showpopmenu-object"><a class="header-anchor" href="#popmenu-showpopmenu-object" aria-hidden="true">#</a> PopMenu.showPopMenu(object)</h2><p>显示气泡菜单。</p><h3 id="params-2"><a class="header-anchor" href="#params-2" aria-hidden="true">#</a> Params</h3><p>Object object</p><table><thead><tr><th>属性</th><th>类型</th><th>默认值</th><th>必填</th><th>说明</th></tr></thead><tbody><tr><td>selector</td><td>string/element</td><td></td><td>是</td><td>从哪个元素展开，如果是 string，则为可以被 document.querySelector(selector) 获取到</td></tr><tr><td>placement</td><td>string</td><td>&#39;bottom&#39;</td><td>否</td><td>展开位置，可选 &#39;bottom&#39;, &#39;top&#39;, &#39;left&#39;, &#39;right&#39;</td></tr><tr><td>options</td><td>array</td><td></td><td>否</td><td>选项列表</td></tr><tr><td>success</td><td>function</td><td></td><td>否</td><td>接口调用成功（在用户做出选择后，如取消，选择选项）的回调函数</td></tr><tr><td>fail</td><td>function</td><td></td><td>否</td><td>接口调用失败（如传入错误的参数）的回调函数（不传入 fail 遇错误直接抛出）</td></tr><tr><td>complete</td><td>function</td><td></td><td>否</td><td>弹窗关闭或调用失败的回调函数</td></tr></tbody></table><h4 id="options-的结构"><a class="header-anchor" href="#options-的结构" aria-hidden="true">#</a> options 的结构</h4><table><thead><tr><th>options[index] 值</th><th>类型</th><th>默认值</th><th>必填</th><th>说明</th></tr></thead><tbody><tr><td>name</td><td>string</td><td></td><td>是</td><td>选项名</td></tr><tr><td>disabled</td><td>string</td><td>false</td><td>否</td><td>是否禁用</td></tr><tr><td>icon</td><td>string</td><td></td><td>否</td><td>图标，使用 <a href="./../components/Icon.html">Icon</a> 组件</td></tr></tbody></table><div class="language-"><pre><code>[\n  {\n    name: &#39;选项1&#39;,\n    disabled: false,\n    icon: &#39;MenuOutlined&#39;\n  }\n]\n</code></pre></div><h4 id="object-success-回调参数-1"><a class="header-anchor" href="#object-success-回调参数-1" aria-hidden="true">#</a> object.success 回调参数</h4><table><thead><tr><th>属性</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>confirm?</td><td>boolean</td><td>为 true 时，表示用户点击了选项，此时返回 <code>detail</code></td></tr><tr><td>cancel?</td><td>boolean</td><td>为 true 时，表示用户点击了取消</td></tr><tr><td>detail?.item</td><td>any</td><td>options[index] 的副本</td></tr><tr><td>detail?.index</td><td>number</td><td>索引</td></tr></tbody></table><h3 id="usage-2"><a class="header-anchor" href="#usage-2" aria-hidden="true">#</a> Usage</h3><div class="language-"><pre><code>import { PopMenu } from &#39;vfox&#39;\n\nPopMenu.showPopMenu({\n  selector: &#39;#popMenuTarget&#39;,\n  options: [{\n    icon: &#39;HeartOutlined&#39;,\n    name: &#39;爱心&#39;\n  },\n  {\n    icon: &#39;StarOutlined&#39;,\n    name: &#39;星星&#39;\n  },\n  {\n    icon: &#39;CircleOutlined&#39;,\n    name: &#39;圈圈&#39;,\n    disabled: true\n  }],\n  placement: &#39;top&#39;,\n  success: res =&gt; {\n    console.log(&#39;select&#39;, res)\n  }\n})\n</code></pre></div>',29);r.render=function(e,o,r,n,s,h){return t(),d("div",null,[a])};export default r;export{o as __pageData};
