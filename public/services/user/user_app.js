var myapp = angular.module("userapp",["MyApp_Services","ngRoute","ngAnimate","ui.bootstrap","angularFileUpload","highcharts-ng"])

myapp.config(function($routeProvider,$httpProvider)
{
	// IE ajax request
	$httpProvider.defaults.cache = false;
	if(!$httpProvider.defaults.headers.get)
	{
		$httpProvider.defaults.headers.get = {};
	}
	$httpProvider.defaults.headers.get['If-Modified-Since'] = '0';

	var checkLoggedOut = function($q,$timeout,$http,$rootScope,$window,$location)
	{
		// console.log("checkLoggedOut")
    	var deferred = $q.defer();
	    $http.get("/user/loggedin")
	    .success(function(data)
	    {
	    	$rootScope.IndexFlag = true;
	    	if(data.result)
	    	{
            	$timeout(deferred.resolve,0);
	    	}
	    	else
	    	{
          		// $window.location.href="/#/";
          		$location.path("/");
          		$timeout(deferred.resolve, 0);
	    	}
	    })
      	return deferred.promise;
    };
    var checkLoggedIn = function($q,$timeout,$http,$rootScope,$window,$location)
	{
		// console.log("checkLoggedIn")
	    $rootScope.IndexFlag = false;
	    var deferred = $q.defer();
	    $http.get("/user/loggedin")
	    .success(function(data)
	    {
	    	if(data.result)
	    	{
	    		$location.path('/dashboard');
          		// $window.location.href="user/#/";
            	$timeout(deferred.resolve,0);
	    	}
	    	else
	    	{
          		// $window.location.href="/#/";
          		$timeout(deferred.resolve, 0);
	    		// $location.path('/');          		
	    	}
	    })
      	return deferred.promise;
    };

    var StartSurvey = function($q,$timeout,$http,$rootScope,$window,$location)
    {
        // console.log("checkLoggedIn")
        $rootScope.IndexFlag = false;
        var deferred = $q.defer();
        $http.get("/user/loggedin")
        .success(function(data)
        {
            if(data.result)
            {
                // $location.path('/dashboard');
                // $window.location.href="user/#/";
                $timeout(deferred.resolve,0);
            }
            else
            {
                // $window.location.href="/user/#/";
                $location.path('/');
                $timeout(deferred.resolve, 0);
                // $location.path('/');                 
            }
        })
        return deferred.promise;
    };

    var LinkStartSurvey = function($rootScope)
    {
        // console.log("checkLoggedIn")
        $rootScope.IndexFlag = false;
    };

    var LockScreen = function($q,$timeout,$http,$rootScope,$window,$location)
	{
		// console.log("checkLoggedIn")
	    $rootScope.IndexFlag = false;
	    var deferred = $q.defer();
	    $http.get("/user/lock_loggedin")
	    .success(function(data)
	    {
	    	if(data.result==200)
	    	{
	    		$location.path('/lock-screen');
          		// $window.location.href="user/#/";
            	$timeout(deferred.resolve,0);
	    	}
	    	else if(data.result==true)
	    	{
	    		$location.path('/lock-screen');
          		// $window.location.href="user/#/";
            	$timeout(deferred.resolve,0);
	    	}
	    	else
	    	{
          		// $window.location.href="/#/";
	    		$location.path('/');          		
          		$timeout(deferred.resolve, 0);
	    	}
	    })
      	return deferred.promise;
    };

    var ErrorPage = function($rootScope)
	{
	    $rootScope.IndexFlag = false;
    };


    $httpProvider.responseInterceptors.push(function($q, $location,$window) {
      return function(promise) {
        return promise.then(
          function(response){
            return response;
          },
        function(response) {
            if (response.status === 401)
            // $location.url('/');
          		// $window.location.href='/#/';
            return $q.reject(response);
          }
        );
      }
    });


	return $routeProvider
	.when('/',{
		redirectTo:'/login'
	})
	.when('/login',{
		templateUrl:'signin.html',
		controller :'LoginCtrl',
		resolve : {
			loggedIn:checkLoggedIn
		}
	})
	.when('/signup',{
		templateUrl:'signup.html',
		controller :'SignUpCtrl',
		resolve : {
			loggedIn:checkLoggedIn
		}
	})
	.when('/dashboard',
	{
		templateUrl:'dashboard.html',
		controller :'DashboardCtrl',
		resolve : {
			loggedOut:checkLoggedOut
		}
	})
	.when('/profile',
	{
		templateUrl:'profile.html',
		controller :'ProfileCtrl',
		resolve : {
			loggedOut:checkLoggedOut
		}
	})
	.when('/forgotpassword',
	{
		templateUrl:'forgotpassword.html',
		controller :'ForgotPasswordCtrl',
		resolve : {
			loggedOut:checkLoggedIn
		}
	})
	.when('/lock-screen',
	{
		templateUrl:'lock-screen.html',
		controller :'LockScreenCtrl',
		resolve : {
			loggedOut:LockScreen
		}
	})
	.when('/setting',
	{
		templateUrl:'editprofile.html',
		controller :'EditProfileCtrl',
		resolve : {
			loggedOut:checkLoggedOut
		}
	})
	.when('/category',
	{
		templateUrl:'survey/viewcategory.html',
		controller :'ViewCategoryCtrl',
		resolve : {
			loggedOut:checkLoggedOut
		}
	})
	.when('/category/add',
	{
		templateUrl:'survey/category.html',
		controller :'AddCategoryCtrl',
		resolve : {
			loggedOut:checkLoggedOut
		}
	})
    .when('/category/subcategory/:catid',
    {
        templateUrl:'survey/viewsubcategory.html',
        controller :'ViewSubCategoryCtrl',
        resolve : {
            loggedOut:checkLoggedOut
        }
    })
    .when('/category/subcategory/add/:catid',
    {
        templateUrl:'survey/subcategory.html',
        controller :'AddSubCategoryCtrl',
        resolve : {
            loggedOut:checkLoggedOut
        }
    })
	.when('/survey',
	{
		templateUrl:'survey/survey.html',
		controller :'ViewAllSurveyCtrl',
		resolve : {
			loggedOut:checkLoggedOut
		}
	})	
	.when('/survey/create',
	{
		templateUrl:'survey/surveycreate.html',
		controller :'SubmitSurveyCtrl',
		resolve : {
			loggedOut:checkLoggedOut
		}
	})	
	.when("/survey/create/:surveyid/:catid", {
		templateUrl: "survey/create.html",
		controller :'CreateSurveyCtrl',
		resolve: {   
			loggedOut:checkLoggedOut  
		}
	})
    .when("/survey/create/view/:surveyid/:catid", {
        templateUrl: "survey/createview.html",
        controller :'ViewSurveyQuestionCtrl',
        resolve: {   
            loggedOut:checkLoggedOut  
        }
    })
    .when("/survey/edit/:surveyid/:catid", {
        templateUrl: "survey/create.html",
        controller :'CreateSurveyCtrl',
        resolve: {   
            loggedOut:checkLoggedOut  
        }
    })
    .when("/survey/preview/:surveyid/:catid", {
        templateUrl: "survey/previewform.html",
        controller :'FeedbackPreviewQuestion',
        resolve: {   
            loggedOut:checkLoggedOut  
        }
    })
    .when("/survey/start/:surveyid/:catid", {
        templateUrl: "survey/feedbackform.html",
        controller :'FeedbackQuestionCtrl',
        resolve: {   
            loggedOut:StartSurvey
        }
    })
    .when("/link/:userid/:surveyid/:catid", {
        templateUrl: "survey/feedbackform.html",
        controller :'FeedbackQuestionLinkCtrl',
        resolve: {   
            loggedOut:LinkStartSurvey
        }
    })
	.when('/404',
	{
		templateUrl:'404.html',
		resolve : {
			loggedOut:ErrorPage
		}
	})
	.otherwise({
            redirectTo: "/404"
        })
})

.directive('match', function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            scope: {
                match: '='
            },
            link: function(scope, elem, attrs, ctrl) {
                scope.$watch(function() {
                    var modelValue = ctrl.$modelValue || ctrl.$$invalidModelValue;
                    return (ctrl.$pristine && angular.isUndefined(modelValue)) || scope.match === modelValue;
                }, function(currentValue) {
                    ctrl.$setValidity('match', currentValue);
                });
            }
        };
    })

.factory("logger", [function() {
            var logIt;
            return toastr.options = {
                closeButton: !0,
                positionClass: "toast-bottom-right",
                timeOut: "3000"
            }, logIt = function(message, type) {
                return toastr[type](message)
            }, {
                log: function(message) {
                    logIt(message, "info")
                },
                logWarning: function(message) {
                    logIt(message, "warning")
                },
                logSuccess: function(message) {
                    logIt(message, "success")
                },
                logError: function(message) {
                    logIt(message, "error")
                }
            }
        }])

.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}])

.service('fileUpload', ['$http','logger',function ($http,logger) 
{
    this.uploadFileToUrl = function(file,files, uploadUrl)
    {
        var fd = new FormData();
        fd.append('file', file);
        fd.append('files',files);

        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(data)
        {
        	if(data.result==200)
        	{
        		logger.logSuccess("Successfully updated.");
        		location.reload();
        	}
        	else
        	{
        		logger.logError("Something went wrong.Please try again.");
        	}
        })
    }
}])

.service('FormService', function FormService($http) 
    {

    var formsJsonPath = './static-data/sample_forms.json';
    return {
        fields:[
            {
                name : 'textfield',
                value : 'Textfield'
            },
            {
                name : 'radio',
                value : 'Radio Buttons'
            },
            {
                name : 'dropdown',
                value : 'Dropdown List'
            },
            {
                name : 'time',
                value : 'Time'
            },
            {
                name : 'textarea',
                value : 'Text Area'
            },
           {
                name : 'checkbox',
                value : 'Checkbox'
            },
             {
                name : 'star',
                value : 'Star'
            },
        ],
        form:function (id) {
            // $http returns a promise, which has a then function, which also returns a promise
            return $http.get(formsJsonPath).then(function (response) {
                var requestedForm = {};
                angular.forEach(response.data, function (form) {
                    if (form.form_id == id) requestedForm = form;
                });
                return requestedForm;
            });
        },
        forms: function() {
            return $http.get(formsJsonPath).then(function (response) {
                return response.data;
            });
        }
    };
})

.factory('mySharedService', function($rootScope) {
    var sharedService = {};
    
    sharedService.message = '';

    sharedService.prepForBroadcast = function(msg) {
        this.message = msg;
        this.broadcastItem();
    };

    sharedService.broadcastItem = function() {
        $rootScope.$broadcast('handleBroadcast');
    };

    return sharedService;
})

.directive('fieldDirective', function ($http, $compile) {

        var getTemplateUrl = function(field) {
            var type = field.field_type;
            var templateUrl = '';

            switch(type) {
                case 'textfield':
                    templateUrl = './survey/directive-templates/field/textfield.html';
                    break;
                case 'textarea':
                    templateUrl = './survey/directive-templates/field/textarea.html';
                    break;
                case 'checkbox':
                    templateUrl = './survey/directive-templates/field/checkbox.html';
                    break;
                
                case 'time':
                    templateUrl = './survey/directive-templates/field/date.html';
                    break;
                case 'dropdown':
                    templateUrl = './survey/directive-templates/field/dropdown.html';
                    break;
                case 'radio':
                    templateUrl = './survey/directive-templates/field/radio.html';
                    break;
                case 'star':
                    templateUrl = './survey/directive-templates/field/star.html';
                    break;
            }
            return templateUrl;
        }

        var linker = function(scope, element) {
            // GET template content from path
            var templateUrl = getTemplateUrl(scope.field);
            $http.get(templateUrl).success(function(data) {
                element.html(data);
                $compile(element.contents())(scope);
            });
        }

        return {
            template: '<div>{{field}}</div>',
            restrict: 'E',
            scope: {
                field:'='
            },
            link: linker
        };
  })

.directive('formDirective', function () {
    return {
                controller: function($scope,$http,$location,logger,$rootScope)
                {
  
                    $scope.submit = function()
                    {
                    }

                    // cancel 
                    $scope.cancel = function()
                    {
                        alert('Form canceled..');
                    }

                },
                templateUrl: '../views/admin/survey/directive-templates/form/form.html',
                restrict: 'E',
                scope: {
                    form:'='
                }
        };
})