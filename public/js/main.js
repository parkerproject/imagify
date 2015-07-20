var app = angular.module('imagify', []);

app.controller('imagifyController', ['$scope', function ($scope) {
  $scope.items = ['resize', 'crop'];
  console.log($scope.items);
}]);