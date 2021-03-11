import { App } from 'vue'
import { SFCWithInstall } from '../utils/types'
import SearchBar from './SearchBar.vue'

const _SearchBar: SFCWithInstall<typeof SearchBar> = Object.assign(SearchBar, {
  install: function(app: App) {
    app.component(SearchBar.name, SearchBar)
  }
})

export default _SearchBar
