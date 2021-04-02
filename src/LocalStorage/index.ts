import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import { createStorage } from '@/apis/LocalStorage'
import { objectForEach } from '@/helpers/util'

const LocalStorage = createStorage('fx')

const _LocalStorage: SFCWithInstall<typeof LocalStorage> = Object.assign(
  LocalStorage,
  {
    install: function(app: App) {
      objectForEach(this, (v: any, k: string) => {
        if (k !== 'install') {
          app.config.globalProperties[`$${k}`] = v
        }
      })
    },
    createStorage
  }
)

export default _LocalStorage
