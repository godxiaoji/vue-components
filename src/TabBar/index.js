import TabBar from '../Tab/TabBar.vue'

TabBar.install = function(app) {
  app.component(TabBar.name, TabBar)
}

export default TabBar
