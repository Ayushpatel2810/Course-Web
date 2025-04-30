app.controller("logoutController", function ($scope, $location, $rootScope) {
  $scope.logout = function () {
    localStorage.removeItem("authToken");

    // 🔥 Notify the app that logout happened
    $rootScope.$emit('authChanged');

    $location.path("/login");
  };

  $scope.isLoggedIn = function () {
    return !!localStorage.getItem("authToken");
  };
});