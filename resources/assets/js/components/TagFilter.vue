<template>
    <div class="container" id="tag-filter">
        <span @click="filterArticlesByTagId(tag.id)" class="tag-filter-item badge badge-pill badge-secondary" v-for="tag in tags">
            {{ tag.name }} ({{ tag.articles_count }})
        </span>
    </div>
</template>

<script>
export default {
    name: 'TagFilter',
    methods : {
        filterArticlesByTagId(tagId){
            this.$store.dispatch('filterArticlesByTagId', { tagId });
        },
    },
    computed : {
        tags(){
            return this.$store.state.tags;
        }
    }
 
}
</script>

<style>
</style>