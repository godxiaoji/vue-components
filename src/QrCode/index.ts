import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import QrCode from './QrCode.vue'

const _QrCode: SFCWithInstall<typeof QrCode> = Object.assign(QrCode, {
  install: function(app: App) {
    app.component(QrCode.name, QrCode)
  }
})

export default _QrCode
