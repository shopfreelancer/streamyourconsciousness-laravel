<?php

namespace App\Http\Controllers;

use App\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Article::latest()->with('Tags')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'body' => 'required|min:3'
        ]);
        return Article::create([ 'body' => request('body') ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function show(Article $article)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function edit(Article $article)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Article $article)
    {
        
    }
  
    /**
     * Attach Tag to Article. If Tag doesn´t exist, create it.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function newTag(Request $request)
    {
        $tag = \App\Tag::firstOrCreate(array('name' => $request->tagName));
        $article = Article::findOrFail($request->articleId);
        
        // attach tag to pivot table only once
        $article->tags()->syncWithoutDetaching([$tag->id]);
    
        return response()->json(['tagId' => $tag->id]);
        
    }
    
     /**
     * Remove Tag from Article
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function deleteTag(Request $request)
    {   
        $tag = \App\Tag::firstOrCreate(array('name' => $request->tagName));
        $article = Article::findOrFail($request->articleId);
        
        $result = $article->tags()->detach([$tag->id]);
        
        $this->cleanUpTags();
        
        return response('true', 200);
    }
    
     /**
     * @todo: remove
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function test(Request $request)
    {
        $tags = \App\Tag::latest()->withCount('articles')->get();
        $articles = \App\Article::whereHas('tags', function ($query) {
            $query->where('name', '=', 'hello');
        })->get();
        
        
        return response($tags, 200);
    }
    
    /**
     * Delete Tags that are not attached to an Article
     */
    public function cleanUpTags(){
        $tags = \App\Tag::latest()->withCount('articles')->get();
        
        foreach($tags as $tag){
            if($tag->articles_count === 0){
                $tag->delete();
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function destroy(Article $article)
    {
        $article = Article::findOrFail($id);
        $article->delete();
        return 204;
    }
}
