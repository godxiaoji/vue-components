import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Calendar from './Calendar.vue'

const _Calendar: SFCWithInstall<typeof Calendar> = Object.assign(Calendar, {
  install: function(app: App) {
    app.component(Calendar.name, Calendar)
  }
})

export default _Calendar
