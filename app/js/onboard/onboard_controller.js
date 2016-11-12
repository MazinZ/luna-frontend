angular.module(app_name)
  .controller('OnboardController', [ '$scope', 'user_service', '$timeout', '$state', 'Notification',
    function($scope, user_service, $timeout, $state, Notification){
      $state.go('onboard.register');
      var self = this;

      self.register = function() {
          var user = {
              "username": "placeholder",
              "password": self.password
            }

          user_service.register(user).then(function(data){
                $timeout(function () {
                    self.username = data.username;
                });
                $state.go('onboard.confirm');
        });
      };
}]);
