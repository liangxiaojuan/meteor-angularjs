# meteor-angularjs
#增加流程

 from 已经是anguar封装的指令了,
 1.点击add 这个按钮之后  在ng-click 里面我们写了parties.push(newParty) 在input表单里面我们获取了newParty,这样便可以直接增加.

 2.我们也可以写在controllers 里面,去掉我们声明的parties,
 在controller写
   $scope.push =function(newParty){
     $scope.parties.push(newParty) ;
   }

#修改  绑定一个对象

1.添加 $stateParams
 通过 $stateParams.xxxid  拿到修改的id ,
 $scope.party = $meteor.object(Parties, $stateParams.partyId, false);
 就可以实现实时修改

 #删除
 拿到 xx数据  直接在ng-click 里面写 xx(数据库名).remove(xxx) 直接删除 ,也可以和增加一样 写在控制器里面

 #查询  在控制器 写上#metoer

    $scope.parties = $meteor.collection(function(){
        return Parties.find(查询条件);
    })
        在视图 写 可以写在 ng-repeat=" " 指令里面 打印数据出来

 #基础指令
html: ng-app="xxxx "  等于 java种的main 一个body里面只能写一个.告诉浏览器我包含的东西归angular 处理

js:angular.module('xxxx',['angular-meteor','ui.router','angularUtils.directives.dirPagination']);
有多少个包angular组件 就写多少

html : ng-controller="" 控制器   控制数据
  ng-model=""模型 一般用于input读拿数据
  ng-click=""点击事件 这里面可以传拿数据
ng-bind="" 视图 显示数据 也可以用{{xxx}}来显示数据
 一共63种angular规定的指令 ,我们也可以自己定义.

 #路由
安装 angularui:angular-ui-router 包

由三个来控制
$urlRouterProvider: 控制路由的初始页
$locationProviderK : 控制路由是否被应用
$stateProvider: 控制路由的跳转

 .state('xxx(名字)', {
                url: '/xxx', : 浏览器的路径
                templateUrl: 'xxxx.html',: html文件的全路径
                controller: 'xxx'   控制器的名称
            })

#订阅 发布
  暂时有点问题