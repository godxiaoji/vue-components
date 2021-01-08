import NavBar from './NavBar.vue'

NavBar.install = function(Vue) {
  Vue.component(NavBar.name, NavBar)
}

export default NavBar
