import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import Group from './Group.vue'

const _Group: SFCWithInstall<typeof Group> = Object.assign(Group, {
  install: function(app: App) {
    app.component(Group.name, Group)
  }
})

export default _Group
