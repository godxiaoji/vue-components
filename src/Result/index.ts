import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Result from './Result.vue'

const _Result: SFCWithInstall<typeof Result> = Object.assign(Result, {
  install: function(app: App) {
    app.component(Result.name, Result)
  }
})

export default _Result
