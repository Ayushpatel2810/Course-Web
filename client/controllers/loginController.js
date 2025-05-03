app.controller('loginController', function($scope, $http, $location, $rootScope, authService) {
  $scope.user = {};

  $scope.login = function() {
    $http.post('http://localhost:5050/api/auth/login', $scope.user)
      .then(response => {
        authService.setToken(response.data.token);

        const decodedToken = JSON.parse(atob(response.data.token.split('.')[1])); // Decode JWT
        localStorage.setItem('userRole', decodedToken.role); // ✅ Correct

        $rootScope.$emit('authChanged');

        $location.path('/courses');
      })
      .catch(error => {
        alert('Error logging in: ' + (error.data?.message || error.message));
      });
  };
});

