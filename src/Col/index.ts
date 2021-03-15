import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import Col from './Col.vue'

const _Col: SFCWithInstall<typeof Col> = Object.assign(Col, {
  install: function(app: App) {
    app.component(Col.name, Col)
  }
})

export default _Col
