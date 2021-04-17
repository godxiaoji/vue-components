import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import AvatarGroup from '../Avatar/AvatarGroup.vue'

const _AvatarGroup: SFCWithInstall<typeof AvatarGroup> = Object.assign(
  AvatarGroup,
  {
    install: function(app: App) {
      app.component(AvatarGroup.name, AvatarGroup)
    }
  }
)

export default _AvatarGroup
