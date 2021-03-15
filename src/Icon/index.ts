import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import Icon from './Icon.vue'

const _Icon: SFCWithInstall<typeof Icon> = Object.assign(Icon, {
  install: function(app: App) {
    app.component(Icon.name, Icon)
  }
})

export default _Icon
