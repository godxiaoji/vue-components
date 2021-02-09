import Search from './SearchBar.vue'

Search.install = function(app) {
  app.component(Search.name, Search)
}

export default Search
