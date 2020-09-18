import ComponentList from './components/config'
import { isUndefined } from './helpers/util'
import { addApis } from './apis'

const Vfox = {
  install(Vue) {
    ComponentList.forEach(component => {
      Vue.component(component.name, component)
    })

    addApis(Vue)
  }
}

export default Vfox

if (!isUndefined(window) && window.Vue) {
  window.Vue.use(Vfox)
}
