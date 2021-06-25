import{o as t,c as e,a as d}from"./app.28c4bf22.js";const r='{"title":"Order 调整排序布局","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":3,"title":"items 的结构","slug":"items-的结构"},{"level":2,"title":"Events","slug":"events"},{"level":3,"title":"delete 的参数","slug":"delete-的参数"},{"level":2,"title":"Slots","slug":"slots"},{"level":3,"title":"列表项（#default）","slug":"列表项（-default）"}],"relativePath":"components/Order.md","lastUpdated":1624583539157}',a={},l=d('<h1 id="order-调整排序布局"><a class="header-anchor" href="#order-调整排序布局" aria-hidden="true">#</a> Order 调整排序布局</h1><p>宫格类排序组件，类似于微信朋友圈上传图片，支持删除功能。</p><p>该组件暂支持 2.x 版本。</p><h2 id="props"><a class="header-anchor" href="#props" aria-hidden="true">#</a> Props</h2><table><thead><tr><th>属性</th><th>类型</th><th>默认值</th><th>必填</th><th>说明</th></tr></thead><tbody><tr><td>v-model:items</td><td>Array</td><td></td><td>是</td><td>列表数组</td></tr><tr><td>column-number</td><td>number</td><td>3</td><td>否</td><td>渲染列数</td></tr><tr><td>aspect-ratio</td><td>number</td><td>1</td><td>否</td><td>渲染宽高比</td></tr><tr><td>deletable</td><td>boolean</td><td>false</td><td>否</td><td>支持删除</td></tr></tbody></table><p>PS： 由于该组件是宫格类排序，所以需要预设列数和每项固定宽高。</p><h3 id="items-的结构"><a class="header-anchor" href="#items-的结构" aria-hidden="true">#</a> items 的结构</h3><div class="language-"><pre><code>interface Item {\n  id: string | number\n  [propName: string]: any\n}\n\nconst items: Item[] = [\n  { id: 1, type: &#39;primary&#39; },\n  { id: 2, type: &#39;success&#39; },\n  { id: 3, type: &#39;warning&#39; },\n  { id: 4, type: &#39;danger&#39; }\n]\n</code></pre></div><p>PS：要求一定要有 <code>id</code> 作为唯一键。</p><h2 id="events"><a class="header-anchor" href="#events" aria-hidden="true">#</a> Events</h2><table><thead><tr><th>事件</th><th>描述</th><th>回调函数参数</th></tr></thead><tbody><tr><td>delete</td><td>单项被删除时触发</td><td>{ item, index }</td></tr></tbody></table><h3 id="delete-的参数"><a class="header-anchor" href="#delete-的参数" aria-hidden="true">#</a> delete 的参数</h3><table><thead><tr><th>值</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>index</td><td>number</td><td>第 index 项</td></tr><tr><td>item</td><td>any</td><td>传入 items[index] 的副本，修改不会影响 props.items</td></tr></tbody></table><h2 id="slots"><a class="header-anchor" href="#slots" aria-hidden="true">#</a> Slots</h2><h3 id="列表项（-default）"><a class="header-anchor" href="#列表项（-default）" aria-hidden="true">#</a> 列表项（#default）</h3><div class="language-"><pre><code>&lt;fx-order&gt;\n &lt;template #default=&quot;{ item, index }&quot;&gt;\n  {{ index }} : {{ item }}\n &lt;/template&gt;\n&lt;/fx-order&gt;\n</code></pre></div>',16);a.render=function(d,r,a,h,i,n){return t(),e("div",null,[l])};export default a;export{r as __pageData};
