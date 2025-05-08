<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

class BookingConfirmed extends Mailable
{
    use Queueable, SerializesModels;

    public $bookingData;

    public function __construct($bookingData)
    {
        // Store the booking data to be passed to the email view
        $this->bookingData = $bookingData;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Booking Confirmed', // The subject of the email
        );
    }

    public function content(): Content
    {
        // Return the view with the booking data to display in the email body
        return new Content(
            view: 'emails.booking.confirmed' // Make sure you have the view at resources/views/emails/booking/confirmed.blade.php
        );
    }

    public function build(): self
    {
        return $this->view('emails.booking.confirmed') // The email view
                    ->with(['bookingData' => $this->bookingData]); // Passing the booking data to the view
    }

    public function attachments(): array
    {
        // You can add attachments here if needed
        return [];
    }
}
