<template>
  <div id="app">
      <div class="container">
        <div class="jumbotron">
            <div class="article-create-wrap">
                <h1>Stream your consciousness</h1>
                <p>A small micro blog made with Vue.js. There is no server attached, the data is stored in the localstorage of the browser. <github/></p>
                <article-create/>
                
            </div>
        </div>
    </div>
    <tag-filter/>
    <article-list/>
    <footer>
        <div class="container">
            <div class="row">
                <div class="col-12 col-sm-9">
                    <p class="text-muted text-center text-sm-right">
                      Built by <a href="https://www.shop-freelancer.de" target="_blank">Hans-Christian Psaar | Shop Freelancer</a>
                      <br>
                      <github/>
                    </p>
                </div>
            </div>

        </div>
    </footer>
  </div>
</template>

<script>
import ArticleList from './ArticleList.vue'
import ArticleCreate from './ArticleCreate.vue'
import TagFilter from './TagFilter.vue'
import store from '../store/index.js'

export default {
    name: 'app',
    store,
    components : {
        ArticleList,
        ArticleCreate,
        TagFilter,
        Github : {
            template: '<span>Source code <i class="fa fa-code"></i> available on <a href="https://github.com/shopfreelancer/streamyourconsciousness" target="_blank"><i class="fa fa-github"></i> GitHub</a></span>'
        }
    }
}
</script>

<style>
    #app {
        max-width:680px;
        margin:0 auto;
    }
    .button-reset-wrap {
        padding-bottom:10px;
    }
</style>