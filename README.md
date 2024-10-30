# **Seine Arts Platform**

The Seine Arts Platform is a web application for connecting clients with professionals in various creative fields, including photography, videography, sound engineering, graphic design, and software engineering. The platform allows clients to browse portfolios, place orders, and enables admins to manage orders and assign professionals. 

## **Table of Contents**

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
4. [Environment Variables](#environment-variables)
5. [Folder Structure](#folder-structure)
6. [Endpoints](#endpoints)
7. [Screenshots](#screenshots)
8. [Troubleshooting](#troubleshooting)

---

## **Features**

### **User Roles**
- **Client:** Can view portfolios, order services, and track their orders.
- **Admin:** Can view all orders, assign professionals, and manage portfolio content.
- **Professional:** Can view assigned orders.

### **Functionality**
- **Portfolio Browsing:** View portfolios categorized by service type (e.g., Photography, Videography).
- **Order Management:** Clients can place orders for specific services, which can be viewed and assigned by admins.
- **Professional Assignment:** Admins can assign professionals to specific orders.
- **Portfolio Management:** Admins can upload media files (images/videos) to display portfolios for different service categories.

---

## **Tech Stack**

### **Frontend**
- **React**: For building the user interface.
- **Axios**: For making HTTP requests to the backend.
- **React Router**: For client-side routing.

### **Backend**
- **Node.js**: Server runtime.
- **Express.js**: For creating the server and APIs.
- **MongoDB**: Database to store user, order, and portfolio data.
- **Mongoose**: For MongoDB object modeling.
- **Multer**: For handling file uploads.

---

## **Getting Started**

### **Prerequisites**

Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

### **Installation**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/seine-arts.git
   cd seine-arts
   ```

2. **Install backend dependencies:**
   ```bash
   cd seine-arts-backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../seine-arts-frontend
   npm install
   ```

4. **Set up MongoDB:**
   - Ensure MongoDB is running locally or provide a MongoDB URI in your environment variables.

5. **Environment Variables:**
   - Set up `.env` files for both frontend and backend as specified below.

6. **Run the application:**
   - **Backend:** From `seine-arts-backend`, run:
     ```bash
     npm start
     ```
   - **Frontend:** From `seine-arts-frontend`, run:
     ```bash
     npm start
     ```

---

## **Environment Variables**

### **Backend (.env)**

Create a `.env` file in the `seine-arts-backend` directory with the following variables:

```plaintext
MONGO_URI=your_mongo_database_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

### **Frontend (.env)**

Create a `.env` file in the `seine-arts-frontend` directory with the following variable:

```plaintext
REACT_APP_API_URL=http://localhost:5000
```

---

## **Folder Structure**

### **Backend (`seine-arts-backend`)**
```plaintext
├── models
│   ├── User.js             # User model with roles
│   ├── Order.js            # Order model for service orders
│   └── Portfolio.js        # Portfolio model for media content
├── routes
│   ├── contactRoutes.js    # Contact form endpoint
│   ├── orderRoutes.js      # Order management endpoints
│   ├── userRoutes.js       # User authentication & management endpoints
│   └── portfolioRoutes.js  # Portfolio management endpoints
├── middleware
│   └── authMiddleware.js   # Middleware for role-based access control
├── server.js               # Express server setup
└── .env                    # Environment variables
```

### **Frontend (`seine-arts-frontend`)**
```plaintext
├── src
│   ├── components
│   │   ├── Navbar.js               # Top navigation bar
│   │   └── ProtectedRoute.js       # Role-based route protection
│   ├── pages
│   │   ├── HomePage.js             # Home page
│   │   ├── LoginPage.js            # Login page
│   │   ├── SignupPage.js           # Signup page
│   │   ├── Profile.js              # Profile page for user info
│   │   ├── PortfolioPage.js        # Portfolio browsing page
│   │   ├── AdminDashboard.js       # Admin control panel
│   │   ├── ClientDashboard.js      # Client-specific dashboard
│   │   └── ProfessionalDashboard.js# Dashboard for professionals
│   └── App.js                      # Main application file
└── .env                             # Frontend environment variables
```

---

## **Endpoints**

### **Backend API Endpoints**

| HTTP Method | Endpoint                  | Description                                             | Access      |
|-------------|---------------------------|---------------------------------------------------------|-------------|
| `POST`      | `/api/users/signup`       | User signup                                             | Public      |
| `POST`      | `/api/users/login`        | User login                                              | Public      |
| `GET`       | `/api/users?role=role`    | Fetch users by role (e.g., professionals)               | Admin only  |
| `POST`      | `/api/orders`             | Place a new order                                       | Client only |
| `GET`       | `/api/orders`             | Fetch all orders                                        | Admin only  |
| `PUT`       | `/api/orders/:id/assign`  | Assign a professional to an order                       | Admin only  |
| `POST`      | `/api/portfolios/upload`  | Upload portfolio content                                | Admin only  |
| `GET`       | `/api/portfolios`         | Fetch portfolios by service category                    | Public      |

---

## **Screenshots**

**1. Admin Dashboard:**
   - Admins can view all orders, assign professionals, and upload portfolio content.

**2. Portfolio Page:**
   - Clients can view portfolios categorized by services.

**3. Client Dashboard:**
   - Clients can view their orders and track progress.

Screenshots can be added here to showcase these functionalities.

---

## **Troubleshooting**

- **404 Errors on API Requests:**
  - Ensure the backend server is running on port `5000` or update the `REACT_APP_API_URL` in the frontend `.env` file.

- **Unauthorized Errors:**
  - Ensure that the token is stored in `localStorage` upon login and is included in the `Authorization` headers for protected routes.

- **File Upload Errors (Multer):**
  - Ensure the `uploads/` directory exists in `seine-arts-backend`.
  - Check file permissions in the `uploads/` directory.

- **Database Connection Issues:**
  - Ensure MongoDB is running and the `MONGO_URI` in `.env` is correctly configured.

---

## **License**

This project is licensed under the MIT License.