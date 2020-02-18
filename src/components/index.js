import ComponentList from "./config";
import {
  isObject,
  isString,
  isUndefined
} from "../helpers/util";

const GodVueComponents = {
  install(Vue, options) {

    let prefix = 'god'

    if (isObject(options)) {
      if (options.prefix && isString(options.prefix)) {
        prefix = options.prefix
      }
    }

    ComponentList.forEach(component => {
      Vue.component(component.name.replace('app-', prefix + '-'), component)
    })
  }
}

export default GodVueComponents

if (!isUndefined(window) && window.Vue) {
  window.Vue.use(GodVueComponents)
}
