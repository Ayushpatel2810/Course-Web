app.controller('uploadContentController', function($scope, $http, authService, $location) {
  $scope.uploadContent = function() {
    var formData = new FormData();
    const token = authService.getToken();
    formData.append('courseId', $scope.courseId);
    formData.append('title', $scope.title);
    formData.append('file', $scope.file);

    $http.post('http://localhost:5050/api/content/upload', formData, {
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined,
        Authorization: 'Bearer ' + token
      }
    }).then(function(res) {
      alert('✅ Upload successful!');
      // 🔥 Redirect to courses list
      $location.path('/courses');
    }, function(err) {
      alert('❌ Error uploading: ' + (err.data?.message || 'Upload failed'));
    });
  };
});

