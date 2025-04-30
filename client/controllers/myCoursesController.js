// app.controller('myCoursesController', function($scope, $http) {
//     $scope.myCourses = [];

//     $http.get('http://localhost:5050/api/enroll/my', {
//       headers: {
//         Authorization: 'Bearer ' + localStorage.getItem('authToken')
//       }
//     }).then(function (res) {
//       $scope.myCourses = res.data.courses;
//     }, function (err) {
//       alert('Error loading My Courses: ' + err.data.message);
//     });
//   });
app.controller("myCoursesController", function ($scope, $http, $location) {
  $scope.myCourses = [];

  // Fetch enrolled courses for the student
  $http
    .get("http://localhost:5050/api/enroll/my", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
    })
    .then(
      function (res) {
        $scope.myCourses = res.data.courses;
      },
      function (err) {
        alert("Error loading My Courses: " + err.data.message);
      }
    );

  // View Course Content
  $scope.viewContent = function (courseId) {
    // Navigate to course content page
    $location.path("/course/" + courseId + "/content");
  };

});
