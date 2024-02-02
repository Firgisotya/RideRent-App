<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class order extends Model
{
    use HasFactory;
    protected $table = 'orders';
    protected $fillable = [
        'order_id',
        'user_id',
        'vehicle_id',
        'employee_name',
        'drriver_name',
        'order_date',
        'date_of_return',
        'approval_status',
        'rent_satatus',
        'information'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function approval()
    {
        return $this->hasMany(Approval::class, 'order_id', 'order_id');
    }
    
}
