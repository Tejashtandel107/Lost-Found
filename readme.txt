# 🚀 Lost & Found API (Fastify + MongoDB)

A REST API built using **Fastify, MongoDB, JWT authentication, and ImageKit** for managing lost and found items.

---

# 📌 Features

- 🔐 User Authentication (Register / Login / Forgot Password)
- 📦 Report Lost / Found Items
- 🔍 Search, Filter, Pagination
- 📅 Date filtering (today, week, month)
- add item
- 👁 View single item
- ✏️ Update item
- 🗑 Delete item
- 📤 Image upload using ImageKit
- 🔒 JWT Protected Routes

---

# 🛠 Tech Stack

- Node.js
- Fastify
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt
- ImageKit
- Nodemailer

---


🌐 BASE URL
http://localhost:3000/api

----------------------------

🔐 AUTH ROUTES

➕ REGISTER
POST /auth/register

BODY:
{
  "name": "John Doe",
  "enrollmentNo": "EN12345",
  "email": "john@gmail.com",
  "contactNumber": "9876543210",
  "password": "123456",
  "confirmPassword": "123456"
}

----------------------------

🔑 LOGIN
POST /auth/login

BODY:
{
  "email": "john@gmail.com",
  "password": "123456"
}

----------------------------

📧 FORGOT PASSWORD
POST /auth/forgot-password

BODY:
{
  "email": "john@gmail.com"
}

----------------------------

📦 ITEM ROUTES

----------------------------

📤 IMAGE UPLOAD
POST /upload-image (form-data)

file: image file

RESPONSE:
{
  "status": true,
  "url": "https://ik.imagekit.io/your-image.jpg"
}

➕ REPORT ITEM
POST /items/report-item

HEADERS:
Authorization: Bearer <TOKEN>

BODY:
{
  "type": "lost",
  "itemTitle": "Wallet",
  "dateFound": "2026-04-23",
  "description": "Black wallet lost near bus stand",
  "location": "Ahmedabad",
  "name": "Tejas",
  "contactNumber": "9876543210",
  "email": "test@gmail.com",
  "image": "https://ik.imagekit.io/demo/image.jpg"
}

----------------------------

📄 GET ALL ITEMS
GET /items?page=1&limit=10&search=wallet&type=lost&dateFilter=week

----------------------------

👁 GET ITEM BY ID
GET /items/:id

----------------------------

✏️ UPDATE ITEM
PUT /items/:id

BODY:
{
  "itemTitle": "Updated Wallet",
  "location": "Mumbai"
}

----------------------------

🗑 DELETE ITEM
DELETE /items/:id

----------------------------

🔐 AUTH HEADER
Authorization: Bearer YOUR_JWT_TOKEN

----------------------------

📅 DATE FILTERS
today | week | month

