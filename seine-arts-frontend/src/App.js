import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      // Decode token and set user
      const decodedUser = JSON.parse(atob(authToken.split('.')[1])); // Simplified decoding
      setUser(decodedUser);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} logout={logout} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {user && user.role === 'admin' && (
          <Route path="/admin" component={AdminDashboard} />
        )}
      </Switch>
    </Router>
  );
};

export default App;
