<?php

use Illuminate\Database\Seeder;
use App\Article;
use App\Tag;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('articles')->delete();
        $json = File::get('database/seeds/data/articles.json');
        $articles = json_decode($json);
        foreach($articles as $articleOrg){
            $article = Article::create(array(
                'text' => $articleOrg->text,
                'published' => $articleOrg->created,
            ));
      
            //$this->command->getOutput()->writeln($test);
            foreach($articleOrg->tags as $tag){
               
                $tag = Tag::firstOrCreate(array(
                    'name' => $tag
                ));
                $article->tags()->syncWithoutDetaching([$tag->id]);
            }
            
        }
    }
}
