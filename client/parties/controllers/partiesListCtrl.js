/**
 * Created by dxs on 2015-06-16.
 */

angular.module("socially").controller("PartiesListCtrl", ['$scope', '$meteor','$rootScope',
    function($scope, $meteor,$rootScope){
        $scope.page=1;
        $scope.perPage=3;
        $scope.sort={ name:1 };
        $scope.orderProperty="1";
        //$scope.orderProperty='1';
      /*  $scope.parties = $meteor.collection(Parties).subscribe('parties');    可以将这一部分分拆为下面的两个部分
        $scope.parties = $meteor.collection(Parties);

        $meteor.subscribe('parties',{
       limit: parseInt($scope.perPage),
       skip: parseInt(($scope.page - 1) * $scope.perPage),
       sort: $scope.sort
        });*/
        $meteor.subscribe('users')
        $scope.parties = $meteor.collection(function(){
            return Parties.find({},{                                 //查询数据
                sort:$scope.getReactively('sort')
            });
        })

        $meteor.autorun($scope,function(){
            $meteor.subscribe('parties', {
                limit: parseInt($scope.getReactively('perPage')),
                skip:( parseInt($scope.getReactively('page'))-1) *parseInt($scope.getReactively('perPage')),
                sort: $scope.getReactively('sort')
            },$scope.getReactively('search')).then(function(){
                $scope.partiesCount = $meteor.object(Counts,"numberOfParties",false)
            });
        });
        $scope.pageChanged =function(newPage){
            $scope.page =newPage;
        }

        $scope.remove =function(party){
          $scope.parties.splice($scope.parties.indexOf(party),1)
        }
        $scope.$watch("orderProperty",function(){
         if($scope.orderProperty)
         $scope.sort={name:parseInt($scope.orderProperty)}
     });
      /*  $scope.remove = function(party){
            $scope.parties.remove(party);
        };*/
        //$scope.removeAll = function(){
        //    $scope.parties.remove();
        //};
        $scope.getUserById = function(userId){
            return Meteor.users.findOne(userId);
        };

        $scope.creator = function(party){
            if (!party)
                return;
            var owner = $scope.getUserById(party.owner);
            if (!owner)
                return "nobody";

            if ($rootScope.currentUser)
                if ($rootScope.currentUser._id)
                    if (owner._id === $rootScope.currentUser._id)
                        return "me";

            return owner;
        };
    }]);