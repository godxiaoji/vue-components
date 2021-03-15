import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import Skeleton from './Skeleton.vue'

const _Skeleton: SFCWithInstall<typeof Skeleton> = Object.assign(Skeleton, {
  install: function(app: App) {
    app.component(Skeleton.name, Skeleton)
  }
})

export default _Skeleton
