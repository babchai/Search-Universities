'use strict';

/**
 * @ngdoc overview
 * @name ciaol2App
 * @description
 * # ciaol2App
 *
 * Main module of the application.
 */
angular
  .module('ciaol2App', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ui-rangeSlider'
  ])
  .filter('rangeFilter', function() {
    return function( items, rangeInfo , isLocal) {

        var filtered = [];
        var min = parseInt(rangeInfo.minFees);
        var max = parseInt(rangeInfo.maxFees);
           
        // If time is with the range
        if(isLocal)
        {
          angular.forEach(items, function(item) {
              if( item.fees.inState >= min && item.fees.inState <= max ) {
                  filtered.push(item);
              }
          });
        }
        else
        {
          angular.forEach(items, function(item) {
              if( item.fees.outState >= min && item.fees.outState <= max ) {
                  filtered.push(item);
              }
          });

        }

        return filtered;
    };

  })
  .factory('dataService', ['$http', function($http) {

   return {
    get: function(url) {
      return $http.get(url).then(function(resp) {
        return resp.data; // success callback returns this
      });
    }
  };
  }])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
