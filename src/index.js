import ComponentList from './components/config'
import { isObject, isString, isUndefined } from './helpers/util'
import { addApis } from './apis'

const GodVueComponents = {
  install(Vue, options) {
    let prefix = 'ly'

    if (isObject(options)) {
      if (options.prefix && isString(options.prefix)) {
        prefix = options.prefix
      }
    }

    ComponentList.forEach(component => {
      Vue.component(component.name.replace('app-', prefix + '-'), component)
    })

    addApis(Vue)
  }
}

export default GodVueComponents

if (!isUndefined(window) && window.Vue) {
  window.Vue.use(GodVueComponents)
}
