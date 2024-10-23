const logout = () => {
    localStorage.removeItem('authToken');
    window.location.reload(); // Refresh the page or navigate to the homepage
  };
  