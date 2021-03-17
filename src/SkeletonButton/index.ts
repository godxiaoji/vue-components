import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import SkeletonButton from '../Skeleton/SkeletonButton.vue'

const _SkeletonButton: SFCWithInstall<typeof SkeletonButton> = Object.assign(
  SkeletonButton,
  {
    install: function(app: App) {
      app.component(SkeletonButton.name, SkeletonButton)
    }
  }
)

export default _SkeletonButton
