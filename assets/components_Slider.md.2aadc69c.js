import{o as t,c as d,a as e}from"./app.28c4bf22.js";const r='{"title":"Slider 滑块选择器","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Events","slug":"events"}],"relativePath":"components/Slider.md","lastUpdated":1624583539157}',a={},h=e('<h1 id="slider-滑块选择器"><a class="header-anchor" href="#slider-滑块选择器" aria-hidden="true">#</a> Slider 滑块选择器</h1><ul><li>可以配合 <a href="./Form.html">Form</a> 和 <a href="./Form.html#formitem-表单项">FormItem</a> 使用。</li></ul><h2 id="props"><a class="header-anchor" href="#props" aria-hidden="true">#</a> Props</h2><table><thead><tr><th>属性</th><th>类型</th><th>默认值</th><th>必填</th><th>说明</th></tr></thead><tbody><tr><td>v-model</td><td>number</td><td></td><td>否</td><td></td></tr><tr><td>name</td><td>string</td><td></td><td>否</td><td><a href="./Form.html">Form</a> 的标识</td></tr><tr><td>min</td><td>number</td><td>0</td><td>否</td><td>最小值</td></tr><tr><td>max</td><td>number</td><td>100</td><td>否</td><td>最大值</td></tr><tr><td>step</td><td>number</td><td>1</td><td>否</td><td>步长，取值必须大于 0，并且可被(max - min)整除</td></tr><tr><td>disabled</td><td>boolean</td><td>false</td><td>否</td><td>是否禁用</td></tr><tr><td>show-value</td><td>boolean</td><td>false</td><td>否</td><td>是否显示当前 value</td></tr><tr><td>color</td><td>string</td><td></td><td>否</td><td>设置主色</td></tr></tbody></table><h2 id="events"><a class="header-anchor" href="#events" aria-hidden="true">#</a> Events</h2><table><thead><tr><th>事件</th><th>描述</th><th>回调函数参数</th></tr></thead><tbody><tr><td>input</td><td>拖动过程中触发的事件</td><td>{ value }</td></tr><tr><td>change</td><td>完成一次拖动后触发的事件</td><td>{ value }</td></tr></tbody></table>',6);a.render=function(e,r,a,l,o,s){return t(),d("div",null,[h])};export default a;export{r as __pageData};
