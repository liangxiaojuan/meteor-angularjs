Parties = new Mongo.Collection("parties");

if (Meteor.isClient) {

 var Socially  =  angular.module('socially',['angular-meteor','ui.router']);

  Socially.config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){

      $locationProvider.html5Mode(true);   //必须添加这一句 才能调用路由

      $stateProvider
          .state('parties', {
            url: '/parties',
            templateUrl: 'parties-list.ng.html',
            controller: 'PartiesListCtrl'
          })
          .state('partyDetails', {
            url: '/parties/:partyId',
            templateUrl: 'party-details.ng.html',
            controller: 'PartyDetailsCtrl'
          });

      $urlRouterProvider.otherwise("/parties"); //路由的首页
    }]);

  Socially.controller("PartyDetailsCtrl", ['$scope', '$stateParams',
    function($scope, $stateParams){

      $scope.partyId = $stateParams.partyId;

    }]);

  Socially.controller("PartiesListCtrl", ['$scope', '$meteor',
    function($scope, $meteor){

      $scope.parties = $meteor.collection(Parties);

      //$scope.remove =function(party){
      //  $scope.parties.splice($scope.parties.indexOf(party),1)
      //}
      $scope.remove = function(party){
        $scope.parties.remove(party);
      };
      $scope.removeAll = function(){
        $scope.parties.remove();
      };

    }]);
}

