<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $table = 'bookings';
    protected $fillable = [
        'availability_id',
        'name',
        'email',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'updated_at',
    ];
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */

    public function availability()
    {
        return $this->belongsTo(Availability::class);
    }
}
