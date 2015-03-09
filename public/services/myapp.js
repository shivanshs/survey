var myapp = angular.module("app",["MyApp_Services","ngRoute","ngAnimate"])

myapp.config(function($routeProvider,$httpProvider)
{
	// IE ajax request
	$httpProvider.defaults.cache = false;
	if(!$httpProvider.defaults.headers.get)
	{
		$httpProvider.defaults.headers.get = {};
	}

	$httpProvider.defaults.headers.get['If-Modified-Since'] = '0';

	$routeProvider
	.when('/',{
		templateUrl:'views/home/home.html',
		controller :'HomeCtrl'
	})
	.when('/user',
	{
		templateUrl:'',
		controller :'RedirectUserLoginCtrl'
	})
	.when('/404',
	{
		templateUrl:'404.html'
	})
	.otherwise({
            redirectTo: "/404"
        })
})