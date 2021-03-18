import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Copy from './Copy.vue'

const _Copy: SFCWithInstall<typeof Copy> = Object.assign(Copy, {
  install: function(app: App) {
    app.component(Copy.name, Copy)
  }
})

export default _Copy
