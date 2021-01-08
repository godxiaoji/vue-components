import FlatList from './FlatList.vue'

FlatList.install = function(Vue) {
  Vue.component(FlatList.name, FlatList)
}

export default FlatList
