<template>
    <div class="container" id="tag-filter">
        <h3>Filter Results</h3>
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
    computed : {
        tags(){
            return this.$store.state.tags;
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