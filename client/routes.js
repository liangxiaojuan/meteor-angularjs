/**
 * Created by dxs on 2015-06-16.
 * 功能:路由
 */
angular.module("socially").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){

        $locationProvider.html5Mode(true);   //必须添加这一句 才能调用路由

        $stateProvider
            .state('parties', {
                url: '/parties',
                templateUrl: 'client/parties/views/parties-list.ng.html',
                controller: 'PartiesListCtrl'
            })
            .state('partyDetails', {
                url: '/parties/:partyId',
                templateUrl: 'client/parties/views/party-details.ng.html',
                controller: 'PartyDetailsCtrl',
                resolve: {
                       "currentUser": ["$meteor", function($meteor){
                       return $meteor.requireUser();
                      }]
              }
            });

        $urlRouterProvider.otherwise("/parties"); //路由的首页
    }]);
angular.module("socially").run(["$rootScope", "$state", function($rootScope, $state) {
    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
        // 这段代码的意思 当没有登录的时候 要访问登录的后访问的页面 直接跳 $state.go('parties');
        if (error === "AUTH_REQUIRED") {
            $state.go('parties');
        }
    });
}]);