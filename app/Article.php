<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $guarded = [];
    
    public function tags(){
        return $this->belongsToMany('App\Tag');
    }
    
    public function setPublishedAttribute($value)
    {
        $this->attributes['published'] = date("Y-m-d", strtotime($value));
    }
    
}
