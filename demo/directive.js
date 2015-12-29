
angular.module('demo-app', [])
    .directive('loginForm', function($cookieStore, $http) {
        return {
            restrict: 'A',
            template: " <form> " +
                            "<label>Username</label>" +
                            "<input type='text' ng-model='username' />" +
                            "<label>Password</label>" +
                            "<input type='password' ng-model='password' />" +
                            "<br/>" +
                            "<input type='submit' />" +
                        "</form>",
            link: function(scope, elem, attrs) {

                elem.bind('submit', function() {

                    var user_data = {
                        "username": scope.username,
                        "password": scope.password,
                    };
                    
                    $http.post("http://localhost:8001/api-token-auth/", user_data)
                        .success(function(response) {
                            $cookieStore.put('app__token', response.token);
                            $http.defaults.headers.common['Authorization'] = 'Token ' + response.token;
                    }); 

                });

            }
        }
    });