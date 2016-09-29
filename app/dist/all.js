var app_name = "luna";

angular.module(app_name, ['angular-loading-bar', 'ui.router', 'ngCookies']);

angular.module(app_name)
.factory("authInterceptor", ['$q', '$window', function ($q, $window) {
  return {
   'request': function(config) {
        if ($window.localStorage.token) config.headers['Authorization'] = 'Token ' + $window.localStorage.token;
        return config;
    },


    'response': function(response) {
        return response;
    }
  };
}]);

angular.module(app_name)
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});

'use strict';
angular.module(app_name)
    .run(['$http', '$window', '$rootScope', function($http, $window, $rootScope){
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
        $http.defaults.headers["Content-Type"] = "application/json";
    }]);
    

angular.module(app_name)
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
 
  /* Config for locationProvider */
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');

  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('main', {
      views: {
        'nav': {
          templateUrl: '/templates/common/navbar.html',
          controller: 'NavbarController'
        }
      }
    })
    .state('form', {
        templateUrl: 'form.html',
        controller: 'formController'
    })
    .state('main.index', {
      url: '/',
      views: {
        'content@': {
          template: ' ',
        }
      }
    })
    /*.state('main.sign_in', {
      url: '/login',
      views: {
        'content@': {
        templateUrl: '/templates/users/login.html',
        controller: 'SignInController'
        }
      }
    })*/
    /*.state('main.sign_up', {
      url: '/register',
      views: {
        'content@': {
        templateUrl: '/templates/users/register.html',
        controller: 'SignUpController'
        }
      }
    })*/
    .state('onboard', {
        url: '/onboard',
        views: {
          'content@': {
          templateUrl: '/app/templates/onboard/onboard.html',
          controller: 'OnboardController as Onboard'
        }
      }
    })
    .state('onboard.register', {
        url: '/',
        templateUrl: '/app/templates/onboard/register.html',
    })
    .state('onboard.confirm', {
        url: '/',
        templateUrl: '/app/templates/onboard/confirm.html'
    })
    ;

}]);

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
angular.module(app_name).service('user_service', ['$q', '$http', function($q, $http){

     var self = this;

     self.register = function(user){
        return $q(function(resolve, reject) {

        console.log(user);
        $http({
            method: 'POST',
            url: '/api/v1/auth/register/',
            data: user
        })
        .then(function(data){
            resolve(data.data);
        },function(error){
            console.log("ERROR");
            console.log(error);
            reject(error);
        });
        });
     };


}]);