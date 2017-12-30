<template id="article-tag-template">
<span class="article-tag-item badge badge-pill badge-secondary">
    {{ tag.name }}
    <span v-show="showDeleteTagButtons" @click="deleteTag(tag.id)" class="fa fa-minus-circle"></span>
</span>
</template> 
   
<script>
export default {
  name: 'ArticleTag',   
  methods: {
      /**
      * Props go down, Events go up. Notify Parents about the change
      */ 
      deleteTag(tagId){
          this.$parent.$emit('deleteTag', tagId);
      }
  },
 props : ['tag','showDeleteTagButtons']
}
</script>

<style>
    .article-tag-item {
        margin: 0 2px 5px 0px;
    }
    
    @media (max-width: 576px) {
    .article-tag-item  {
        font-size:22px;
    }
    }
    
    @media (min-width: 577px) and (max-width: 768px) { 
        .article-tag-item  {
            font-size:20px
        }
    }
</style>
