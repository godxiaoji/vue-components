import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import SwipeCell from './SwipeCell.vue'

const _SwipeCell: SFCWithInstall<typeof SwipeCell> = Object.assign(SwipeCell, {
  install: function(app: App) {
    app.component(SwipeCell.name, SwipeCell)
  }
})

export default _SwipeCell
