<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $guarded = [];
    protected $fillable = ['name'];
    protected $hidden = ['created_at','updated_at','pivot'];

    
    public function articles(){
        return $this->belongsToMany('App\Article');
    }
}
