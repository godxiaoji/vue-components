import { isUndefined } from './helpers/util'
import * as Components from './component'
import { init as initEvent } from './helpers/events'
import './style'

const Vfox = {
  install(Vue) {
    Object.values(Components).forEach(component => {
      Vue.use(component)
    })

    // Vue.prototype.$createIntersectionObserver = function createIntersectionObserver(
    //   options
    // ) {
    //   return Apis.createIntersectionObserver(this.$el, options)
    // }
    // Vue.prototype.$createSelectorQuery = function createSelectorQuery() {
    //   return Apis.createSelectorQuery().in(this.$el)
    // }

    initEvent()
  }
}

export * from './component'

export default Vfox

if (!isUndefined(window) && window.Vue) {
  window.Vue.use(Vfox)
}
