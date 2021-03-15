import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import Form from './Form.vue'

const _Form: SFCWithInstall<typeof Form> = Object.assign(Form, {
  install: function(app: App) {
    app.component(Form.name, Form)
  }
})

export default _Form
