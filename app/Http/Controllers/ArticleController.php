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
            'text' => 'required|min:3'
        ]);
        return Article::create([ 'text' => request('text') ]);
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
    public function attachNewTag(Request $request)
    {
        $tag = \App\Tag::firstOrCreate(array('name' => $request->tagName));
        $article = Article::with('Tags')->findOrFail($request->articleId);
        
        // attach tag to pivot table only once
        $article->tags()->syncWithoutDetaching([$tag->id]);
    
        return response()->json($article->tags);
    }
    
     /**
     * Remove Tag from Article
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function detachTagByTagId(Request $request)
    {   
 
        $article = Article::with('Tags')->find($request->articleId);
        $article->tags()->detach([$request->tagId]);
        
        $this->cleanUpTags();
        
        return response()->json($article->tags);
    }
    
     /**
     * @todo: remove
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function test(Request $request)
    {
        $tag = \App\Tag::latest()->with('articles')->find(18);
        return $tag->articles;
        $tags = \App\Tag::latest()->withCount('articles')->get();
        /*
        $articles = \App\Article::whereHas('tags', function ($query) {
            $query->where('name', '=', 'hello');
        })->get();
        */
        $articles = \App\Article::with('tags')->get();
        return \App\Tag::latest()->withCount('articles')->get();
        
        return response($articles, 200);
    }
    
    /**
     * Delete Tags that are not attached to an Article
     */
    public function cleanUpTags()
    {
        $tags = \App\Tag::latest()->withCount('articles')->get();
        
        foreach($tags as $tag){
            if($tag->articles_count === 0){
                $tag->delete();
            }
        }
    }
    
    public function getTags()
    {
        return \App\Tag::latest()->withCount('articles')->get();
    }
    
    public function filterArticlesByTagId(Request $request)
    {
        $tag = \App\Tag::latest()->with('articles')->find($request->tagId);
        return $tag->articles;
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