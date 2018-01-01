import Vue from 'vue'
import Vuex from 'vuex'
import plugins from './plugins'
import {tagsStore} from './modules/tags.js'
import {articlesStore} from './modules/articles.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
     tagsStore,
     articlesStore
  },
  plugins
})
