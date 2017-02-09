app.factory('City', ['$resource', function ($resource) {
    return $resource('http://api.apixu.com/v1/search.json?key=0f2ddbfc453d4e42865224609170802',
        {},
        {
            get: {method: 'GET', isArray: true}
        }
    );
}]);