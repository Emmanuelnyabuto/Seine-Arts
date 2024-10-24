# Seine Arts Platform

Seine Arts is an all-in-one platform that connects clients with creative professionals in photography, videography, sound engineering, graphic design, and software engineering. The platform allows clients to view portfolios, book services, and manage projects, while professionals can manage their portfolios, services, and payments.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
  - [Running Tests](#running-tests)
- [Page Descriptions](#page-descriptions)
- [API Endpoints](#api-endpoints)
- [Deployments](#deployments)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Home Page**: Provides an overview of the platform and allows navigation to various services.
- **Services Page**: Displays available services in a 3 by 2 or 2 by 3 grid layout (responsive).
- **Portfolio Page**: Allows clients to browse through portfolios of various professionals.
- **User Authentication**: Provides signup and login functionality for both clients and professionals.
- **Admin Dashboard**: Admins can manage users, services, jobs, and payments.
- **Payments**: Integrated payment handling (to be fully tested).
- **Responsive Design**: The platform is mobile-responsive, ensuring optimal user experience on all devices.
- **Portfolio Management**: Professionals can upload and manage portfolios.

## Tech Stack

### Frontend

- **React.js**: Component-based architecture.
- **React Router**: For navigation and page routing.
- **CSS Grid/Flexbox**: For responsive layout design.
- **Axios**: For handling HTTP requests.
  
### Backend

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for building API endpoints.
- **MongoDB**: Database to store user data, service data, and portfolio details.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT**: Token-based authentication system.

### Hosting

- **Frontend**: Deployed on **Vercel**.
- **Backend**: Deployed on **Render**.

## Project Structure

```
seine-arts-frontend/
├── public/                    # Public assets
│   ├── images/                 # Images used in the project
│   └── index.html              # Main HTML file
├── src/                        # Main source folder
│   ├── components/             # Reusable components (Navbar, Footer, etc.)
│   ├── pages/                  # Page components (Home, Services, Portfolio, etc.)
│   ├── services/               # Services and APIs (e.g., contact, portfolio)
│   ├── App.js                  # Main App file
│   ├── index.js                # Main React DOM rendering
│   ├── servicesPage.css        # CSS for the services page layout
│   ├── ...                     # Other style files
└── .env                        # Environment variables for frontend

seine-arts-backend/
├── models/                     # MongoDB models (User, Portfolio, Contact, etc.)
├── routes/                     # API route handlers (services, portfolios, etc.)
├── controllers/                # Controllers for handling business logic
├── server.js                   # Main server file (Node.js/Express)
└── .env                        # Environment variables for backend

```

## Environment Variables

In both frontend and backend, create `.env` files for storing environment variables.

### Frontend `.env`

```plaintext
REACT_APP_API_URL=http://localhost:5000/api    # Backend API URL
REACT_APP_MONGO_URI=your-mongodb-uri           # MongoDB URI
```

### Backend `.env`

```plaintext
PORT=5000                                     # Port for the backend server
MONGO_URI=your-mongodb-uri                    # MongoDB URI
JWT_SECRET=your-secret-key                    # JWT secret key for authentication
```

## Getting Started

### Prerequisites

To run this project, you’ll need the following installed on your machine:

- **Node.js** (v12 or higher)
- **npm** or **yarn**
- **MongoDB** (local instance or cloud-based using MongoDB Atlas)
- **Vercel** account for frontend deployment (optional)
- **Render** account for backend deployment (optional)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/seine-arts.git
   cd seine-arts
   ```

2. Install dependencies for both the frontend and backend:

   ```bash
   cd seine-arts-frontend
   npm install
   
   cd ../seine-arts-backend
   npm install
   ```

3. Create `.env` files in both the frontend and backend directories with the required environment variables (as described above).

### Running the Project

1. Start the backend server:

   ```bash
   cd seine-arts-backend
   npm start
   ```

2. Start the frontend development server:

   ```bash
   cd seine-arts-frontend
   npm start
   ```

### Running Tests

To run unit tests or integration tests, use the following commands in both `frontend` and `backend` directories:

```bash
npm test
```

## Page Descriptions

### Home Page

The Home Page provides an introduction to the platform and contains links to the Services and Portfolio sections.

### Services Page

Displays the different services offered by Seine Arts in a **2 by 3** or **3 by 2** grid layout, including:

- Photography
- Videography
- Sound Engineering
- Graphic Design
- Software Engineering

### Portfolio Page

Showcases the portfolios of the various professionals registered on the platform. Clients can browse portfolios before booking services.

### Admin Dashboard

Only accessible by users with the role of "admin". Admins can manage users, services, portfolios, and payments.

## API Endpoints

| Method | Endpoint              | Description                         |
|--------|-----------------------|-------------------------------------|
| POST   | `/api/auth/login`      | Logs in a user                      |
| POST   | `/api/auth/signup`     | Registers a new user                |
| GET    | `/api/services`        | Fetches all available services      |
| GET    | `/api/portfolio`       | Retrieves all portfolios            |
| POST   | `/api/contact`         | Sends a contact message             |
| PUT    | `/api/admin/users`     | Admin updates user information      |
| DELETE | `/api/admin/users/:id` | Admin deletes a user                |

### Example API Response

```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "service": "Photography",
      "description": "Capture your moments with professional photography services."
    },
    {
      "id": "2",
      "service": "Videography",
      "description": "High-quality videography for events, promotions, and more."
    }
  ]
}
```

## Deployments

- **Frontend**: Hosted on Vercel (automatic deployments via GitHub).
- **Backend**: Hosted on Render (auto-deploys on Git pushes).

### Deploying to Vercel

1. Login to Vercel and create a new project.
2. Link your repository and configure environment variables.
3. Deploy the project.

### Deploying to Render

1. Create a new service on Render.
2. Link your GitHub repository and configure environment variables.
3. Deploy the backend.

## Contributing

Contributions are welcome! Please follow the steps below to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License.
```

---

### Commit Message

```bash
"Updated README with project structure, environment variables, and deployment steps. Updated Services page layout."
```