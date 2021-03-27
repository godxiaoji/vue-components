import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Order from './Order.vue'

const _Order: SFCWithInstall<typeof Order> = Object.assign(Order, {
  install: function(app: App) {
    app.component(Order.name, Order)
  }
})

export default _Order
