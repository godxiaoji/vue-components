import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import SkeletonAvatar from '../Skeleton/SkeletonAvatar.vue'

const _SkeletonAvatar: SFCWithInstall<typeof SkeletonAvatar> = Object.assign(SkeletonAvatar, {
  install: function(app: App) {
    app.component(SkeletonAvatar.name, SkeletonAvatar)
  }
})

export default _SkeletonAvatar
