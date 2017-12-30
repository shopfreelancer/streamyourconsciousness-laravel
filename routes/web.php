<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('api/articles/new-tag', 'ArticleController@attachNewTag');
Route::post('api/articles/delete-tag', 'ArticleController@detachTagByTagId');
Route::get('api/articles/get-tags', 'ArticleController@getTags');
Route::post('api/articles/filter-articles-by-tag', 'ArticleController@filterArticlesByTagId');


Route::get('api/articles/test', 'ArticleController@test');
Route::prefix('api')->group(function() {
    Route::resource('articles', 'ArticleController');
});
