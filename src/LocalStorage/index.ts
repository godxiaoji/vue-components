import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import { createStorage } from '@/apis/LocalStorage'

const LocalStorage = createStorage('fx')

const _LocalStorage: SFCWithInstall<typeof LocalStorage> & {
  createStorage: typeof createStorage
} = Object.assign(LocalStorage, {
  install: function (app: App) {},
  createStorage
})

export default _LocalStorage
