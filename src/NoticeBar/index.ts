import { App } from 'vue'
import { SFCWithInstall } from '../utils/types'
import NoticeBar from './NoticeBar.vue'

const _NoticeBar: SFCWithInstall<typeof NoticeBar> = Object.assign(NoticeBar, {
  install: function(app: App) {
    app.component(NoticeBar.name, NoticeBar)
  }
})

export default _NoticeBar
