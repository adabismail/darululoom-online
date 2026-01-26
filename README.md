# 🏫 Darul Uloom - School Management System

A full-stack **MERN (MongoDB, Express, React, Node.js)** application designed to manage the operations of an Islamic educational institute (Darul Uloom). This system allows administrators ("Moulvi Sahab") to manage students, courses, and content dynamically.

### 🚀 Live Website
* **🔗 Website:** [https://darululoom.online](https://darululoom.online)
* **🔗 Render URL:** [https://darululoom-frontend.onrender.com](https://darululoom-frontend.onrender.com)

---

## ✨ Features

* **👨‍💼 Admin Dashboard:** Secure login for the administrator to manage the entire system.
* **📚 Course Management:** Add, edit, and delete courses dynamically.
* **📝 Student/User View:** Visitors can view course details, about sections, and contact information.
* **🔐 Authentication:** Secure JWT (JSON Web Token) authentication for admin routes.
* **📱 Responsive Design:** Fully optimized for mobile and desktop screens.
* **☁️ Cloud Database:** Data is stored securely on MongoDB Atlas.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS, Vite
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Deployment:** Render

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally on your machine.

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_GITHUB_USERNAME/darul-uloom.git](https://github.com/YOUR_GITHUB_USERNAME/darul-uloom.git)
cd darul-uloom
```
### 2. Backend Setup
Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```
Create a .env file in the backend folder and add your credentials:

```bash
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
ADMIN_PHONE=your_admin_phone
```
Start the server:
```bash
npm start
```
### 3. Frontend Setup
Open a new terminal, navigate to the frontend folder, and install dependencies:

```bash
cd frontend
npm install
```
Create a .env file in the frontend folder with the following keys: (Note: For local development, point the API URL to localhost)
```bash
REACT_APP_ADMIN_PHONE=your_admin_phone
REACT_APP_API_URL=http://localhost:5000/api
```
Start the React app:

```bash
npm run dev
```
## 🛡️ Admin Access
To access the admin panel, navigate to /login.

* **Default Admin Name:** Moulvi Sahab

* **Role:** Admin

---

### **Made with ❤️ by Adab Ismail**


