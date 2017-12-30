<?php

use Illuminate\Database\Seeder;
use App\Article;
use App\Tag;

class ArticlesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = File::get('database/seeds/data/articles.json');
        $articlesData = json_decode($json);
        
        foreach($articlesData as $articleData){
            $article = Article::create(array(
                'text' => $articleData->text,
                'published' => $articleData->created,
            ));
      
            //$this->command->getOutput()->writeln($test);
            foreach($articleData->tags as $tag){
               
                $tag = Tag::firstOrCreate(array(
                    'name' => $tag
            ));
                $article->tags()->syncWithoutDetaching([$tag->id]);
            }
        }
    
    }
}
