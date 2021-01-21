import * as Components from './component'
import { init as initEvent } from './helpers/events'
import './style'

const Vfox = {
  install(Vue) {
    Object.values(Components).forEach(component => {
      Vue.use(component)
    })

    initEvent()
  }
}

export * from './component'

export default Vfox
