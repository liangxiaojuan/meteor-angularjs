/**
 * Created by dxs on 2015-06-16.
 */


angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams','$meteor',
    function($scope, $stateParams,$meteor){

        $scope.party = $meteor.object(Parties,$stateParams.partyId);

        var subscriptionHandle ;
       $meteor.subscrube('parties').then(function(handle){
            //可以使用订阅
           subscriptionHandle = handle;
        });
        //手动关闭
       // savedSubscriptionHandle.stop();
        $scope.users = $meteor.collection(Meteor.users,false).subscribe('users');
        /*$scope.save =function(){
            $scope.party.save().then(function(numberOfDocs){
                console.log(numberOfDocs)
            },function(error){
                console.log(error);
            })
        };
        $scope.reset =function(){
            $scope.party.reset();
        }*/
        $scope.$on('$destroy', function() {
            subscriptionHandle.stop();
               });

    }]);
