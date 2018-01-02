import ArticleSorter from '../ArticleSorterHelper.js';
export const articlesStore = {
  state : {
    paginatedArticlesPage : {}
  },
  mutations : {
    setPaginatedArticlesPage(state,paginatedArticlesPage){
        state.paginatedArticlesPage = paginatedArticlesPage;
    },
    addArticle (state, {article}) {
       state.paginatedArticlesPage.data.push(article);
    },
    deleteArticle (state, {article}) {
        state.paginatedArticlesPage.data.splice( state.paginatedArticlesPage.data.indexOf(article), 1)
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
    removeTagFromArticle(context, { article, tagId }) {
        let articleId = article.id;
        axios.post('api/articles/delete-tag/', { articleId, tagId })
            .then((res) => {
                let updatedTags = res.data;

                context.commit('setTagsForArticle', { article, tags:updatedTags } );
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
    getPaginatedArticlesByTagIds(context, { page, tagIds } ) {
        if (typeof page === 'undefined') {
            page = 1;
        }
        
        axios.post('api/articles/get-filtered-articles?page='+page, { tagIds })
            .then((res) => {
                
                // sort Articles Array before commiting
                ArticleSorter.setArticles(res.data.data);
                res.data.data = ArticleSorter.sortArticles();
                
                context.commit('setPaginatedArticlesPage', res.data );
            })
            .catch((err) => console.error(err));
    },
  },
  getters : {
    getArticlesCount : state => {
        return  state.paginatedArticlesPage.total;
    },
    getArticleById: (state) => (id) => {
        return state.paginatedArticlesPage.data.find(article => article.id === id)
    }
  }
}
