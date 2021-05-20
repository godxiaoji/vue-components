import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import { pageScrollTo, scrollTo } from '@/apis/Scroll'

const Scroll = {
  pageScrollTo,
  scrollTo
}

const _Scroll: SFCWithInstall<typeof Scroll> = Object.assign(Scroll, {
  install: function (app: App) {}
})

export default _Scroll
