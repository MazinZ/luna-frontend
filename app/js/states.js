
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
