app.controller('autocompleteCtrl', ['$scope', 'City', function ($scope, City) {
    $scope.get = function (search) {
        return City.get({q: search}, function (data) {
            return data;
        }, function () {
            return [];
        }).$promise;
    };
}]);