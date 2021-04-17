import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Price from './Price.vue'

const _Price: SFCWithInstall<typeof Price> = Object.assign(
  Price,
  {
    install: function(app: App) {
      app.component(Price.name, Price)
    }
  }
)

export default _Price
