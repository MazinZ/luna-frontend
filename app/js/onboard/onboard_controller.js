angular.module(app_name)
  .controller('OnboardController', [ '$scope', 'user_service', '$timeout', 
    function($scope, user_service, $timeout){

      var self = this;
      /*$scope.register = user_service.register(
        {
              "password" : $scope.password
        })
        .then(function(data){
            console.log("user registered", data.data)
        });*/
      console.log($scope);

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
        });

      };

  


}]);