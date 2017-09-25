var myApp = angular.module('myApp', ['ngRoute', 'mainControllers']);

myApp.config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl : 'views/home.html',
		controller : 'MainController'
	}).when('/stats', {
		templateUrl : 'views/stats.html',
		controller : 'MainController'
	}).otherwise({
		redirectTo : '/home'
	});
}]);
myApp.run(['$rootScope', '$location',
function($rootScope, $location) {

	$rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute) {
		if (currRoute.originalPath == '/home') {
			$rootScope.tog = 1;
		} else if (currRoute.originalPath == '/stats') {
			$rootScope.tog = 2;
		}
	});
}]);
