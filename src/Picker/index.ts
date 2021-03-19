import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Picker from './Picker.vue'

const _Picker: SFCWithInstall<typeof Picker> = Object.assign(Picker, {
  install: function(app: App) {
    app.component(Picker.name, Picker)
  }
})

export default _Picker
