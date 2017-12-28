import Vue from 'vue'
import Vuex from 'vuex'
import { state, mutations } from './mutations'
import plugins from './plugins'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  plugins,
  actions: {
    addArticleAction (context,article) {
      if(typeof article.id === "undefinded" || article.id === null){
          article.id = context.getters.getNewArticleId
      }    
      context.commit('addArticle', article);
    } 
  },
  getters : {
    /**
    * Generates primary key index for articleIds. Get highest id
    */
    getNewArticleId: (state, getters) => {
        if(getters.getArticlesCount === 0) 
            return 1;
        if(getters.getArticlesCount > 0){
            let articleIds = [];
            state.articles.forEach(function(article){
                articleIds.push(article.id);
            })

            let highestId = Math.max.apply(Math, articleIds);
            return highestId +1;
        }
        return false;
    },
    getArticlesCount : state => {
        return state.articles.length;
    },
    getArticleById: (state) => (id) => {
        return state.articles.find(article => article.id === id)
    }    
  }
})
