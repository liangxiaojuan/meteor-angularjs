/**
 * Created by dxs on 2015-06-16.
 */

angular.module("socially").controller("PartiesListCtrl", ['$scope', '$meteor',
    function($scope, $meteor){
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

    }]);