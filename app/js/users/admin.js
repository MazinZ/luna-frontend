angular.module(app_name).controller('AdminController', ['user_service', '$scope', 'Notification', function(user_service, $scope, Notification){
    $scope.user = {"username": '', "password": '' }
    $scope.showSubmit = false;
    if (user_service.is_signed_in()) $scope.signed_in = true;
    else $scope.signed_in = false;

    $scope.sign_in = function() {
      $scope.showSubmit = false;
      Notification.info('Retrieving data...');
      user_service.sign_in({
          "username" : $scope.user.username, 
          "password" : $scope.user.password
        });
    }
}]);