import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Image from './Image.vue'

const _Image: SFCWithInstall<typeof Image> = Object.assign(Image, {
  install: function(app: App) {
    app.component(Image.name, Image)
  }
})

export default _Image
