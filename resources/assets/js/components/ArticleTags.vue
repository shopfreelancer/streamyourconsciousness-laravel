<template>
    <div class="article-tag row">
        <div class="col-md-6">
            <article-tag v-for="(tag,index) in tags" 
                          v-bind:showDeleteTagButtons="showDeleteTagButtons" 
                          v-bind:key="index"
                          v-bind:tag="tag">
            </article-tag>
            <span v-on:click="toggleTagInputField()" class="touchable-elem fa fa-plus-circle"></span>
            <span v-on:click="toggleDeleteTagButtons()" class="touchable-elem fa fa-minus-circle"></span>
        </div>
        <div class="col-md-6">
            <input class="form-control form-control-sm" v-bind:class="[tagInputFieldHasErrors ? 
'is-invalid' : '']" v-show="showTagInputField" @keypress.enter="addTag()" v-model="newTag" type="text" placeholder="Add new tag">
            <div v-if="tagInputFieldHasErrors" class="invalid-feedback">{{tagInputFieldErrorMessage}}</div>
        </div>    
    </div>       
</template> 

<script>  
import ArticleTag from './ArticleTag.vue'

export default {
  name: 'ArticleTags',   
  methods: {
      toggleTagInputField(){
          if(this.showTagInputField === true) {
              this.showTagInputField = false;
              this.resetTagInputField();
          } else {
              this.showTagInputField = true;
          }
      },
      /**
      * No direct mapping of the mutation methods used here to perform a simple validation
      */
      addTag(event){
          var self = this;
          let article = self.article;
          let tagName = this.newTag;
  
          let tagNames = this.article.tags.map(function(tag){
            return tag.name;
          });

          if(tagNames.includes(this.newTag)){
              this.tagInputFieldHasErrors = true;
              this.tagInputFieldErrorMessage = "Your tag exists already.";
          } else {
            this.$store.dispatch('addTagToArticle', { article, tagName });
            this.resetTagInputField();
          }
      },
      deleteTag(tagId){
            let articleId = this.articleId;
            this.$store.dispatch('removeTagFromArticle', { articleId , tagId });
      },
      resetTagInputField(){
            this.newTag = "";
            this.tagInputFieldHasErrors = false;  
            this.tagInputFieldErrorMessage = "";
      },
      toggleDeleteTagButtons(){
          this.showDeleteTagButtons = !this.showDeleteTagButtons;
      },
  },
  created() {
      var self = this;
        this.$on("deleteTag", function (tagName) {
            self.deleteTag(tagName);
      });
  },
 props : ['tags','articleId','article'],   
    components: {
         ArticleTag,
  },
  data () {
    return {
      newTag : "",
      showTagInputField : false,
      tagInputFieldHasErrors : false,
      tagInputFieldErrorMessage : '',
      showDeleteTagButtons : false,
    }
  }
}
</script>

<style>
    .card-footer .article-tag {
        border-top:1px solid #000;
    }
    
    .card-blockquote {
        white-space: pre-line;
    }
</style>