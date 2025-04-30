const app = angular.module("lmsApp", ["ngRoute"]);

// Service to manage authentication state
app.service("authService", function() {
  // Check if user is logged in
  this.isLoggedIn = function() {
    return !!localStorage.getItem("authToken"); // Returns true if authToken exists
  };

  // Logout function
  this.logout = function() {
    localStorage.removeItem("authToken"); // Remove auth token to log out
  };
});

app.config(function ($routeProvider) {


  $routeProvider
    .when("/", {
      template: `
      <div class="flex flex-col items-center justify-center h-full text-center px-4 py-20 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <h1 class="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6 drop-shadow-sm">
          Welcome to <span class="text-purple-600">LMS</span>
        </h1>
        <p class="text-xl text-gray-600 max-w-xl">
          A modern Learning Management System built using AngularJS and MEAN Stack.
        </p>
        <a href="#!/courses" class="mt-10 inline-block px-8 py-3 bg-purple-600 text-white rounded-full text-lg font-medium hover:bg-purple-700 transition">
          Explore Courses
        </a>
      </div>
    `,
    
    })
    .when("/login", {
      templateUrl: "views/login.html",
      controller: "loginController",
    })
    .when("/courses", {
      templateUrl: "views/courses.html",
      controller: "courseController",
    })
    .when("/add-course", {
      templateUrl: "views/addCourse.html",
      controller: "addCourseController",
    })
    .when("/register", {
      templateUrl: "views/register.html",
      controller: "registerController",
    })
    .when("/my-courses", {
      templateUrl: "views/myCourses.html",
      controller: "myCoursesController",
    })
    .when('/upload-content', {
      templateUrl: 'views/uploadContent.html',
      controller: 'uploadContentController'
    })
    .when('/course/:courseId/content', {
      templateUrl: 'views/coursecontent.html',
      controller: 'courseContentController'
    })
    .when('/profile', {
      templateUrl: 'views/profile.html',
      controller: 'profileController'
    })
    .when('/payment-success', {
      templateUrl: 'views/payment-success.html',
      controller: 'paymentSuccessController'
    })
    .otherwise({ redirectTo: "/" });
});

// Directive to handle file input
app.directive('fileModel', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;

      element.bind('change', function(){
        scope.$apply(function(){
          modelSetter(scope, element[0].files[0]);
        });
      });
    }
  };
}]);




// const app = angular.module("lmsApp", ["ngRoute"]);

// app.config(function ($routeProvider) {
//   $routeProvider
//     .when("/", {
//       template: '<h1 class="text-3xl p-4">Welcome to LMS</h1>',
//     })
//     .when("/login", {
//       templateUrl: "views/login.html",
//       controller: "loginController",
//     })
//     .when("/courses", {
//       templateUrl: "views/courses.html",
//       controller: "courseController",
//     })
//     .when("/add-course", {
//       templateUrl: "views/addCourse.html",
//       controller: "addCourseController",
//     })
//     .when("/register", {
//       templateUrl: "views/register.html",
//       controller: "registerController",
//     })
//     .when("/my-courses", {
//       templateUrl: "views/myCourses.html",
//       controller: "myCoursesController",
//     })
//     .when('/upload-content', {
//       templateUrl: 'views/uploadContent.html',
//       controller: 'uploadContentController'
//     })
//     .when('/course/:courseId/content', {
//       templateUrl: 'views/coursecontent.html',
//       controller: 'courseContentController'
//     })
//     .when('/profile', {
//       templateUrl: 'views/profile.html',
//       controller: 'profileController'
//     })
//     .otherwise({ redirectTo: "/" });
// });

// app.directive('fileModel', ['$parse', function ($parse) {
//   return {
//     restrict: 'A',
//     link: function(scope, element, attrs) {
//       var model = $parse(attrs.fileModel);
//       var modelSetter = model.assign;

//       element.bind('change', function(){
//         scope.$apply(function(){
//           modelSetter(scope, element[0].files[0]);
//         });
//       });
//     }
//   };
// }]);
