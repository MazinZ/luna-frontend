
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
