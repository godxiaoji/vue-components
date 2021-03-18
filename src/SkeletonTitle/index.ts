import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import SkeletonTitle from '../Skeleton/SkeletonTitle.vue'

const _SkeletonTitle: SFCWithInstall<typeof SkeletonTitle> = Object.assign(
  SkeletonTitle,
  {
    install: function(app: App) {
      app.component(SkeletonTitle.name, SkeletonTitle)
    }
  }
)

export default _SkeletonTitle
