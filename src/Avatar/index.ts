import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Avatar from './Avatar.vue'

const _Avatar: SFCWithInstall<typeof Avatar> = Object.assign(Avatar, {
  install: function(app: App) {
    app.component(Avatar.name, Avatar)
  }
})

export default _Avatar
