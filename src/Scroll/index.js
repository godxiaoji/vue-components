import { pageScrollTo, elementScrollTo } from '../apis/Scroll'

const Scroll = {
  install: function(app) {
    const properties = app.config.globalProperties

    properties.$pageScrollTo = pageScrollTo
    properties.$elementScrollTo = elementScrollTo
  }
}

Scroll.pageScrollTo = pageScrollTo
Scroll.elementScrollTo = elementScrollTo

export default Scroll
