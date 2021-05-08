import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import DatePicker from './DatePicker.vue'

const _DatePicker: SFCWithInstall<typeof DatePicker> = Object.assign(
  DatePicker,
  {
    install: function(app: App) {
      app.component(DatePicker.name, DatePicker)
    }
  }
)

export default _DatePicker
