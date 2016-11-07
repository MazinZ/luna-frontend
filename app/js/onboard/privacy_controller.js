angular.module(app_name).controller('PrivacyController', ['$scope', '$state', function($scope, $state){
    $scope.goToOnboard = function(){
        $state.go('onboard');
    }
}]);