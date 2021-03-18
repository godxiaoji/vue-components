import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Modal from './Modal.vue'

const _Modal: SFCWithInstall<typeof Modal> = Object.assign(Modal, {
  install: function(app: App) {
    app.component(Modal.name, Modal)
  }
})

export default _Modal
