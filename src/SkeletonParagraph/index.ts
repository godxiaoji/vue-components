import { App } from 'vue'
import { SFCWithInstall } from '../utils/types'
import SkeletonParagraph from '../Skeleton/SkeletonParagraph.vue'

const _SkeletonParagraph: SFCWithInstall<typeof SkeletonParagraph> = Object.assign(SkeletonParagraph, {
  install: function(app: App) {
    app.component(SkeletonParagraph.name, SkeletonParagraph)
  }
})

export default _SkeletonParagraph
