//var Vue = require('vue');
//var ArticleTags = require('../../resources/assets/js/components/ArticleTags.vue');

import Vue from 'vue'
import ArticleTags from '../../resources/assets/js/components/ArticleTags.vue';

describe('ArticleTags', function() {
	it('should toggle Field', function() {
            const defaultData = ArticleTags.data();
            console.log(defaultData);
		ArticleTags.toggleTagInputField();
                });
	});
