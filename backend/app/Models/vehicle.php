<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class vehicle extends Model
{
    use HasFactory;
    protected $table = 'vehicles';
    protected $guarded = ['id'];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }


}
