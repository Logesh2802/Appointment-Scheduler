<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Availability;
use App\Models\Booking;
use Illuminate\Support\Facades\Mail;
use App\Mail\BookingConfirmed;

class BookingController extends Controller
{
    public function store(Request $request)
{
    $request->validate([
        'availability_id' => 'required|exists:availabilities,id',
        'name' => 'required',
        'email' => 'required|email'
    ]);

    $availability = Availability::find($request->availability_id);
    if ($availability->is_booked) {
        return response()->json(['error' => 'Slot already booked'], 400);
    }

    $availability->is_booked = true;
    $availability->save();

    // Save booking
    $booking = Booking::create($request->all());

    // Prepare booking data for the email
    $emailData = [
        'name' => $request->name,
        'email' => $request->email,
        'date' => $availability->date,
    ];

    // Send confirmation email
    Mail::to($request->email)->send(new BookingConfirmed($emailData));

    return response()->json(['message' => 'Booking confirmed and email sent']);
}
}
