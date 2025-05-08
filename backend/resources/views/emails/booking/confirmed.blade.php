<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation</title>
</head>
<body>
    <h1>Booking Confirmed!</h1>
    <p>Dear {{ $bookingData['name'] }},</p>
    <p>Your booking has been successfully confirmed. Here are your booking details:</p>
    <ul>
        <li><strong>Name:</strong> {{ $bookingData['name'] }}</li>
        <li><strong>Email:</strong> {{ $bookingData['email'] }}</li>
        <li><strong>Date:</strong> {{ $bookingData['date'] }}</li>
    </ul>
    <p>Thank you for booking with us!</p>
</body>
</html>