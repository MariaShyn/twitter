(function() {

    angular
        .module('twitter')
        .service('meanData', [
            '$http',
            'authentication',
            function ($http, authentication) {

                var getProfile = function () {
                    console.log(authentication.getToken())
                    return $http.get('/profile',
                        {
                            headers: {
                                Authorization: 'Bearer '+ authentication.getToken()
                        }
                    });
                };

                return {
                    getProfile : getProfile
                };
            }])
})();