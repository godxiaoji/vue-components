import { App } from 'vue'
import { SFCWithInstall } from '../utils/types'
import Row from './Row.vue'

const _Row: SFCWithInstall<typeof Row> = Object.assign(Row, {
  install: function(app: App) {
    app.component(Row.name, Row)
  }
})

export default _Row
