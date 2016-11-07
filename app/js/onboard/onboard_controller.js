angular.module(app_name)
  .controller('OnboardController', [ '$scope', 'user_service', '$timeout', '$state',
    function($scope, user_service, $timeout, $state){
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
                console.log("user registered", data)
                $state.go('onboard.confirm');
        });

      };
}]);
