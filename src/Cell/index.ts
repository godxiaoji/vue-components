import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Cell from './Cell.vue'

const _Cell: SFCWithInstall<typeof Cell> = Object.assign(Cell, {
  install: function(app: App) {
    app.component(Cell.name, Cell)
  }
})

export default _Cell
