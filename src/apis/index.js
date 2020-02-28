import { createIntersectionObserver } from './IntersectionObserver'
import { createSelectorQuery } from './SelectorQuery'

export function addApis(Vue) {
  Vue.prototype.$createIntersectionObserver = function(options) {
    return createIntersectionObserver(this.$el, options)
  }
  Vue.prototype.$createSelectorQuery = function() {
    return createSelectorQuery(this.$el)
  }
}
