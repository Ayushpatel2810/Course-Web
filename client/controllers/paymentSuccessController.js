app.controller('paymentSuccessController', function($scope, $location, $http, authService, $window) {
    console.log('✅ PaymentSuccessController Loaded');
  
    const token = authService.getToken();
    const courseId = $location.search().courseId; // ✅ Yeh sahi hai
  
    console.log('Received Course ID:', courseId);
  
    if (!courseId) {
      alert('❌ No course ID provided!');
      $window.location.href = '#!/courses';
      return;
    }
  
    // Enroll call
    $http.post(`http://localhost:5050/api/enroll/${courseId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      alert('✅ Enrollment successful!');
      $window.location.href = '#!/my-courses';
    }).catch(err => {
      console.error('❌ Enrollment error:', err);
      alert('❌ Enrollment failed: ' + (err.data?.message || err.message));
    });
  });
  
  