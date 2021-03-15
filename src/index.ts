import { App } from 'vue'
import * as Components from './component'
import { init as initEvent } from '@/helpers/events'
import '@/style'

const Vfox = {
  install(app: App) {
    Object.values(Components).forEach(component => {
      app.use(component)
    })

    initEvent()
  }
}

// export * from './component'

export default Vfox
