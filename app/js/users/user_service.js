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