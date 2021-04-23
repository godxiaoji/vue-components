import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import LoadMore from './LoadMore.vue'

const _LoadMore: SFCWithInstall<typeof LoadMore> = Object.assign(LoadMore, {
  install: function(app: App) {
    app.component(LoadMore.name, LoadMore)
  }
})

export default _LoadMore
