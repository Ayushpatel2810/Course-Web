app.controller('addCourseController', function($scope, $http, $location, authService,toastService) {
  $scope.course = {}; 

  $scope.addCourse = function () {
    if (!$scope.course.title || !$scope.course.instructor || !$scope.course.description || !$scope.course.price) {
      alert('❌ Please fill all fields including price!');
      return;
    }

    $http.post('http://localhost:5050/api/courses/create', $scope.course, {
      headers: {
        Authorization: 'Bearer ' + authService.getToken()
      }
    }).then(function (res) {
      alert('✅ Course added successfully!');
      // 🔥 Redirect to upload-content page
      $location.path('/upload-content');
    }).catch(function (err) {
      console.error('Error adding course:', err);
      alert('❌ Error: ' + (err.data?.message || 'Server error'));
    });
  };
});

  