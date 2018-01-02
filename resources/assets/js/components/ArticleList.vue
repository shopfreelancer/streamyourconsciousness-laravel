<template>
    <div class="container">
        <article-item
              v-for="(article, index) in paginatedArticlesPage.data"
              v-bind:article="article"
              v-bind:articleId="article.id"
              v-bind:key="index"
              >
        </article-item>
        <pagination :data="paginatedArticlesPage" v-on:pagination-change-page="getResults"></pagination>
   </div>
</template> 

<script>
import ArticleItem  from './ArticleItem.vue';
import moment from 'moment';
Vue.component('pagination', require('laravel-vue-pagination'));

export default {
    name: 'ArticleList',
    mounted(){
        this.getResults(1);
    },
    methods: {
        getResults(page){
            let tagIds = this.$store.state.tagsStore.activeTagFilter;
            this.$store.dispatch('getPaginatedArticlesByTagIds', { page, tagIds });
        },
      },
      computed: {
          paginatedArticlesPage(){
              return this.$store.state.articlesStore.paginatedArticlesPage;
          },
      },
      data () {
        return {
          dateChangedArrayIndex : []
        }
      },
      components: {
          ArticleItem: ArticleItem,
      }
}
</script>

<style scoped>
</style>