app.factory('authService', function() {
    // Set the token in localStorage
    const setToken = function(token) {
        localStorage.setItem('authToken', token);
    };
  
    // Get the token from localStorage
    const getToken = function() {
        return localStorage.getItem('authToken');
    };
  
    // Set role in localStorage
    const setRole = function(role) {
        localStorage.setItem('userRole', user.role);
    };
  
    // Get role from localStorage
    const getRole = function() {
        return localStorage.getItem('userRole');
    };
  
    // Logout
    const logout = function() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
    };
  
    const isLoggedIn = function() {
        return !!localStorage.getItem('authToken');
    };
  
    return { setToken, getToken, setRole, getRole, logout, isLoggedIn };
  });
  