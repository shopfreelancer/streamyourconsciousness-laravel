export const STORAGE_KEY = 'articles'

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  window.localStorage.clear()
}

export const state = {
  articles : JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
}

export const mutations = {
    
  addArticle (state, article) {
    state.articles.push(article)
  },
    
  resetStore(state) {
      state.articles = [];
  },

  deleteArticle (state, article) {
     state.articles.splice(state.articles.indexOf(article), 1)
  },

 addTag (state, { article, tag }) {
    article.tags.push(tag);
  },
    
 deleteTag (state, { article, tag }) {
    let tagIndex = article.tags.indexOf(tag);
    article.tags.splice(tagIndex,1);
  }

}