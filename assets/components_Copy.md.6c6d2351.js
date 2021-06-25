import{o as t,c as e,a as d}from"./app.28c4bf22.js";const r='{"title":"Copy 复制","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"Slots","slug":"slots"}],"relativePath":"components/Copy.md","lastUpdated":1624583539153}',a={},h=d('<h1 id="copy-复制"><a class="header-anchor" href="#copy-复制" aria-hidden="true">#</a> Copy 复制</h1><p>注：</p><ul><li>这是个包裹组件，本身不带展示效果，怎么展示通过 <code>slot</code> 来实现</li><li>不依赖 Flash，所以在某些老版本浏览器上可能失败</li></ul><h2 id="props"><a class="header-anchor" href="#props" aria-hidden="true">#</a> Props</h2><table><thead><tr><th>属性</th><th>类型</th><th>默认值</th><th>必填</th><th>说明</th></tr></thead><tbody><tr><td>text</td><td>string</td><td></td><td>是</td><td>需要复制的文本</td></tr></tbody></table><h2 id="events"><a class="header-anchor" href="#events" aria-hidden="true">#</a> Events</h2><table><thead><tr><th>事件</th><th>描述</th><th>回调函数参数</th></tr></thead><tbody><tr><td>success</td><td>复制成功时触发</td><td>{ text } text: 复制的文本</td></tr><tr><td>error</td><td>复制出错时触发</td><td>Error</td></tr></tbody></table><h2 id="slots"><a class="header-anchor" href="#slots" aria-hidden="true">#</a> Slots</h2><div class="language-"><pre><code>&lt;fx-copy :text=&quot;&#39;复制的内容&#39;&quot;&gt;\n  &lt;fx-button&gt;复制&lt;/fx-button&gt;\n&lt;/fx-copy&gt;\n</code></pre></div>',9);a.render=function(d,r,a,o,s,l){return t(),e("div",null,[h])};export default a;export{r as __pageData};
