import{o as t,c as e,a as d}from"./app.28c4bf22.js";const a='{"title":"Drawer 抽屉","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Events","slug":"events"},{"level":3,"title":"VisibleState 值说明","slug":"visiblestate-值说明"},{"level":2,"title":"Slots","slug":"slots"}],"relativePath":"components/Drawer.md","lastUpdated":1624583539153}',r={},l=d('<h1 id="drawer-抽屉"><a class="header-anchor" href="#drawer-抽屉" aria-hidden="true">#</a> Drawer 抽屉</h1><p>用于在屏幕边缘显示应用导航等内容的面板。</p><h2 id="props"><a class="header-anchor" href="#props" aria-hidden="true">#</a> Props</h2><table><thead><tr><th>属性</th><th>类型</th><th>默认值</th><th>必填</th><th>说明</th></tr></thead><tbody><tr><td>v-model:visible</td><td>boolean</td><td>false</td><td>否</td><td>是否显示</td></tr><tr><td>title</td><td>string</td><td></td><td>否</td><td>标题，设置标题后展示头部栏</td></tr><tr><td>placement</td><td>string</td><td>&#39;bottom&#39;</td><td>否</td><td>从哪展开，可选值：&#39;bottom&#39;, &#39;top&#39;, &#39;left&#39;, &#39;right&#39;</td></tr><tr><td>show-close</td><td>boolean</td><td>false</td><td>否</td><td>是否显示关闭按钮，显示按钮后展示头部栏</td></tr></tbody></table><h2 id="events"><a class="header-anchor" href="#events" aria-hidden="true">#</a> Events</h2><table><thead><tr><th>事件</th><th>描述</th><th>回调函数参数</th></tr></thead><tbody><tr><td>visible-state-change</td><td>展示隐藏时触发</td><td>{ state: <a href="./Drawer.html#visiblestate-值说明">VisibleState</a> }</td></tr></tbody></table><h3 id="visiblestate-值说明"><a class="header-anchor" href="#visiblestate-值说明" aria-hidden="true">#</a> VisibleState 值说明</h3><table><thead><tr><th>值</th><th>说明</th><th>备注</th></tr></thead><tbody><tr><td>show</td><td>展示时触发</td><td></td></tr><tr><td>shown</td><td>展示且动画结束后触发</td><td></td></tr><tr><td>hide</td><td>隐藏时触发</td><td>可能携带其他参数 cancel, maskClick, closeClick 等</td></tr><tr><td>hidden</td><td>隐藏且动画结束后触发</td><td>可能携带其他参数 cancel, maskClick, closeClick 等</td></tr></tbody></table><h2 id="slots"><a class="header-anchor" href="#slots" aria-hidden="true">#</a> Slots</h2><div class="language-"><pre><code>&lt;fx-drawer title=&quot;菜单&quot; placement=&quot;right&quot;&gt;\n  &lt;fx-tab /&gt;\n&lt;/fx-drawer&gt;\n</code></pre></div>',10);r.render=function(d,a,r,h,s,i){return t(),e("div",null,[l])};export default r;export{a as __pageData};
