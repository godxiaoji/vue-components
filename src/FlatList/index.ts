import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import FlatList from './FlatList.vue'

const _FlatList: SFCWithInstall<typeof FlatList> = Object.assign(FlatList, {
  install: function(app: App) {
    app.component(FlatList.name, FlatList)
  }
})

export default _FlatList
