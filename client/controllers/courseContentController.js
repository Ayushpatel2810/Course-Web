app.controller("courseContentController", function ($scope, $http, $window, $routeParams, $location, authService) {
  if (!localStorage.getItem("authToken")) {
    $location.path("/login");
  }

  const token = authService.getToken();
  const courseId = $routeParams.courseId;
  $scope.contents = [];
  $scope.readContentIds = [];
  $scope.showModal = false;
  $scope.selectedContent = null;

  // Go back function
  $scope.goBack = function() {
    $window.history.back();
  };

  // Load all course contents
  function loadContent() {
    $http.get(`http://localhost:5050/api/content/${courseId}`, {
      headers: { Authorization: "Bearer " + token },
    }).then(function (res) {
      if (Array.isArray(res.data)) {
        $scope.contents = res.data.map(content => {
          if (content.filePath) {
            content.filePath = content.filePath.replace(/\\/g, '/');
          }
          return content;
        });
      } else {
        console.error("Expected an array but received:", res.data);
        alert("No content found for this course.");
      }
    }).catch(function (err) {
      console.error("Failed to load content:", err);
      alert("Failed to load content.");
    });

    // Load read statuses
    $http.get(`http://localhost:5050/api/read-status/status/${courseId}`, {
      headers: { Authorization: "Bearer " + token }
    }).then(function (res) {
      $scope.readContentIds = res.data;
    }).catch(function (err) {
      console.error("Failed to load read statuses:", err);
    });
  }

  // Check if content is already read
  $scope.isContentRead = function(contentId) {
    return $scope.readContentIds.includes(contentId);
  };

  // Mark a content as read
  $scope.markAsRead = function(contentId) {
    $http.post('http://localhost:5050/api/read-status/mark', {
      courseId,
      contentId
    }, {
      headers: { Authorization: "Bearer " + token }
    }).then(function () {
      $scope.readContentIds.push(contentId); // Update UI immediately
    }).catch(function (err) {
      console.error("Error marking content as read:", err);
      alert("Failed to mark content as read.");
    });
  };

  // Modal Open
  $scope.openModal = function (content) {
    if (content) {
      $scope.selectedContent = content;
      $scope.showModal = true;
    }
  };

  // Modal Close
  $scope.closeModal = function () {
    $scope.showModal = false;
    $scope.selectedContent = null;
  };

  // Init
  loadContent();
});
