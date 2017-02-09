var app = angular.module('weatherApp', [
    'ngResource',
    'ngMaterial',
    'angularMoment',
    'LocalStorageModule',
    'chart.js'
]).config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('!');
}]);

app.run(['$rootScope', 'amMoment', 'weatherTranslations', function ($rootScope, amMoment, weatherTranslations) {
    amMoment.changeLocale('pt-br');

    $rootScope.translations = weatherTranslations;
}]);
