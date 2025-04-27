# Blogify – MERN Stack Blog Web App ✍️

A powerful blogging platform built with MongoDB, Express.js, React, and Node.js to deliver a secure and feature-rich writing experience.

## 💡 Project Overview

Blogify is a full-stack web application that enables users to register, log in securely, create blogs, edit content, and manage posts through a modern, responsive interface. The platform emphasizes a seamless user experience with real-time updates and efficient content management.

Key components include:

1. **Backend API**: Built with Express.js and Node.js, featuring RESTful routes for blog and user management.
2. **Frontend Client**: React.js-powered dynamic interface with a focus on minimalism and responsiveness.
3. **Authentication**: JWT-based authentication ensures secure access to user-specific functionalities.

This project was completed over two weeks, strengthening my expertise in full-stack development, API design, and authentication workflows.  
_Originally hosted on Heroku; but the free trial has expired now._ 🙂

## ⚡ Technologies Used
- **MongoDB**
- **Express.js**
- **React.js**
- **Node.js**
- **JWT (JSON Web Tokens)**
- **Vanilla CSS**

## 🛠 Key Dependencies
- `axios`
- `react-router-dom`
- `jsonwebtoken`
- `bcryptjs`

## 🚦 Local Setup Instructions

Follow these steps to run Blogify on your local machine:

### 1️⃣ Prerequisites
- Node.js (v14 or above)
- MongoDB Atlas account or local MongoDB server

### 2️⃣ Configure Environment Variables

Create a `.env` file at the root of your project and add:

```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 3️⃣ Backend Setup
1. Navigate to the project root:
   ```bash
   cd mern_blog_app
   ```
2. Install server dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Server will run at [http://localhost:5000](http://localhost:5000)

### 4️⃣ Frontend Setup
The frontend is integrated into the same project structure.

- Frontend starts automatically when you visit the deployed link.

### 5️⃣ User Authentication
- **Register**: New users can sign up.
- **Login**: Access using secure JWT tokens.
- **Protected Routes**: Only logged-in users can create, edit, or delete blogs.

## 🌍 Demo Preview
<details>
  <summary>📸 Click to expand screenshots</summary>

  <img src='https://github.com/user-attachments/assets/2d9000f7-edc2-4a2b-ac04-61b5ce47d034' width="100%"/>
  <img src='https://github.com/user-attachments/assets/cde2a720-8e32-45b0-9e81-2e0017bff0f3' width="100%"/>
  <img src='https://github.com/user-attachments/assets/9ad32485-a334-45fe-836b-682351fcb6db' width="100%"/>

</details>
