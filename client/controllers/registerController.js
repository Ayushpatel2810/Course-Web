app.controller('registerController', function($scope, $http, $location) {
    $scope.user = {};
  
    $scope.register = function() {
      $http.post('http://localhost:5050/api/auth/register', $scope.user)
        .then(response => {
          alert('Registration successful! Please log in.');
          $location.path('/login');
        })
        .catch(error => {
          alert('Error registering: ' + (error.data?.message || error.message));
        });
    };
  });
  