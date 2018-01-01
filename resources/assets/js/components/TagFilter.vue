<template>
    <div class="container" id="tag-filter">
        <h3>Filter Tags</h3>
        <span v-for="tag in tags">
            <tag-filter-item :tag="tag"/>
        </span>
    </div>
</template>

<script>
import TagFilterItem from './TagFilterItem.vue';
export default {
    name: 'TagFilter',
    methods : {
        filterArticlesByTagId(tagId){
            this.$store.dispatch('filterArticlesByTagId', { tagId });
        },
    },
    mounted(){
        this.$store.dispatch('fetchTags');
    },
    computed : {
        tags(){
            return this.$store.state.tagsStore.tags;
        }
    },
    components : { 
        TagFilterItem 
    }
}
</script>
<style>
    #tag-filter {
        margin-bottom:20px;
    }
</style>