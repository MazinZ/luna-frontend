angular.module(app_name)
.factory("authInterceptor", ['$q', '$window', function ($q, $window) {
  return {
   'request': function(config) {
       console.log(config);
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

        $rootScope.$on('USER_LOGGED_IN', function(event, token) {
       // if ($window.localStorage.token) {
           console.log("TOKEN");
           //if (token)
           // $http.defaults.headers.common['Authorization'] = 'Token ' + token;
        //}
        });
    }]);
    