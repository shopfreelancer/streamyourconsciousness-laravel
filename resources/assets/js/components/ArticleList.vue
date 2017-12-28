<template>
    <div class='row'>
        <form action="#" @submit.prevent="createArticle()">
            <div class="input-group">
                <input v-model="newArticle.body" type="text" name="body" class="form-control" autofocus>
                <span class="input-group-btn">
                    <button type="submit" class="btn btn-primary">New Task</button>
                </span>
            </div>
        </form>
        <h4>All Tasks</h4>
        <ul class="list-group">
            <li v-if='list.length === 0'>There are no tasks yet!</li>
            <li class="list-group-item" v-for="(article, index) in list">
                 {{ article.body }}

                <article-tags :articleId="article.id" :tags="article.tags"></article-tags>

                <button @click="deleteArticle(article.id)" class="btn btn-danger btn-xs pull-right">Delete</button>
            </li>
        </ul>
    </div>
</template>
<script>
    import ArticleTags from './ArticleTags.vue'
    
    export default {
        name : 'ArticleList',
        data() {
            return {
                list: [],
                newArticle: {
                    id: '',
                    body: ''
                },
            };
        },
        
        created() {

            this.$on('fetchList',function(){
                this.fetchList();
            });

            this.fetchList();
        },
        
        methods: {
            fetchList() {
                axios.get('api/articles').then((res) => {
                    this.list = res.data;
                });
            },
 
            createArticle() {
                axios.post('api/articles', this.newArticle)
                    .then((res) => {
                        this.newArticle.body = '';
                        this.edit = false;
                        this.fetchList();
                    })
                    .catch((err) => console.error(err));
            },
 
            deleteArticle(id) {
                axios.delete('api/articles/' + id)
                    .then((res) => {
                        this.fetchList()
                    })
                    .catch((err) => console.error(err));
            },
        },

        components : { ArticleTags }
    }
</script>