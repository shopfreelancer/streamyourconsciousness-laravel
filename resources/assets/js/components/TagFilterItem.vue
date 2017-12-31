<template>
    <span @click="toggleFilterItem(tag.id)" 
        class="tag-filter-item btn btn-sm"
        v-bind:class="[ itemIsActive ? 'btn-secondary' : 'btn-primary']"
        >
        {{ tag.name }} ({{ tag.articles_count }})
    </span>
</template>

<script>
export default {
    name: 'TagFilterItem',
    methods : {
        toggleFilterItem(tagId){
            this.itemIsActive = !this.itemIsActive;
            this.$store.dispatch('toggleTagIdInFilter', { tagId });
        }
    },
    props : ['tag'],
    data () {
      return {
        itemIsActive : false,
      }
    }
}
</script>
