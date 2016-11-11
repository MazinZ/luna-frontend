angular.module(app_name).service('user_service', ['$q', '$http', '$rootScope',function($q, $http, $rootScope){

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
            url: 'api/v1/auth/login/',
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
                var url = 'data:text/json;charset=utf8,' + JSON.stringify(data.data);
                window.open(url, '_blank');
                window.focus();
            });
        });
    }

    function is_signed_in() {
        return !!localStorage.token;
    }
    self.is_signed_in = is_signed_in;
}]);