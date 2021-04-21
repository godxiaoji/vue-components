import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import TimelineItem from '../Timeline/TimelineItem.vue'

const _TimelineItem: SFCWithInstall<typeof TimelineItem> = Object.assign(
  TimelineItem,
  {
    install: function(app: App) {
      app.component(TimelineItem.name, TimelineItem)
    }
  }
)

export default _TimelineItem
