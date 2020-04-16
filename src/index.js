import ComponentList from './components/config'
import { isUndefined } from './helpers/util'
import { addApis } from './apis'

const VueComponents = {
  install(Vue) {
    ComponentList.forEach(component => {
      Vue.component(component.name, component)
    })

    addApis(Vue)
  }
}

export default VueComponents

if (!isUndefined(window) && window.Vue) {
  window.Vue.use(VueComponents)
}
