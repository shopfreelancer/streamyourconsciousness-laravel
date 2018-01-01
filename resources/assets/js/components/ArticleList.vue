<template>
    <div class="container">
        <article-item
              v-for="(article, index) in sortedList"
              v-bind:article="article"
              v-bind:articleId="article.id"
              v-bind:key="index"
              >
        </article-item>
   </div>
</template> 

<script>
import  ArticleItem  from './ArticleItem.vue';
import moment from 'moment';

export default {
    name: 'ArticleList',
    mounted(){
        this.$store.dispatch('initArticles');
    },
    methods: {
        /**
        * Sort articles by date. This is used only for rendering.
        */
        sortArticlesByDateDesc(){
            this.articles.sort(function(a, b) {
                return moment(a.published).isAfter(b.published, 'day') ? -1 : moment(a.published).isBefore(b.published, 'day') ? 1 : 0;
            });
        },        
       /**
        * Sort articles by created date. All articles of a certain date should be after each other.
        */
        searchDateRanges(){
            var articlesIndexes = [],
            lastIndex = this.articles.length -1;
            
            // reset array before every iteration
            this.dateChangedArrayIndex = [];

            this.articles.forEach(function(article,index){
                articlesIndexes.push(index);
            });

            this.searchNextMatchingDate(articlesIndexes,lastIndex);
        },
        /**
        * Search next date, which doesn´t match the first date in array
        * 
        */
        searchNextMatchingDate(articlesIndexes,lastIndex){
            var self = this,
            newArticlesIndexes = [],
            searchForMatchingDateOfIndex = articlesIndexes[0];
            
            for(let i = 0 ; i < articlesIndexes.length; i++){
                let currentIndex = articlesIndexes[i];
             
                let date1 = self.articles[searchForMatchingDateOfIndex].published,
                    date2 = self.articles[currentIndex].published;
                
                if(!moment(date1).isSame(date2, 'day')){
                    this.dateChangedArrayIndex.push(searchForMatchingDateOfIndex);
                    newArticlesIndexes = articlesIndexes.slice(i,articlesIndexes.length);
                    break;
                }
            }

            if(newArticlesIndexes.length > 0){
                self.searchNextMatchingDate(newArticlesIndexes,lastIndex);
            } else {
                // if no matching dates found there is either only one date range or we´re in the last date range
                this.dateChangedArrayIndex.push(articlesIndexes[0]);
            }
        },
        /**
        * Boolean flag is used to display the date on the first article of range articles with same date
        */
        setDateHeadlineFlags(){
            var self = this;
          
            if(self.dateChangedArrayIndex.length < 0)
                return;
            
            self.articles.forEach(function(article,index){
                if(self.dateChangedArrayIndex.includes(index)){
                    self.$set(article, 'dateHeadline', true);
                } else {
                    self.$set(article, 'dateHeadline', false); 
                }
            });
            
        },
        /**
        * Articles of the same date get sorted by ID.
        * As this needs to be done for index ranges in articles Array.sort() will not help here
        * What we want is the following sort order
        * [{date:'date1',id:10},{date:'date1',id:9},{date:'date1',id:8},{date:'date2',id:13},{date:'date2',id:11}]    
        */
        sortArticlesByIdandDateRange(){
            var self = this,
                dateHeadlineIndexes = [],
                sortedArticles = [];
            
            if(this.dateChangedArrayIndex.length < 1)
                return;
            
            for(let j = 0; j < this.dateChangedArrayIndex.length; j++){
                let start = this.dateChangedArrayIndex[j],
                    end = (j === this.dateChangedArrayIndex.length -1) ? self.articles.length  : this.dateChangedArrayIndex[j+1];
                
                // this is the array with all article objects with the same date
                let articlesRange = this.articles.slice(start,end);
                let sortedArticlesRange = articlesRange.sort(function(a, b) {
                    return a.id > b.id ? -1 : a.id < b.id ? 1 : 0;
                });
                
                // articles in every sortedArticlesRange are sorted so let´s push them back in the right order
                sortedArticlesRange.forEach(function(article){
                    sortedArticles.push(article);
                })
            }
            
            // to preserve reactivity of articles and avoid caveats $set needs to be called
            // https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats
            sortedArticles.forEach(function(article,i){
                self.articles[i] = article;
            })
        }
      },
      computed: {
          sortedList: function () {
              this.sortArticlesByDateDesc();
              this.searchDateRanges();
              this.sortArticlesByIdandDateRange();
              this.setDateHeadlineFlags();
    
              return this.articles;
          },
          articles(){
              return this.$store.state.articles;
          }
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