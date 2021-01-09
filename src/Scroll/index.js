import { pageScrollTo, elementScrollTo } from '../apis/Scroll'

const Scroll = {
  install: function(Vue) {
    // 添加api
    Vue.prototype.$pageScrollTo = pageScrollTo
    Vue.prototype.$elementScrollTo = elementScrollTo
  }
}

Scroll.pageScrollTo = pageScrollTo
Scroll.elementScrollTo = elementScrollTo

export default Scroll
