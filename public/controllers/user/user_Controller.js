// Dashboard controller
function DashboardCtrl($scope,Category,SurveyBuilder,logger,$rootScope)
{
	Category.CategoryFind().get(function (data)
	{
		if(data.result==200)
		{
			var decrypted = CryptoJS.TripleDES.decrypt(data.data, data.value);
			var CatDetails = decrypted.toString(CryptoJS.enc.Utf8);
			var CatData = JSON.parse(CatDetails);
			$scope.category = CatData;
		}
		else
		{
			logger.logError("Failed please try again.")
		}
	})
	$scope.FindCategoryFeedbackData = function(catId)
	{
		SurveyBuilder.FeedbackDataByCateId().get({cateId:catId}, function (data)
		{
			if(data.result==200)
			{
				var decrypted = CryptoJS.TripleDES.decrypt(data.data, data.value);
				var FinalRecord = decrypted.toString(CryptoJS.enc.Utf8);
				var FinalData = JSON.parse(FinalRecord);
				// radio and drop down data
				$scope.RDCdata = FinalData.RadioDropCheckData;
				// checkbox data
				// Star data
				$scope.StarData = FinalData.StarData;
				// Time data
				$scope.TimeData = FinalData.TimeData;
				// Textfield and Textarea Data
				$scope.TextFieldArea = FinalData.TextFieldAreaData;

				$rootScope.ColorsArr=['#f7a35c','#90ed7d','#FF4D4D','#4D944D','#4D94FF','#8085e9','#f5d429','#7cb5ec','#FF704D','#66C285','#4DB8FF'];

				// Piechart Data
				var PieDataGraph =[];
				for (var i = 0; i < FinalData.RadioDropCheckData.length; i++) 
				{
					var Name = FinalData.RadioDropCheckData[i].SubcatNameF;
					var SubCatDataLength = FinalData.RadioDropCheckData[i].finalArray;
					var FinalPieData = [];
					for (var j = 0; j < SubCatDataLength.length; j++) 
					{
						FinalPieData.push([SubCatDataLength[j].TitleF,SubCatDataLength[j].CountF])
					};
				
					PieDataGraph.push( 
					{
                        options: 
                        {
                         	chart: 
	                          	{
		                            type: 'pie',
		                            width: 250,
		                            height: 350,
	                          	},
                        },
                        series: [{
                           "name": Name,"data":FinalPieData,
                            type: 'pie',
                            showInLegend: true,
                                dataLabels: {
                                    enabled: false,                        
                                },
                            colors:$rootScope.ColorsArr 
                              }],

                        title: 
                        	{
	                          	text: Name,
		                          	// style: 
		                          	// 	{
		                           //    		display: 'none'
		                          	// 	}                               
                        	},
                        subtitle: 
                         	{
                          	// text: 'Chart'
                          	text: '',
                          	style: 
                          	{
                              	display: 'none'
                          	}                               
                        },
                        legend: 
                        	{
                            	enabled: true,
                            	layout: 'vertical',
                            	align: 'right',
                            	// width: 200,
                            	verticalAlign: 'middle',
                            	useHTML: true,
                            	labelFormatter: function() 
                            	{
                                	return '<div style="text-align: left; width:130px;float:left;">' + this.name + '</div><div style="width:40px; float:left;text-align:right;">' + this.y + '%</div>';
                           		}
                        	}
                    })
                };
                $scope.value = PieDataGraph;
                // end piecharts data

                // Column bar-chart data
                var ColumnStarName = [];
				var ColumnStarData = [];
                for (var i = 0; i < FinalData.StarData.length; i++) 
				{
					ColumnStarName.push(FinalData.StarData[i].SubCategoryName);
					var RateInFive = parseFloat(FinalData.StarData[i].RatingValue) / parseFloat(FinalData.StarData[i].Count)
					var FixedStar = parseFloat(RateInFive.toFixed(2));
					ColumnStarData.push(FixedStar);
				}

				$scope.chartConfig_StarRate = 
				 	{
                        options: 
                        {
                          	chart: 
                          	{
                            	type: 'column'
                          	}
                        },
                        series:[{"name":'Rating', 
                                "data":ColumnStarData,
                                color:'#1c7ebb'}],
                        title: 
                        	{
                          		text: 'Bar-Chart'
                        	},
                        xAxis:
                        	{
                                categories: ColumnStarName
                        	},
                        yAxis: 
                        	{
	                           	title: 
	                           		{
	                               		text: 'Rating'
	                           		},
	                            max: 5,
	                            min: 0
                         	}
                    }

				var ColumnTimeName = [];
				var ColumnTimeData = [];

				for (var i = 0; i < FinalData.TimeData.length; i++) 
				{
					ColumnTimeName.push(FinalData.TimeData[i].SubCategoryName);
					var AvgTime = parseFloat(FinalData.TimeData[i].TimeValue) / parseFloat(FinalData.TimeData[i].Count)
					var FixedTime = parseFloat(AvgTime.toFixed(2));
					ColumnTimeData.push(FixedTime);
				}

				$scope.chartConfig_Time = 
				 	{
                        options: 
                        {
                          	chart: 
                          	{
                            	type: 'column'
                          	}
                        },
                        series:[{"name":'Average Time', 
                                "data":ColumnTimeData,
                                color:'#1c7ebb'}],
                        title: 
                        	{
                          		text: 'Column'
                        	},
                        xAxis:
                        	{
                                categories: ColumnTimeName
                        	},
                        yAxis: 
                        	{
	                           	title: 
	                           		{
	                               		text: 'Minutes'
	                           		},
	                            // max: 5,
	                            min: 0
                         	}
                    }
                
			}
			else
			{
				logger.logError("Failed please try again.");
			}
		})
	}
}

// Login User
function LoginCtrl($scope,User,logger,$location)
{
	$scope.Login = function(user)
	{
		User.Login().save(user,function(data)
		{
			if(data.result==200)
			{
				logger.logSuccess("Successfully login.")
				$location.path("/dashboard");
			}
			else if(data.result==402)
			{
				logger.logError("Email-Id is not registered please valid Email-Id.");
			}
			else if(data.result==401)
			{
				logger.logError("Password is incorrect please valid password.");
			}
			else
			{
				logger.logError("please try again.")
			}
		})
	}
}

function RedirectUserLoginCtrl($scope,$window)
{
	// $window.location.href="user/#/login";
}

// Header and footer value
function AppCtrl($scope,$location,User,logger,$http)
{
	$http.get("/user/loggedin")
	.success(function(data)
	{
		if(data.result)
		{
			User.Details().get(function(data)
			{
				if(data.result==200)
				{
					var decrypted = CryptoJS.TripleDES.decrypt(data.data, data.value);
					var UserDetails = decrypted.toString(CryptoJS.enc.Utf8);
					var User_detail_parse = JSON.parse(UserDetails);
					$scope.User = User_detail_parse;
				}
				else
				{
					logger.logError("Failed please try again.")
				}
			})
		}
		else
		{

		}
	})

	$scope.Logout = function()
	{
		User.Logout().get(function(data)
		{
			if(data.result==200)
			{
				$location.path('/login');
				logger.logSuccess("Successfully logout.");
			}
			else
			{
				logger.logError("Failed please try again.");
			}
		})
	}
}

// sign up 
function SignUpCtrl($scope,User,logger,$location)
{
	$scope.Signup = function(user)
	{
		User.Signup().save(user,function(data)
		{
			if(data.result==200)
			{
				var password = data.value;
				var decrypted = CryptoJS.TripleDES.decrypt(data.data, password);
				// console.log(decrypted.toString(CryptoJS.enc.Utf8))
				logger.logSuccess("Successfully saved.");
				$location.path('/login');
			}
			else if(data.result==402)
			{
				logger.logError("Email Id is already exists.");
			}
			else
			{
				logger.logError("Failed Please try again.");
			}
		})
	}
}

//Profile Details
function ProfileCtrl($scope,User,logger,$location)
{
	User.Details().get(function(data)
	{
		if(data.result==200)
		{
			var decrypted = CryptoJS.TripleDES.decrypt(data.data, data.value);
			var UserDetails = decrypted.toString(CryptoJS.enc.Utf8);
			var User_detail_parse = JSON.parse(UserDetails);
			$scope.UserDetails = User_detail_parse;
		}
		else
		{
			logger.logError("Failed please try again.")
		}
	})
}

// forgot Password
function ForgotPasswordCtrl(User,$location,logger,$scope)
{
	$scope.ForgotPassword = function(user)
	{
		User.ForgotPassword().save(user,function(data)
		{
			if(data.result==200)
			{
				logger.logSuccess("New password send your email.Please check your email.");
				$location.path("/")
			}
			else if(data.result==401)
			{
				logger.logError("Email is not exists.");
			}
			else if(data.result==402)
			{
				logger.logError("Some network problem please try again.");
			}
			else
			{
				logger.logError("Failed please try again.")
			}
		})
	}
}

// Lock Screen
function LockScreenCtrl($scope,$location,logger,User)
{
	$scope.SubmitPassword = function(user)
	{
		if(user)
		{
			User.LockPassword().save(user,function(data)
			{
				if(data.result==200)
				{
					logger.logSuccess("Successfully login.");
					$location.path("/dashboard");
				}
				else if(data.result==401)
				{
					logger.logError("Password is incorrect.");
				}
				else
				{
					logger.logError("Failed please try again.");
				}
			})
		}
		else
		{
			logger.logError("Please enter password.");
		}
	}
}

/*Edit User Details*/
function EditProfileCtrl($scope,$location,logger,User,$route,fileUpload,$http)
{
	User.Details().get(function(data)
	{
		if(data.result==200)
		{
			var decrypted = CryptoJS.TripleDES.decrypt(data.data, data.value);
			var UserDetails = decrypted.toString(CryptoJS.enc.Utf8);
			var User_detail_parse = JSON.parse(UserDetails);
			$scope.user = User_detail_parse;
		}
		else
		{
			logger.logError("Failed please try again.")
		}
	})

	$scope.SubmitProfile = function(user)
	{
		User.UpdateDetails().save(user,function(data)
		{
			if(data.result==200)
			{
				logger.log("Successfully updated.");
				location.reload();
			}
			else
			{
				logger.logError("Failed please try again.")
			}
		})
	}

	$scope.ChangePassword = function(user)
	{
		User.UpdatePassword().save(user,function(data)
		{
			if(data.result==200)
			{
				logger.log("Successfully updated.");
			}
			else if(data.result==401)
			{
				logger.logError("Current password is incorrect.");
			}
			else 
			{
				logger.logError("Failed please try again.")
			}
		})
	}

    $scope.uploadFile = function()
    {	       
        var file = $scope.myFile;
        var files = $scope.myFiles;        
        var uploadUrl = "/user/uploadProfile";
        if(file && files)
        {
        	fileUpload.uploadFileToUrl(file,files,uploadUrl);
    	}
    	else
    	{
    		logger.logError("Please select image.")
    	}
    }   
}