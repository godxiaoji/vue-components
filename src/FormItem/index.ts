import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import FormItem from '../Form/FormItem.vue'

const _FormItem: SFCWithInstall<typeof FormItem> = Object.assign(FormItem, {
  install: function(app: App) {
    app.component(FormItem.name, FormItem)
  }
})

export default _FormItem
