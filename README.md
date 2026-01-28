# 🏫 Darul Uloom - School Management System

Darul Uloom Online is a full-stack **MERN (MongoDB, Express, React, Node.js)** web application built to manage the digital operations of an Islamic educational institute. The platform enables administrators to manage courses and content efficiently while providing a simple, accessible interface for students and visitors.

This application was developed as a freelance client project, with a focus on real-world requirements, production deployment, and long-term maintainability.

### 🚀 Live Website
* **🔗 Website:** [https://darululoom.online](https://darululoom.online)
* **🔗 Render URL:** [https://darululoom-frontend.onrender.com](https://darululoom-frontend.onrender.com)

---

## ✨ Features

* **👨‍💼 Admin Dashboard:** Secure authentication-based access for administrators to manage system data.
* **📚 Course Management:** Create, update, and delete courses dynamically.
* **🌐 Public User Interface** Visitors can view course details, about sections, and contact information.
* **🔐 Authentication:** JWT-based authentication for protected admin routes.
* **💻📱 Responsive Design:** Fully optimized for mobile and desktop screens.
* **☁️ Cloud Database:** Persistent data storage using MongoDB Atlas.
* **📲Progressive Web App (PWA):** Supports app installation with a custom in-app install prompt on supported browsers, providing an app-like experience.

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
git clone https://github.com/adabismail/darululoom-online.git
cd darululoom-online
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
ADMIN_EMAIL=example@example.com
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

### **Developed by Adab Ismail**


