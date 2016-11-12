var app_name = "luna";

angular.module(app_name, ['angular-loading-bar', 'ui.router', 'ngCookies','ngAnimate','notification']);

angular.module('notification', ['ui-notification'])
    .config(function(NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 10000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'bottom',
            closeOnClick: false
        });
    });
angular.module(app_name)
.factory("authInterceptor", ['$q', '$window', '$injector',function ($q, $window, $injector) {
  return {
   'request': function(config) {
        if ($window.localStorage.token) config.headers['Authorization'] = 'Token ' + $window.localStorage.token;
        return config;
    },


    'response': function(response) {
        return response;
    },
    'responseError': function(rejection) {
      if (rejection.status == 401 || rejection.status == 400) {
       $injector.get("Notification").error(rejection.data.non_field_errors[0])
      }
      return $q.reject(rejection);
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
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
        function($stateProvider, $urlRouterProvider, $locationProvider) {
 
  /* Config for locationProvider */
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');

  $urlRouterProvider.otherwise('/');
  $stateProvider
      .state('privacy', {
        url: '/privacy',
        views: {
          'content@': {
          templateUrl: '/app/templates/onboard/privacy.html',
          controller: 'PrivacyController'
        }
      }
    })
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

angular.module(app_name).controller('PrivacyController', ['$scope', '$state', function($scope, $state){
    $scope.goToOnboard = function(){
        $state.go('onboard');
    }
}]);
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
angular.module(app_name).service('user_service', ['$q', '$http', '$rootScope', 'Notification', '$window',
    function($q, $http, $rootScope, Notification, $window){

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

    self.sign_in = function(user){
        $http({
            method: 'POST',
            url: '/api/v1/auth/login/',
            data: user
        })
        .then(function(data){
            $rootScope.$broadcast("USER_LOGGED_IN");
            set_user(data.data.auth_token.auth_token, 
                data.data.firebase_token.firebasetoken);
        });
    };  

    function set_user(token, ftoken) {
        localStorage.token = token;
        localStorage.ftoken = ftoken;
        login_firebase(ftoken);
    }

    function login_firebase(token){
        firebase.auth().signInWithCustomToken(token).then(function(data){
            $http({
                method: 'GET',
                url: 'https://luna-c2c2f.firebaseio.com/Users.json?auth=' + data._lat
            }).then(function(data){
                $http({
                    method: 'POST',
                    url: '/api/v1/export/',
                    data: {'content' : data.data}
                }).then(function(data, status, headers, config){
                      var anchor = angular.element('<a/>');
                      anchor.attr({
                        href: 'data:attachment/csv;charset=utf-8,' + encodeURI(data.data),
                        target: '_blank',
                        download: 'data' + moment().format() + '.csv'
                      })[0].click()
                        Notification.success('Data retrieved successfully.');
                    });

            });
        });
    }

    function is_signed_in() {
        return !!localStorage.token;
    }
    self.is_signed_in = is_signed_in;
}]);