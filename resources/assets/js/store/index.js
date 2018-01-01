import Vue from 'vue'
import Vuex from 'vuex'
import plugins from './plugins'

Vue.use(Vuex)

export default new Vuex.Store({
  state : {
    articles : [],
    tags : [],
    activeTagFilter : [],
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
    resetStore(state) {
        state.articles = [];
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
    setTags (state,  tags ) {
        state.tags = tags;
    },
    toggleTagIdInFilter (state,  {tagId} ) {
        let tagIndex = state.activeTagFilter.indexOf(tagId);
        if(tagIndex > -1){
           state.activeTagFilter.splice(tagIndex,1); 
        } else {
           state.activeTagFilter.push(tagId);
        }
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
    setTagActiveFlag(context, {tags}){
        tags.forEach(function(tag){
            if(context.state.activeTagFilter.includes(tag.id)){
                tag.isActive = true;
            } else {
                tag.isActive = false;
            }
        });   
        return tags;
    }, 
    fetchTags(context) {
        axios.get('api/articles/get-tags').then((res) => {
            if(res.data.length > 0){
                let tags = res.data;
                context.dispatch('setTagActiveFlag', { tags } ).then((res) => {
                    tags = res;
                    context.commit('setTags', tags) 
                 });
            }   
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

        let tagIds = context.state.activeTagFilter;
        axios.post('api/articles/get-filtered-articles?page='+page, { tagIds })
            .then((res) => {
                let articles = res.data.data;
                context.commit('setArticles', articles );
                context.commit('setPaginatedArticlesPage', res.data );
            })
            .catch((err) => console.error(err));
    },
    toggleTagIdInFilter(context, { tagId }) {
        context.commit('toggleTagIdInFilter', { tagId } );
        context.dispatch('filterArticlesByTagIds');
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
