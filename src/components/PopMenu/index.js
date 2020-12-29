import PopMenu from '../Popover/Menu.vue'

PopMenu.install = function(Vue) {
  Vue.component(PopMenu.name, PopMenu)
}

export default PopMenu
