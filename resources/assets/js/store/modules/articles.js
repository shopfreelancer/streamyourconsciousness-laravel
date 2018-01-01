export const articlesStore = {
  state : {
    articles : [],
    paginatedArticlesPage : {}
  },
  mutations : {
    setArticles(state,articles){
        state.articles = articles
    },
    setPaginatedArticlesPage(state,paginatedArticlesPage){
        state.paginatedArticlesPage = paginatedArticlesPage;
    },
    addArticle (state, {article}) {
      state.articles.push(article);
    },
    deleteArticle (state, {article}) {
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
  },
  actions: { 
    initArticles(context) {
        context.dispatch('filterArticlesByTagIds');
    },
    addArticle(context, { article }){
        axios.post('api/articles/', { article } ).then((res) => {
            if(parseInt(res.status) === 200){
                context.commit('addArticle', { article:res.data })
            }
        })
        .catch((err) => console.error(err));
    },
    updateArticle(context, { article }){
        axios.put('api/articles/'+article.id, { article } )
        .catch((err) => console.error(err));
    },
    deleteArticle(context, { article }){
        let articleId = article.id;
        axios.delete('api/articles/' + articleId ).then((res) => {
            context.commit('deleteArticle', { article })
        })
        .catch((err) => console.error(err));
    },
    removeTagFromArticle(context, { articleId, tagId }) {
        axios.post('api/articles/delete-tag/', { articleId, tagId })
            .then((res) => {
                let tags = res.data;
                let article = context.getters.getArticleById(articleId);

                context.commit('setTagsForArticle', { article, tags } );
                context.dispatch('fetchTags');
            })
            .catch((err) => console.error(err));
    },
    addTagToArticle(context, { article, tagName }) {
        let articleId = article.id;
        axios.post('api/articles/new-tag/', { articleId, tagName })
            .then((res) => {
                let tags = res.data;
        
                context.commit('setTagsForArticle', { article, tags } );
                context.dispatch('fetchTags');
            })
            .catch((err) => console.error(err));
    },
    filterArticlesByTagIds(context, page ) {
        if (typeof page === 'undefined') {
            page = 1;
        }
        // @todo: check dependency
        let tagIds = this.state.tagsStore.activeTagFilter;
        axios.post('api/articles/get-filtered-articles?page='+page, { tagIds })
            .then((res) => {
                let articles = res.data.data;
                context.commit('setArticles', articles );
                context.commit('setPaginatedArticlesPage', res.data );
            })
            .catch((err) => console.error(err));
    },
  },
  getters : {
    getArticlesCount : state => {
        return state.articles.length;
    },
    getArticleById: (state) => (id) => {
        return state.articles.find(article => article.id === id)
    }
  }
}
