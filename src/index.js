import { isUndefined, objectForEach } from './helpers/util'
import * as Components from './components'
import * as Apis from './apis'
import { addData as _addRegionData } from './components/util/mulit-selector/region'
import { SDKKey } from './config'
import { init as initEvent } from './helpers/events'

const Vfox = {
  install(Vue) {
    Object.values(Components).forEach(component => {
      Vue.component(component.name, component)
    })

    objectForEach(Apis, function(api, apiName) {
      Vue.prototype[`$${apiName}`] = api
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
  },
  /**
   * 地区数据
   * @param {Array} regionData
   */
  addRegionData(regionData) {
    return _addRegionData(regionData)
  }
}

export * from './components'
export * from './apis'

export default Vfox

if (!isUndefined(window) && window.Vue) {
  window.Vue.use(Vfox)
  window[SDKKey] = Apis
}
