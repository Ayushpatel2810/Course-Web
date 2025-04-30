// app.controller('courseController', function($scope, $http, $window, $timeout, authService) {
//   const token = authService.getToken();

//   if (!token) {
//     alert('You must be logged in to view courses');
//     window.location.href = '#!/login';
//     return;
//   }

//   // Initial states
//   $scope.loading = true;
//   $scope.courses = [];
//   $scope.enrolledCourseIds = [];
//   $scope.showPaymentModal = false;
//   $scope.selectedCourseId = null;
//   $scope.payment = {
//     cardNumber: '',
//     expiry: '',
//     cvv: ''
//   };

//   // Load all data
//   function init() {
//     loadCourses();
//     loadEnrolledCourses();
//   }

//   // Fetch all available courses
//   function loadCourses() {
//     $http.get('http://localhost:5050/api/courses', {
//       headers: { Authorization: `Bearer ${token}` }
//     }).then(response => {
//       $scope.courses = response.data;
//     }).catch(error => {
//       console.error('Error fetching courses:', error);
//       alert('Error fetching courses: ' + (error.data?.message || error.message));
//     }).finally(() => {
//       $scope.loading = false;
//     });
//   }

//   // Fetch courses the user already enrolled in
//   function loadEnrolledCourses() {
//     $http.get('http://localhost:5050/api/my-courses', {
//       headers: { Authorization: `Bearer ${token}` }
//     }).then(response => {
//       $scope.enrolledCourseIds = response.data.map(course => course._id);
//     }).catch(error => {
//       console.error('Error fetching enrolled courses:', error);
//     });
//   }

//   // Open payment modal
//   $scope.enrollCourse = function(courseId) {
//     if ($scope.isAlreadyEnrolled(courseId)) {
//       alert('You are already enrolled in this course.');
//       return;
//     }
//     $scope.selectedCourseId = courseId;
//     $scope.showPaymentModal = true;
//   };

//   // Close payment modal
//   $scope.cancelPayment = function() {
//     $scope.showPaymentModal = false;
//     $scope.payment = {};
//   };

//   // Handle payment and enrollment
//   // $scope.payNow = function() {
//   //   $scope.showPaymentModal = false;

//   //   $timeout(() => {
//   //     alert("💳 Payment successful! You are now enrolled.");

//   //     $http.post('http://localhost:5050/api/enroll/' + $scope.selectedCourseId, {}, {
//   //       headers: { Authorization: `Bearer ${token}` }
//   //     }).then(() => {
//   //       // Refresh enrolled courses without page reload
//   //       loadEnrolledCourses();
//   //       $window.location.href = '#!/my-courses';
//   //     }).catch(err => {
//   //       console.error('Error enrolling:', err);
//   //       alert('Error enrolling: ' + (err.data?.message || err.message));
//   //     });

//   //   }, 1500); // Fake payment delay
//   // };
//   $scope.payNow = function(course) {
//     $http.post('http://localhost:5050/api/stripe/create-checkout-session', {
//       title: course.title,
//       price: 1000 // example price in USD (10.00)
//     }, {
//       headers: { Authorization: `Bearer ${token}` }
//     }).then(res => {
//       const stripe = Stripe('your_publishable_key_here');
//       stripe.redirectToCheckout({ sessionId: res.data.id });
//     }).catch(err => {
//       alert('Payment failed: ' + err.message);
//     });
//   };

//   // Check if already enrolled
//   $scope.isAlreadyEnrolled = function(courseId) {
//     return $scope.enrolledCourseIds.includes(courseId);
//   };

//   // Initialize
//   init();
// });


app.controller('courseController', function($scope, $http, $window, authService) {
  const token = authService.getToken();

  if (!token) {
    alert('You must be logged in to view courses');
    window.location.href = '#!/login';
    return;
  }

  // Initial states
  $scope.loading = true;
  $scope.courses = [];
  $scope.enrolledCourseIds = [];

  // Load all data
  function init() {
    loadCourses();
    loadEnrolledCourses();
  }

  // Fetch all available courses
  function loadCourses() {
    $http.get('http://localhost:5050/api/courses', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      $scope.courses = response.data;
    }).catch(error => {
      console.error('Error fetching courses:', error);
      alert('Error fetching courses: ' + (error.data?.message || error.message));
    }).finally(() => {
      $scope.loading = false;
    });
  }

  // Fetch user's enrolled courses
  function loadEnrolledCourses() {
    $http.get('http://localhost:5050/api/my-courses', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      $scope.enrolledCourseIds = response.data.map(course => course._id);
    }).catch(error => {
      console.error('Error fetching enrolled courses:', error);
    });
  }

  // Stripe Payment and then Enroll
  $scope.enrollCourse = function(course) {
    console.log('👉 Course object received on enroll click:', course);
    if ($scope.isAlreadyEnrolled(course._id)) {
      alert('You are already enrolled in this course.');
      return;
    }

    $http.post('http://localhost:5050/api/stripe/create-checkout-session', {
      title: course.title,
      price: course.price * 100, // cents
      courseId: course._id ,// 🔥 Important: courseId bhi bhejna
      description: course.description, // ✅ Send description
      instructor: course.instructor,   // ✅ Send instructor
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      const stripe = Stripe('pk_test_51QuPUwHW7bdkqoG5HdOmDPIkW3b13MWU2EsMWxgGyCOPtaDDBnDbLfKys7vNvRpj68U6cWCFOx9CuNUfCSEOU0RO00AiX0f2nY');
      stripe.redirectToCheckout({ sessionId: res.data.id });
    }).catch(err => {
      console.error('Stripe checkout error:', err);
      alert('Payment failed: ' + (err.data?.error || err.message));
    });
    
  };

  // Enroll after payment
  function enrollAfterPayment(courseId) {
    $http.post('http://localhost:5050/api/enroll/' + courseId, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      alert('✅ Enrollment successful!');
      loadEnrolledCourses(); // Refresh enrolled courses list
      $window.location.href = '#!/my-courses'; // Redirect to My Courses page
    }).catch((err) => {
      alert('❌ Enrollment failed: ' + (err.data?.message || err.message));
    });
  }

  // Check if already enrolled
  $scope.isAlreadyEnrolled = function(courseId) {
    return $scope.enrolledCourseIds.includes(courseId);
  };

  // Initialize on load
  init();
});
