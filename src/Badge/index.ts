import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Badge from './Badge.vue'

const _Badge: SFCWithInstall<typeof Badge> = Object.assign(Badge, {
  install: function(app: App) {
    app.component(Badge.name, Badge)
  }
})

export default _Badge
