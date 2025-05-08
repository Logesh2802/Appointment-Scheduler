<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Availability;
use Carbon\Carbon;

class AdminAvailabilityController extends Controller
{
    public function store(Request $request)
{
    $validated = $request->validate([
        'date' => 'required|date',
        'start_time' => 'required',
        'end_time' => 'required',
    ]);

    $availability = Availability::create($validated);
    return response()->json($availability, 201);
}

public function update(Request $request, $id)
{
    $availability = Availability::findOrFail($id);

    $validated = $request->validate([
        'date' => 'required|date',                // Accepts "2025-05-10"
        'start_time' => 'required|date_format:H:i', // Accepts "10:30"
        'end_time' => 'required|date_format:H:i',   // Accepts "11:30"
        'is_booked' => 'boolean',
    ]);

    $availability->update($validated);

    return response()->json(['message' => 'Updated successfully']);
}

public function destroy($id)
{
    $availability = Availability::findOrFail($id);
    $availability->delete();

    return response()->json(['message' => 'Deleted successfully']);
}

public function getAvailabilities()
{
    $availabilities = Availability::all()->map(function ($avail) {
        return [
            'id' => $avail->id,
            'date' => Carbon::parse($avail->date)->format('Y-m-d'),
            'start_time' => Carbon::parse($avail->start_time)->format('H:i'),
            'end_time' => Carbon::parse($avail->end_time)->format('H:i'),
            'is_booked' => $avail->is_booked,
        ];
    });

    return response()->json($availabilities);
}

}
