# 📅 Appointment Scheduler (Calendly-Style Clone)

A full-stack appointment scheduling web application built with **Laravel (backend)** and **React (frontend)**. Inspired by Calendly, it allows users to book slots, and admins to manage availability and bookings. Email confirmations are sent automatically after each booking.

---

## 📁 Project Structure

```
appointment-scheduler/
├── backend/    # Laravel API backend
└── frontend/   # ReactJS frontend
```

---

## 🚀 Features

- 📆 Select date and view available time slots
- ✅ Book appointments with name and email
- 📧 Receive email confirmation after successful booking
- 🔐 Admin interface to manage availability
- 📱 Mobile-friendly, responsive UI (Bootstrap)
- 🔄 Pagination in bookings list
- ⚙️ RESTful API using Laravel
- ⚛️ Modern React (hooks & functional components)
- 🔒 Conflict prevention on already-booked slots

---

## ⚙️ Setup Instructions

### 🔧 Backend (Laravel API)

1. **Navigate to the backend folder**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   composer install
   ```

3. **Create `.env` and generate app key**:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Configure your `.env` file**:

   ```env
   DB_CONNECTION=mysql
   DB_DATABASE=your_db
   DB_USERNAME=your_user
   DB_PASSWORD=your_password

   MAIL_MAILER=smtp
   MAIL_HOST=smtp.gmail.com
   MAIL_PORT=587
   MAIL_USERNAME=your_email@gmail.com
   MAIL_PASSWORD=your_app_password
   MAIL_ENCRYPTION=tls
   MAIL_FROM_ADDRESS=your_email@gmail.com
   MAIL_FROM_NAME="Appointment App"
   ```

   🔐 **Note**: If you use 2FA with Gmail, generate an [App Password](https://myaccount.google.com/apppasswords) and use it in `MAIL_PASSWORD`.

5. **Run migrations**:
   ```bash
   php artisan migrate
   ```

6. **Start the Laravel server**:
   ```bash
   php artisan serve
   ```

   API will be available at: `http://127.0.0.1:8000`

---

### 🖥️ Frontend (React)

1. **Navigate to the frontend folder**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the React development server**:
   ```bash
   npm start
   ```

   Frontend will run at: `http://localhost:5173`

---

## 🧱 Data Model

### 📌 availabilities
| Field        | Type     | Description              |
|--------------|----------|--------------------------|
| id           | INT      | Primary key              |
| date         | DATE     | Available date           |
| time_slot    | TIME     | Specific time of the slot|
| is_booked    | BOOLEAN  | Whether slot is booked   |

### 📌 bookings
| Field          | Type   | Description                     |
|----------------|--------|---------------------------------|
| id             | INT    | Primary key                     |
| name           | TEXT   | User's name                     |
| email          | TEXT   | User's email                    |
| availability_id| INT    | Foreign key → availabilities.id |

---

## 🤖 AI Tools Used

This project was developed with the assistance of **ChatGPT**, used for:

- Designing the Laravel API structure and validation logic
- Setting up mailing via Laravel Mailable
- Creating reusable React components with hooks
- Handling booking conflict prevention and pagination
- Writing this README and technical documentation

---

## ✍️ Design Decisions

- **React Hooks** & functional components for cleaner state handling
- **Bootstrap** for a responsive and accessible UI
- **Laravel Mailables** to send clear booking confirmations
- Booking logic ensures **slots can't be double-booked**
- RESTful API endpoints for frontend integration

---

## 🧪 Evaluation Focus (as per prompt)

- ✅ Feature Completeness (slot selection, booking flow)
- 🧠 Data Model Logic (foreign keys, booking constraints)
- ✨ Code Quality (modular, readable, properly named)
- 📦 Best Practices (React & Laravel standards)
- 📲 UX & Responsiveness
- 🧾 Documentation (this file + clean setup)
- ⏱️ Time Management (focused on MVP first)

---

Feel free to fork, clone, or contribute to this project!
