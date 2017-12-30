import Vue from 'vue'
import Vuex from 'vuex'
import plugins from './plugins'

Vue.use(Vuex)

export default new Vuex.Store({
  state : {
    articles : [],
    tags : []
  },
  mutations : {
      
    setArticles(state,articles){
        state.articles = articles
    },
    
    addArticle (state, article) {
      state.articles.push(article)
    },

    resetStore(state) {
        state.articles = [];
    },

    deleteArticle (state, article) {
       state.articles.splice(state.articles.indexOf(article), 1)
    },

   addTagToArticle (state, { article, tag }) {
      article.tags.push(tag);
    },
    
   setTagsForArticle (state, { article, tags }) {
      article.tags = tags;
    },    

   deleteTag (state, { article, tag }) {
      let tagIndex = article.tags.indexOf(tag);
      article.tags.splice(tagIndex,1);
    },
    
    setTags (state,  tags ) {
        state.tags = tags;
    },    

  },
  actions: {
    fetchTags(context) {
        axios.get('api/articles/get-tags').then((res) => {
            if(res.data.length > 0){
                let tags = res.data;
                context.commit('setTags', tags) 
            }   
        });
    },      
    fetchArticles(context) {
        axios.get('api/articles').then((res) => {
            if(res.data.length > 0){
                let articles = res.data;
                context.commit('setArticles', articles) 
            }   
        });
    },
    removeTagFromArticle(context, { articleId, tagId }) {
        axios.post('api/articles/delete-tag/', { articleId, tagId })
            .then((res) => {
                let tags = res.data;
                let article = context.getters.getArticleById(articleId);

                context.commit('setTagsForArticle', { article, tags } );
            })
            .catch((err) => console.error(err));
    },
    addTagToArticle(context, { article, tagName }) {
        let articleId = article.id;
        axios.post('api/articles/new-tag/', { articleId, tagName })
            .then((res) => {
                let tags = res.data;
                context.commit('setTagsForArticle', { article, tags } );
            })
            .catch((err) => console.error(err));
    },
    filterArticlesByTagId(context, { tagId }) {
        axios.post('api/articles/filter-articles-by-tag/', { tagId })
            .then((res) => {
                let articles = res.data;
                context.commit('setArticles', articles  );
            })
            .catch((err) => console.error(err));
    }
  },
  getters : {
    getArticlesCount : state => {
        return state.articles.length;
    },
    getArticleById: (state) => (id) => {
        return state.articles.find(article => article.id === id)
    }    
  },
  plugins
})
