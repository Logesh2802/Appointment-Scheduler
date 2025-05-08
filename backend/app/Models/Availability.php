<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Availability extends Model
{
    protected $table = 'availabilities';
    protected $fillable = [
        'date',
        'start_time',
        'end_time',
        'is_booked',
    ];

    protected $casts = [
        'date' => 'date',
        'start_time' => 'datetime:H:i',
        'end_time' => 'datetime:H:i',
        'is_booked' => 'boolean',
    ];
}
