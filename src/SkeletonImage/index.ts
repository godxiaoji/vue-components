import { App } from 'vue'
import { SFCWithInstall } from '../utils/types'
import SkeletonImage from '../Skeleton/SkeletonImage.vue'

const _SkeletonImage: SFCWithInstall<typeof SkeletonImage> = Object.assign(SkeletonImage, {
  install: function(app: App) {
    app.component(SkeletonImage.name, SkeletonImage)
  }
})

export default _SkeletonImage
