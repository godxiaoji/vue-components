import * as Components from './component'
import { addData as _addRegionData } from './util/mulit-selector/region'
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
  },
  /**
   * 地区数据
   * @param {Array} regionData
   */
  addRegionData(regionData) {
    return _addRegionData(regionData)
  }
}

export * from './component'

export default Vfox
