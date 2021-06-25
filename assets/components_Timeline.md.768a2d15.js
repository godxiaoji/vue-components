import{o as t,c as e,a as i}from"./app.28c4bf22.js";const l='{"title":"Timeline 步骤条","description":"","frontmatter":{},"headers":[{"level":2,"title":"Timeline CSS","slug":"timeline-css"},{"level":2,"title":"Timeline Slots","slug":"timeline-slots"},{"level":3,"title":"默认（#default）","slug":"默认（-default）"},{"level":2,"title":"TimelineItem 时间轴子项","slug":"timelineitem-时间轴子项"},{"level":2,"title":"TimelineItem Props","slug":"timelineitem-props"},{"level":2,"title":"TimelineItem CSS","slug":"timelineitem-css"},{"level":2,"title":"TimelineItem Slots","slug":"timelineitem-slots"},{"level":3,"title":"内容（#default）","slug":"内容（-default）"},{"level":3,"title":"标题（#title）","slug":"标题（-title）"},{"level":3,"title":"节点（#dot）","slug":"节点（-dot）"}],"relativePath":"components/Timeline.md","lastUpdated":1624583539157}',d={},a=i('<h1 id="timeline-步骤条"><a class="header-anchor" href="#timeline-步骤条" aria-hidden="true">#</a> Timeline 步骤条</h1><h2 id="timeline-css"><a class="header-anchor" href="#timeline-css" aria-hidden="true">#</a> Timeline CSS</h2><table><thead><tr><th>属性</th><th>默认值</th><th>说明</th></tr></thead><tbody><tr><td>--timeline-color</td><td>#8c8c8c</td><td>步骤条默认颜色</td></tr><tr><td>--timeline-active-color</td><td>#1890ff</td><td>步骤条激活颜色</td></tr></tbody></table><h2 id="timeline-slots"><a class="header-anchor" href="#timeline-slots" aria-hidden="true">#</a> Timeline Slots</h2><h3 id="默认（-default）"><a class="header-anchor" href="#默认（-default）" aria-hidden="true">#</a> 默认（#default）</h3><p>注：其中只可放置 <a href="./Timeline.html#timelineitem-时间轴子项">TimelineItem</a> 组件，否则会导致未定义的行为。</p><div class="language-"><pre><code>&lt;fx-timeline&gt;\n  &lt;fx-timeline-item title=&quot;成功获得0.01元收益&quot;&gt;搞半天就这点？&lt;/fx-timeline-item&gt;\n  &lt;fx-timeline-item title=&quot;十天后到账&quot;&gt;0.01元还要十天到账？&lt;/fx-timeline-item&gt;\n  &lt;fx-timeline-item title=&quot;爱要不要&quot;&gt;不要了，滚。&lt;/fx-timeline-item&gt;\n&lt;/fx-timeline&gt;\n</code></pre></div><h2 id="timelineitem-时间轴子项"><a class="header-anchor" href="#timelineitem-时间轴子项" aria-hidden="true">#</a> TimelineItem 时间轴子项</h2><h2 id="timelineitem-props"><a class="header-anchor" href="#timelineitem-props" aria-hidden="true">#</a> TimelineItem Props</h2><table><thead><tr><th>属性</th><th>类型</th><th>默认值</th><th>必填</th><th>说明</th></tr></thead><tbody><tr><td>title</td><td>string</td><td></td><td>否</td><td>时间轴子项标题</td></tr><tr><td>dotColor</td><td>string</td><td></td><td>否</td><td>时间轴节点颜色</td></tr></tbody></table><h2 id="timelineitem-css"><a class="header-anchor" href="#timelineitem-css" aria-hidden="true">#</a> TimelineItem CSS</h2><table><thead><tr><th>属性</th><th>默认值</th><th>说明</th></tr></thead><tbody><tr><td>--timeline-item-color</td><td>#8c8c8c</td><td>步骤条默认颜色，不设置继承 <a href="./Timeline.html#timeline-css">Timeline</a> 组件</td></tr><tr><td>--timeline-item-active-color</td><td>#1890ff</td><td>步骤条激活颜色，不设置继承 <a href="./Timeline.html#timeline-css">Timeline</a> 组件</td></tr></tbody></table><h2 id="timelineitem-slots"><a class="header-anchor" href="#timelineitem-slots" aria-hidden="true">#</a> TimelineItem Slots</h2><h3 id="内容（-default）"><a class="header-anchor" href="#内容（-default）" aria-hidden="true">#</a> 内容（#default）</h3><div class="language-"><pre><code>&lt;fx-timeline-item title=&quot;标题&quot;&gt;\n  自定义内容\n&lt;/fx-timeline-item&gt;\n</code></pre></div><h3 id="标题（-title）"><a class="header-anchor" href="#标题（-title）" aria-hidden="true">#</a> 标题（#title）</h3><div class="language-"><pre><code>&lt;fx-timeline-item&gt;\n  &lt;template #title&gt;\n  【珠海市】【珠海一部】快递小哥正在派件（&lt;a href=&quot;tel:10000&quot;&gt;10000&lt;/a&gt;）\n  &lt;/template&gt;\n  2021-04-13 11:22:16\n&lt;/fx-timeline-item&gt;\n</code></pre></div><p>PS：优先级高于 Props <code>title</code>。</p><h3 id="节点（-dot）"><a class="header-anchor" href="#节点（-dot）" aria-hidden="true">#</a> 节点（#dot）</h3><div class="language-"><pre><code>&lt;fx-timeline-item&gt;\n  &lt;template #dot&quot;&gt;\n    &lt;fx-icon icon=&quot;CheckOutlined&quot;&gt;&lt;/fx-icon&gt;\n  &lt;/template&gt;\n&lt;/fx-timeline-item&gt;\n</code></pre></div>',20);d.render=function(i,l,d,n,r,m){return t(),e("div",null,[a])};export default d;export{l as __pageData};
