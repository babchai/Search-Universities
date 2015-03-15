'use strict';

/**
 * @ngdoc function
 * @name ciaol2App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the ciaol2App
 */
angular.module('ciaol2App')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.run = function(){

    	console.log("asdasd ad");
    }
  });
