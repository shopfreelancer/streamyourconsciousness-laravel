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

Route::get('api/articles/test', 'ArticleController@test');
Route::post('api/articles/new-tag', 'ArticleController@newTag');
Route::post('api/articles/delete-tag', 'ArticleController@detachTagByTagId');
Route::prefix('api')->group(function() {
    Route::resource('articles', 'ArticleController');

});

