app.controller('indexController', ['$scope', '$filter', 'Forecast', 'localStorageService', function ($scope, $filter, Forecast, localStorageService) {
    // Variables
    $scope.favorited = localStorageService.get('fav');
    $scope.selected = $scope.favorited || 'Blumenau';
    $scope.loading = {active: true};
    $scope.current = {};
    $scope.location = {};
    $scope.forecast = [];
    $scope.temp = {};
    $scope.chart = {
        labels: [],
        series: ['Máxima', 'Mínima'],
        data: [
            [],
            []
        ]
    };

    // Functions
    function saveTemp(forecast) {
        angular.forEach(forecast.forecastday, function (value) {
            $scope.chart.labels.push($filter('amDateFormat')($filter('amParse')(value.date, 'YYYY-MM-DD'), 'ddd'));
            $scope.chart.data[0].push(value.day.maxtemp_c);
            $scope.chart.data[1].push(value.day.mintemp_c);

            if (!$scope.temp.max || $scope.temp.max.day.maxtemp_c < value.day.maxtemp_c) {
                $scope.temp.max = value;
            }

            if (!$scope.temp.min || $scope.temp.min.day.mintemp_c > value.day.mintemp_c) {
                $scope.temp.min = value;
            }
        });
    };

    $scope.getWeather = function (city) {
        $scope.current = {};
        $scope.location = {};
        $scope.forecast = [];

        if (city) {
            $scope.loading.active = true;
            Forecast.get({city: city}, function (data) {
                $scope.loading.active = false;
                $scope.location = data.location;
                $scope.setCurrent(data.forecast.forecastday[0]);
                $scope.forecast = data.forecast;
                saveTemp(data.forecast);
            }, function () {
                $scope.loading.active = false;
            });
        }
    };

    $scope.setCurrent = function (day) {
        $scope.current = day;
    };

    $scope.setFavorite = function (city) {
        if ($scope.selected == city.name) {
            localStorageService.remove('fav');
        } else {
            $scope.favorited = city.name;
            localStorageService.set('fav', city.name);
        }
    };

    // Initialize
    $scope.getWeather($scope.selected);
}]);