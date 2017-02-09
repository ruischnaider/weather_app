app.factory('Forecast', ['$resource', function ($resource) {
    return $resource('http://api.apixu.com/v1/forecast.json?key=0f2ddbfc453d4e42865224609170802&q=:city&days=7',
        {city: '@city'},
        {
            get: {method: 'GET'}
        }
    );
}]);