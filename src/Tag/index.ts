import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Tag from './Tag.vue'

const _Tag: SFCWithInstall<typeof Tag> = Object.assign(Tag, {
  install: function(app: App) {
    app.component(Tag.name, Tag)
  }
})

export default _Tag
