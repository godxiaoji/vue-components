import { isUndefined, objectForEach } from './helpers/util'
import * as Components from './components'
import * as Apis from './apis'

const Vfox = {
  install(Vue) {
    Object.values(Components).forEach(component => {
      Vue.component(component.name, component)
    })

    objectForEach(Apis, function(api, apiName) {
      Vue.prototype[`$${apiName}`] = api
    })

    Vue.prototype.$createIntersectionObserver = function createIntersectionObserver(
      options
    ) {
      return Apis.createIntersectionObserver(this.$el, options)
    }
    Vue.prototype.$createSelectorQuery = function createSelectorQuery() {
      return Apis.createSelectorQuery().in(this.$el)
    }
  }
}

export * from './components'
export * from './apis'

export default Vfox

if (!isUndefined(window) && window.Vue) {
  window.Vue.use(Vfox)
}
