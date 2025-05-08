<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Availability;

class AvailabilityController extends Controller
{
    public function getByDate($date) {
        // Fetch the data from the database
        
        $availabilities = Availability::where('date', $date)->get();

        // Return the data as JSON
        return response()->json($availabilities);
    }
}