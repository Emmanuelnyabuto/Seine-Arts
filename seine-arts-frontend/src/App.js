import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar'; // Assuming you have a Navbar component
import HomePage from './pages/HomePage';  // Assuming you have a HomePage component
import ServicesPage from './pages/ServicesPage';  // Assuming you have a ServicesPage component
import ContactPage from './pages/ContactPage';  // Assuming you have a ContactPage component
import Profile from './pages/Profile'; // Importing the Profile component
import NotFoundPage from './pages/NotFoundPage'; // Optional: A 404 Not Found page

function App() {
  return (
    <Router>
      <div>
        <Navbar /> {/* Assuming you have a Navbar component */}
        
        {/* Main content */}
        <div className="content">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/services" component={ServicesPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/profile" component={Profile} /> {/* Profile route */}
            <Route component={NotFoundPage} /> {/* Fallback for 404 page */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
