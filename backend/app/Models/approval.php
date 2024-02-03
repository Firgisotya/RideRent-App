<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class approval extends Model
{
    use HasFactory;
    protected $table = 'approvals';
    protected $fillable = [
        'order_id',
        'user_id',
        'approval_date',
        'status',
        'level'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function order()
    {
        return $this->belongsTo(order::class, 'order_id', 'order_id');
    }
    
}
