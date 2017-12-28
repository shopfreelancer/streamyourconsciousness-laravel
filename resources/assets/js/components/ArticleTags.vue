<template>
    <div class="article-tags-wrap">
        <span class="article-tag-item badge badge-pill badge-secondary" v-for="tag in tags">
            {{tag.name}}
            <span v-show="showDeleteTagButtons" @click="deleteTag(tag.name)" class="fa fa-minus-circle">x</span>
        </span>
        <input v-model="tagName" @keypress.enter="addTag()">
    </div>
</template>
<script>
    export default {
        name : 'ArticleTags',
        data() {
            return {
                tagName : '',
                showDeleteTagButtons : true
            };
        },
        
        methods: {
            addTag(){

                if(this.tagName === ""){
                    return;
                }

                axios.post('api/articles/new-tag/', {articleId:this.articleId, tagName:this.tagName})
                    .then((res) => {
                        this.$parent.$emit('fetchList');
                        this.tagName = '';
                    })
                    .catch((err) => console.error(err));

            },
            deleteTag(tagName){
                axios.post('api/articles/delete-tag/', {articleId:this.articleId, tagName:tagName})
                    .then((res) => {
                        this.$parent.$emit('fetchList');
                    })
                    .catch((err) => console.error(err));

            }
        },
        
        props: ['tags', 'articleId']
    }
</script>