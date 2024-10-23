# **Seine Arts Platform**

## **Overview**
Seine Arts is an all-in-one creative service platform where clients can request and book creative professionals for services like photography, videography, sound engineering, graphic design, and software engineering. The platform showcases portfolios of past work, allowing clients to browse through examples before making a booking. Professionals manage their own portfolios and work on projects assigned by the platform admin. Admins manage users, services, jobs, and payment workflows.

The platform consists of a **React frontend** hosted on **Vercel** and a **Node.js/Express backend** hosted on **Render**, connected to a **MongoDB database** hosted on **MongoDB Atlas**. The content, such as portfolios and services, is managed using **Contentful** (a headless CMS), and **PayPal** handles payment transactions.

---

## **Key Features**

### **Role-Based Access**
- **Client**:
  - Can browse portfolios and services.
  - Can request services and make payments.
  - Can track their own projects through the client dashboard.
  - Can update their personal profile.

- **Professional**:
  - Can view assigned jobs and update their status.
  - Can manage their own portfolio items (add, edit, or remove).
  - Can update personal profile information.

- **Admin**:
  - Full platform management, including:
    - Managing user roles (promote, demote, or delete users).
    - Assigning jobs to professionals.
    - Managing portfolios and service listings.
    - Handling payments and viewing transactions.

### **Portfolio Management**
- **Admins** and **Professionals** can manage portfolios by adding or editing past work.
- Portfolios are dynamically fetched from **Contentful** and displayed to clients.

### **Service Request and Job Assignment**
- Clients can request services by submitting a service request.
- Admins assign jobs to professionals based on client requests.

### **Secure Payments**
- The platform integrates **PayPal** to handle payments securely.
- Payment records are stored and linked to service requests.

### **Contentful CMS Integration**
- Dynamic content such as portfolios and services is managed via **Contentful**, allowing non-developers to update the content without needing to code.

---

## **Technology Stack**

### **Frontend** (React, hosted on Vercel)
- **React.js**: UI framework for building interactive pages.
- **React Router**: Handles client-side routing.
- **Axios**: For making HTTP requests to the backend API.
- **Contentful**: Headless CMS for managing content dynamically.
- **Vercel**: Platform used for hosting the frontend.

### **Backend** (Node.js & Express, hosted on Render)
- **Node.js** & **Express.js**: Backend framework for handling API requests.
- **MongoDB**: NoSQL database for storing user, project, and job data.
- **Mongoose**: ORM for MongoDB.
- **JWT**: Token-based authentication for user sessions.
- **PayPal API**: For handling payments.
- **Render**: Platform used for hosting the backend.

### **Database**
- **MongoDB Atlas**: Cloud-based MongoDB for storing all platform data, including users, portfolios, jobs, and payments.

### **CMS**
- **Contentful**: Used for managing portfolios and service descriptions via a user-friendly CMS interface.

---

## **Setup and Installation**

### **Prerequisites**
- **Node.js** installed locally.
- **MongoDB Atlas** account for managing the database.
- **Contentful** account for managing dynamic content.
- **PayPal Developer Account** for API integration.

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/Seine-Arts.git
cd Seine-Arts
```

### **2. Backend Setup (Node.js/Express on Render)**

#### **Navigate to the Backend Directory**:
```bash
cd seine-arts-backend
```

#### **Install Dependencies**:
```bash
npm install
```

#### **Set Up Environment Variables**:
Create a `.env` file in the root of the backend (`seine-arts-backend`) with the following keys:

```bash
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_SECRET=your-paypal-secret
```

#### **Run Backend Locally**:
To test the backend locally, run:

```bash
npm start
```

The backend will run on `http://localhost:5000`.

#### **Deploy Backend to Render**:
1. Push the code to your GitHub repository.
2. In your Render dashboard:
   - Create a new **Web Service**.
   - Link it to the backend repository.
   - Set environment variables in the Render dashboard (`MONGO_URI`, `JWT_SECRET`, `PAYPAL_CLIENT_ID`, etc.).
   - Deploy the backend.

### **3. Frontend Setup (React on Vercel)**

#### **Navigate to the Frontend Directory**:
```bash
cd seine-arts-frontend
```

#### **Install Dependencies**:
```bash
npm install
```

#### **Set Up Environment Variables**:
Create a `.env` file in the root of the frontend (`seine-arts-frontend`) with the following keys:

```bash
REACT_APP_API_URL=https://your-backend-url.onrender.com
REACT_APP_CONTENTFUL_SPACE_ID=your-contentful-space-id
REACT_APP_CONTENTFUL_ACCESS_TOKEN=your-contentful-access-token
```

#### **Run Frontend Locally**:
To test the frontend locally, run:

```bash
npm start
```

The frontend will run on `http://localhost:3000`.

#### **Deploy Frontend to Vercel**:
1. Push the code to your GitHub repository.
2. In your Vercel dashboard:
   - Create a new project.
   - Link it to the frontend repository.
   - Set environment variables (`REACT_APP_API_URL`, `REACT_APP_CONTENTFUL_SPACE_ID`, `REACT_APP_CONTENTFUL_ACCESS_TOKEN`) in Vercel.
   - Deploy the frontend.

---

## **CMS Setup (Contentful)**

1. **Create Contentful Space**:
   - Log in to Contentful and create a new space.
   - Add content types for **Portfolio** and **Services**.

2. **Set Up Content Models**:
   - **Portfolio**:
     - Title (Text)
     - Description (Rich Text)
     - Images (Media)
     - Category (Text)
     - Date (Date)
   
   - **Services**:
     - Title (Text)
     - Description (Rich Text)
     - Icon (Media)

3. **Add Content**:
   - Populate your Contentful space with portfolios and services.

4. **Use Contentful API**:
   - Use the Contentful **API** to fetch and display content dynamically in your React frontend.

---

## **API Endpoints**

### **Authentication**:
- **POST /api/auth/signup**: Register a new user.
- **POST /api/auth/login**: Log in a user.
- **POST /api/auth/logout**: Log out a user.

### **Users**:
- **GET /api/users**: Get a list of users (Admin only).
- **PUT /api/users/promote/:id**: Promote a user to admin (Admin only).
- **DELETE /api/users/:id**: Delete a user (Admin only).

### **Portfolios**:
- **GET /api/portfolios**: Fetch all portfolio items.
- **POST /api/admin/portfolio**: Add a portfolio (Admin/Professional).

### **Jobs**:
- **GET /api/jobs**: Fetch all job assignments (Admin only).
- **POST /api/jobs/assign**: Assign a job to a professional (Admin only).

### **Payments**:
- **POST /api/paypal/create-payment**: Create a PayPal payment.
- **POST /api/paypal/execute-payment**: Execute a PayPal payment.

---

## **User Roles and Access**

### **Clients**:
- View portfolios, services, and submit requests.
- Manage their own projects and profile.

### **Professionals**:
- View assigned jobs.
- Manage their own portfolio.

### **Admins**:
- Full control over the platform.
- Manage users, jobs, portfolios, and services.

---

## **Deployment Steps**

1. **Backend (Render)**:
   - Ensure that environment variables are set in the Render dashboard.
   - Link your Render service to the backend repository and deploy.

2. **Frontend (Vercel)**:
   - Ensure that environment variables are set in Vercel.
   - Link your Vercel project to the frontend repository and deploy.

---

## **License**
This project is licensed under the MIT License.

---

## **Contributing**
Contributions are welcome! Please open an issue or submit a pull request for major changes.