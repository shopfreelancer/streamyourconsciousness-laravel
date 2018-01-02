export const tagsStore = {
  state : {
    tags : [],
    activeTagFilter : [],
  },
  mutations : {
    setTags (state,  tags ) {
        state.tags = tags;
    },
    toggleTagIdInFilter (state,  {tagId} ) {
        let tagIndex = state.activeTagFilter.indexOf(tagId);
        if(tagIndex > -1){
           state.activeTagFilter.splice(tagIndex,1); 
        } else {
           state.activeTagFilter.push(tagId);
        }
    },
  },
  actions: { 
    setTagActiveFlag(context, {tags}){
        tags.forEach(function(tag){
            if(context.state.activeTagFilter.includes(tag.id)){
                tag.isActive = true;
            } else {
                tag.isActive = false;
            }
        });   
        return tags;
    }, 
    fetchTags(context) {
        axios.get('api/articles/get-tags').then((res) => {
            if(res.data.length > 0){
                let tags = res.data;
                context.dispatch('setTagActiveFlag', { tags } ).then((res) => {
                    tags = res;
                    context.commit('setTags', tags) 
                 });
            }   
        })
        .catch((err) => console.error(err));
    },
    toggleTagIdInFilter(context, { tagId }) {
        context.commit('toggleTagIdInFilter', { tagId } );
        let tagIds = context.state.activeTagFilter;
        // when filtered Tags change, we need to reset results to first page
        context.dispatch('getPaginatedArticlesByTagIds', { page:1, tagIds });
    }
  },
  getters : {}
}