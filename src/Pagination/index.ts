import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Pagination from './Pagination.vue'

const _Pagination: SFCWithInstall<typeof Pagination> = Object.assign(
  Pagination,
  {
    install: function(app: App) {
      app.component(Pagination.name, Pagination)
    }
  }
)

export default _Pagination
