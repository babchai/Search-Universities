'use strict';

/**
 * @ngdoc function
 * @name ciaol2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ciaol2App
 */
angular.module('ciaol2App')
  .controller('MainCtrl', function ($scope,dataService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

$scope.suggestion = [];
$scope.maxFee='';
$scope.university='';
$scope.isLocal = false;
$scope.showNoResult = false;

$scope.submit = function(){
	var keyword = '';
	if(this.university.length !==0)
	{
      keyword = '/'+$scope.university.name;
	}
  
  dataService.get('http://localhost:3000/universities'+keyword).then(function(res){
     res.forEach(function(data){
        data.fees.inState = parseInt(data.fees.inState);
        data.fees.outState = parseInt(data.fees.outState);
     });

     if(res.length === 0 ){
        $scope.showNoResult = true;
     }
     else{
        $scope.showNoResult = false;
     }
      
 	  $scope.data = res;
	});

};

$scope.tuitionFees ={range:
                        {min:1000, max:59999}, 
                        minFees:1000, 
                        maxFees:59999};


$scope.universities = function(){
	var keyword = this.university;
	if(keyword.length>0){
	  dataService.get('http://localhost:3000/universities/'+keyword).then(function(data){
	  $scope.suggestion = data;
	 });
  }
};
});
