// Display all category
function ViewCategoryCtrl($scope,Category,logger,$filter,$modal)
{
	// view category data
	$scope.DisplayCategory = function()
	{
	    var init;
	    $scope.pagedata=[];
    	Category.CategoryFind().get(function (data)
		{
			if(data.result==200)
			{
				var decrypted = CryptoJS.TripleDES.decrypt(data.data, data.value);
				var CatDetails = decrypted.toString(CryptoJS.enc.Utf8);
				var CatData = JSON.parse(CatDetails);
                if(CatData && CatData.length!=0)
                {
    				$scope.stores = CatData;
                    return $scope.stores,
                	$scope.searchKeywords = "", $scope.filteredStores = [], $scope.row = "", $scope.select = function(page) {
                        var end, start;
                        return start = (page - 1) * $scope.numPerPage, end = start + $scope.numPerPage, $scope.currentPageStores = $scope.filteredStores.slice(start, end)
                    }, $scope.onFilterChange = function() {
                        return $scope.select(1), $scope.currentPage = 1, $scope.row = ""
                    }, $scope.onNumPerPageChange = function() {
                        return $scope.select(1), $scope.currentPage = 1
                    }, $scope.onOrderChange = function() {
                        return $scope.select(1), $scope.currentPage = 1
                    }, $scope.search = function() {
                        return $scope.filteredStores = $filter("filter")($scope.stores, $scope.searchKeywords), $scope.onFilterChange()
                    }, $scope.order = function(rowName) {
                        return $scope.row !== rowName ? ($scope.row = rowName, $scope.filteredStores = $filter("orderBy")($scope.stores, rowName), $scope.onOrderChange()) : void 0
                    }, $scope.numPerPageOpt = [3, 5, 10, 20], $scope.numPerPage = $scope.numPerPageOpt[2], $scope.currentPage = 1, $scope.currentPageStores = [], (init = function() {
                        return $scope.search(), $scope.select($scope.currentPage)
                	})()
                }
                else
                {
                    logger.logError("No record found.")
                }
            }
            else if(data.result==404)
			{
				logger.logError("No record found.")
			}
			else
			{
				logger.logError('failed please try again.')
			} 
        })
    }
    $scope.DisplayCategory();

    // update status active and inactive
    $scope.updateStatus = function(categoryId,name)
    {
    	Category.UpdateStatus().get({id:categoryId,catname:name},
    		function (data)
    		{
    			if(data.result==200)
    			{
    				logger.logSuccess("Updated successfully.");
    				$scope.DisplayCategory(); 
    			}
    			else
    			{
    				logger.logError("failed please try again.");
    			}
    		});             
    }

    $scope.RemoveCategory = function(categoryId)
	{
		var size = 'sm';
	    var modalInstance = $modal.open({
	      templateUrl: 'Alert.html',
	      controller: 'RemoveCategoryCtrl',
	      size: size,
	      resolve: {
	        ModalId: function () {
	          return categoryId;
	        }
	      }
	    });

		modalInstance.result.then(function (selectedItem) 
		{
		      $scope.selected = selectedItem;
		}, function () 
		{
		      // $log.info('Modal dismissed at: ' + new Date());
		});
	}

    $scope.EditCategory = function(CatId)
    {
        var size = 'sm';
        var modalInstance = $modal.open({
          templateUrl: 'survey/editcategory.html',
          controller: 'EditCategoryCtrl',
          size: size,
          resolve: {
            CatId: function () 
            {
              return CatId;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) 
        {
              $scope.selected = selectedItem;
        }, function () 
        {
              // $log.info('Modal dismissed at: ' + new Date());
        });
    }
}

// view subcategory data 
function ViewSubCategoryCtrl($scope,Category,logger,$filter,$modal,$routeParams,$location)
{
    function DisplaySubcategoryData()
    {
        Category.FindAllSubCategory().get({cateId:$routeParams.catid},
        function (data)
        {
            if(data.result==200)
            {
                var decrypted = CryptoJS.TripleDES.decrypt(data.data, data.value);
                var SubCateDetails = decrypted.toString(CryptoJS.enc.Utf8);
                var SubCateData = JSON.parse(SubCateDetails);
                if(SubCateData && SubCateData.length!=0)
                {
                    $scope.stores = SubCateData;
                    return $scope.stores,
                        $scope.searchKeywords = "", $scope.filteredStores = [], $scope.row = "", $scope.select = function(page) {
                            var end, start;
                            return start = (page - 1) * $scope.numPerPage, end = start + $scope.numPerPage, $scope.currentPageStores = $scope.filteredStores.slice(start, end)
                        }, $scope.onFilterChange = function() {
                            return $scope.select(1), $scope.currentPage = 1, $scope.row = ""
                        }, $scope.onNumPerPageChange = function() {
                            return $scope.select(1), $scope.currentPage = 1
                        }, $scope.onOrderChange = function() {
                            return $scope.select(1), $scope.currentPage = 1
                        }, $scope.search = function() {
                            return $scope.filteredStores = $filter("filter")($scope.stores, $scope.searchKeywords), $scope.onFilterChange()
                        }, $scope.order = function(rowName) {
                            return $scope.row !== rowName ? ($scope.row = rowName, $scope.filteredStores = $filter("orderBy")($scope.stores, rowName), $scope.onOrderChange()) : void 0
                        }, $scope.numPerPageOpt = [3, 5, 10, 20], $scope.numPerPage = $scope.numPerPageOpt[2], $scope.currentPage = 1, $scope.currentPageStores = [], (init = function() {
                            return $scope.search(), $scope.select($scope.currentPage)
                        })()
                }
                else
                {
                    logger.logError("No record found.")
                }
            }
            else
            {
                logger.logError('failed please try again.')
            } 
        }); 
    }
    DisplaySubcategoryData();
    
    // add new subcategory
    $scope.AddSubCategory = function()
    {
        $location.path('/category/subcategory/add/'+$routeParams.catid);
    }

    $scope.RemoveSubCategory = function(SubCatId)
    {
        var size = 'sm';
        var modalInstance = $modal.open({
          templateUrl: 'Alert.html',
          controller: 'RemoveSubCategoryCtrl',
          size: size,
          resolve: {
            SubCatId: function () 
            {
              return SubCatId;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) 
        {
              $scope.selected = selectedItem;
        }, function () 
        {
              // $log.info('Modal dismissed at: ' + new Date());
        });
    }
    // edit Subcategory
    $scope.EditSubCategory = function(SubCatId)
    {
        var size = 'sm';
        var modalInstance = $modal.open({
          templateUrl: 'survey/editsubcategory.html',
          controller: 'EditSubCategoryCtrl',
          size: size,
          resolve: {
            SubCatId: function () 
            {
              return SubCatId;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) 
        {
              $scope.selected = selectedItem;
        }, function () 
        {
              // $log.info('Modal dismissed at: ' + new Date());
        });
    }
    // Update status
    $scope.updateStatus = function(SubCatId,StatusValue)
    {
        Category.SubCateUpdateStatus().get(
            {   subcateId:SubCatId,
                status:StatusValue},
            function (data)
            {
                if(data.result==200)
                {
                    logger.log("Updated successfully.");
                    DisplaySubcategoryData();
                }
                else
                {
                    logger.logError("failed please try again.");
                }
            })
    }
}

// Add SubCategory 
function AddSubCategoryCtrl($scope,Category,logger,$filter,$modal,$routeParams,$location)
{
    $scope.SubmitSubCategory = function(subcategory)
    {
        Category.SubCategoryCreate().save({cateId:$routeParams.catid},subcategory,
        function (data)
        {
            if(data.result==200)
            {
                logger.logSuccess("Successfully added.");
                $location.path('/category/subcategory/'+$routeParams.catid);
            }
            else if(data.result==401)
            {
                logger.logError("Category name already exists.");
            }
            else
            {
                logger.logError("please try again.");
            }
        })
    }

    $scope.back = function()
    {
        $location.path('/category/subcategory/'+ $routeParams.catid);
    }
}

// create category section
function AddCategoryCtrl($scope,Category,$location,logger)
{
    $scope.SubmitCategory = function(category)
    {
        Category.CategoryCreate().save(category,function (data)
        {
            if(data.result==200)
            {
                logger.logSuccess("Successfully added.");
                var decrypted = CryptoJS.TripleDES.decrypt(data.data, data.value);
                var CateDetails = decrypted.toString(CryptoJS.enc.Utf8);
                var CateDataId = JSON.parse(CateDetails);
                $location.path('/category/subcategory/'+CateDataId);
            }
            else if(data.result==401)
            {
                logger.logError("Category name already exists.");
            }
            else
            {
                logger.logError("please try again.");
            }
        })
    }   

    $scope.back = function()
    {
        $location.path('/category');
    }
}


/*Modal Category Controllers*/
function RemoveCategoryCtrl($scope,$modalInstance,ModalId,Category,logger,$route) 
{	
	$scope.ok = function()
	{
		Category.RemoveCategory().get({id:ModalId},function (data)
			{
				if(data.result==200)
				{
					logger.logSuccess("Removed successfully.");
					$modalInstance.dismiss('cancel');
					$route.reload();
				}
				else
				{
					logger.logError("failed please try again.");
				}
			})
	}
	$scope.cancel = function () 
	{
		$modalInstance.dismiss('cancel');
	};
}	

/*Modal Subcategory Controllers*/
function RemoveSubCategoryCtrl($scope,$modalInstance,Category,logger,$route,SubCatId) 
{   
    $scope.ok = function()
    {
        Category.RemoveSubCategory().get({subcateId:SubCatId},
            function (data)
            {
                if(data.result==200)
                {
                    logger.logError("Removed successfully.");
                    $modalInstance.dismiss('cancel');
                    $route.reload();
                }
                else
                {
                    logger.logError("failed please try again.");
                }
            });
    }
    $scope.cancel = function () 
    {
        $modalInstance.dismiss('cancel');
    };
}  

/*Modal Edit Category*/
function EditCategoryCtrl($scope,$modalInstance,Category,logger,$route,CatId) 
{   
    Category.FindOneCatgeory().get({cateId:CatId},
        function (data)
        {
            if(data.result==200)
            {
                var decrypted = CryptoJS.TripleDES.decrypt(data.data, data.value);
                var CateDetails = decrypted.toString(CryptoJS.enc.Utf8);
                var CateData = JSON.parse(CateDetails);
                $scope.category = CateData;
            }
            else
            {
                logger.logError("failed please try again.")
            }
        })

    $scope.UpdateCategory = function(data)
    {
        Category.UpdateCategory().save({cateId:CatId},data,
            function (data)
            {
                if(data.result==200)
                {
                    logger.log("Updated successfully.");
                    $modalInstance.dismiss('cancel');
                    $route.reload();
                }
                else
                {
                    logger.logError("failed please try again.");
                }
            });
    }
    $scope.cancel = function () 
    {
        $modalInstance.dismiss('cancel');
    };
} 

/*Modal Edit SubCategory*/
function EditSubCategoryCtrl($scope,$modalInstance,Category,logger,$route,SubCatId) 
{   
    Category.FindOneSubCatgeory().get({subcateId:SubCatId},
        function (data)
        {
            if(data.result==200)
            {
                var decrypted = CryptoJS.TripleDES.decrypt(data.data, data.value);
                var SubCateDetails = decrypted.toString(CryptoJS.enc.Utf8);
                var SubCateData = JSON.parse(SubCateDetails);
                $scope.subcate = SubCateData;
            }
            else
            {
                logger.logError("failed please try again.")
            }
        })

    $scope.UpdateSubCategory = function(data)
    {
        Category.UpdateSubCategory().save({subcateId:SubCatId},data,
            function (data)
            {
                if(data.result==200)
                {
                    logger.log("Updated successfully.");
                    $modalInstance.dismiss('cancel');
                    $route.reload();
                }
                else
                {
                    logger.logError("failed please try again.");
                }
            });
    }
    $scope.cancel = function () 
    {
        $modalInstance.dismiss('cancel');
    };
}  

// Display All Survey Values
function ViewAllSurveyCtrl($scope,SurveyBuilder,logger,$location,$filter,$modal)
{
	SurveyBuilder.FindAllSurvey().get(function (data)
	{
		if(data.result==200)
		{
			var decrypted = CryptoJS.TripleDES.decrypt(data.data, data.value);
			var SurveyDetails = decrypted.toString(CryptoJS.enc.Utf8);
			var SurveyData = JSON.parse(SurveyDetails);
            if(SurveyData && SurveyData.length!=0)
            {
    			$scope.stores = SurveyData;
                return $scope.stores,
                    $scope.searchKeywords = "", $scope.filteredStores = [], $scope.row = "", $scope.select = function(page) {
                        var end, start;
                        return start = (page - 1) * $scope.numPerPage, end = start + $scope.numPerPage, $scope.currentPageStores = $scope.filteredStores.slice(start, end)
                    }, $scope.onFilterChange = function() {
                        return $scope.select(1), $scope.currentPage = 1, $scope.row = ""
                    }, $scope.onNumPerPageChange = function() {
                        return $scope.select(1), $scope.currentPage = 1
                    }, $scope.onOrderChange = function() {
                        return $scope.select(1), $scope.currentPage = 1
                    }, $scope.search = function() {
                        return $scope.filteredStores = $filter("filter")($scope.stores, $scope.searchKeywords), $scope.onFilterChange()
                    }, $scope.order = function(rowName) {
                        return $scope.row !== rowName ? ($scope.row = rowName, $scope.filteredStores = $filter("orderBy")($scope.stores, rowName), $scope.onOrderChange()) : void 0
                    }, $scope.numPerPageOpt = [3, 5, 10, 20], $scope.numPerPage = $scope.numPerPageOpt[2], $scope.currentPage = 1, $scope.currentPageStores = [], (init = function() {
                        return $scope.search(), $scope.select($scope.currentPage)
                    })()
            }
            else
            {
                logger.logError("No record found.")
            }
		}
        else if(data.result==404)
		{
			logger.logError("No record found.")
		}
		else
		{
			logger.logError('failed please try again.')
		} 
	});	

    $scope.removeSurvey = function(SurveyId)
    {
        var size = 'sm';
        var modalInstance = $modal.open({
          templateUrl: 'alertall.html',
          controller: 'RemoveSurveyCtrl',
          size: size,
          resolve: {
            SurveyId: function () 
            {
              return SurveyId;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) 
        {
              $scope.selected = selectedItem;
        }, function () 
        {
              // $log.info('Modal dismissed at: ' + new Date());
        });
    }

    $scope.FeedbackLink = function(SurveyId,CategoryId,UserId)
    {
        var size = 'sm';
        var modalInstance = $modal.open({
          templateUrl: 'surveylink.html',
          controller: 'SurveyFeedbackLinkCtrl',
          size: size,
          resolve: {
            SurveyID: function () 
            {
              return SurveyId;
            },
            CategoryID: function () 
            {
              return CategoryId;
            },
            UserID: function () 
            {
              return UserId;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) 
        {
              $scope.selected = selectedItem;
        }, function () 
        {
              // $log.info('Modal dismissed at: ' + new Date());
        });
    }
}

/*Modal Survey Controllers*/
function RemoveSurveyCtrl($scope,$modalInstance,SurveyBuilder,logger,$route,SurveyId) 
{   
    $scope.ok = function()
    {
        SurveyBuilder.RemoveSurvey().get({surveyId:SurveyId},
            function (data)
            {
                if(data.result==200)
                {
                    logger.logError("Removed successfully.");
                    $modalInstance.dismiss('cancel');
                    $route.reload();
                }
                else
                {
                    logger.logError("failed please try again.");
                }
            });
    }
    $scope.cancel = function () 
    {
        $modalInstance.dismiss('cancel');
    };
}  

/*Modal Survey Controllers*/
function SurveyFeedbackLinkCtrl($scope,$modalInstance,SurveyBuilder,logger,$route,SurveyID,CategoryID,UserID) 
{   
    $scope.feedback = {};
    var User_ID = btoa(UserID);
    var Survey_ID = btoa(SurveyID);
    var Category_ID = btoa(CategoryID);
    var Links = location.protocol+'//'+location.host+'/user/#/link/'+User_ID+'/'+Survey_ID+'/'+Category_ID;
    
    $scope.feedback.feedbacklink  = Links;

    $scope.ok = function(data)
    {
        var emailLength = (data.email.match(/,/g) || []).length;
        if(20>emailLength)
        {
            // console.log(data)
            SurveyBuilder.FeedbackLink().save(data,
                function (data)
                {
                    if(data.result==200)
                    {
                        logger.logSuccess("Successfully send.");
                        $modalInstance.dismiss('cancel');
                        $route.reload();
                    }
                    else
                    {
                        logger.logError("failed please try again.");
                    }
                });
        }
        else
        {
            logger.logError("You cannot send more than 20 email.");
        }
    }
    $scope.cancel = function () 
    {
        $modalInstance.dismiss('cancel');
    };
}  

// submit survey name with category
function SubmitSurveyCtrl($scope,Category,SurveyBuilder,logger,$location)
{
    Category.CategoryFindByStatus().get(function (data)
    {
        if(data.result==200)
        {
            var decrypted = CryptoJS.TripleDES.decrypt(data.data, data.value);
            var CatDetails = decrypted.toString(CryptoJS.enc.Utf8);
            var CatData = JSON.parse(CatDetails);
            $scope.category = CatData;
        }
        else if(data.result==404)
        {
            logger.logError("No record found.")
        }
        else
        {
            logger.logError('failed please try again.')
        } 
    });

    $scope.SubmitSurvey = function(data)
    {
        SurveyBuilder.SurveyName().save(data,function (data)
        {
            if(data.result==200)
            {
                logger.logSuccess("Successfully created.");
                var decrypted = CryptoJS.TripleDES.decrypt(data.data, data.value);
                var SurveyDetails = decrypted.toString(CryptoJS.enc.Utf8);
                var SurveyData = JSON.parse(SurveyDetails);
                $location.path("/survey/create/"+SurveyData.survey_id+"/"+SurveyData.category_id);
            }
            else if(data.result==401)
            {
                logger.logError("Survey name already exists.");
            }
            else
            {
                logger.logError("failed please try again.");
            }
        })
    }
}

// Create Survey Ctrl
function CreateSurveyCtrl($scope,Category,SurveyBuilder,   $rootScope,$location,logger,$http,$dialog,$routeParams,FormService,$route)
{
    // Display Survey Name and Category Name
    function DisplaySurvey()
    {
        SurveyBuilder.FindOneSurveyDetails().get({ surveyId : $routeParams.surveyid,cateId : $routeParams.catid },
            function (data)
            {
                if(data.result==200)
                {
                    var decrypted = CryptoJS.TripleDES.decrypt(data.data, data.value);
                    var SurveyDetails = decrypted.toString(CryptoJS.enc.Utf8);
                    var SurveyData = JSON.parse(SurveyDetails);
                    $scope.Survey = SurveyData;
                }
                else
                {
                    logger.logError('failed please try again.');
                }
            })
    }
    DisplaySurvey();

    // find categories wise data
    function FindCategoryWiseQuestion()
    {        
        $rootScope.DisplayBuilder = true;
        //find category details
        SurveyBuilder.FindCategoryQuestion().get({ surveyId : $routeParams.surveyid,cateId : $routeParams.catid },
        function (data)
        {
            if(data.result==200)
            {
                var decrypted = CryptoJS.TripleDES.decrypt(data.questdata, data.value);
                var QuestDetails = decrypted.toString(CryptoJS.enc.Utf8);
                var QuesData = JSON.parse(QuestDetails);
                $scope.question = QuesData;

                var decrypted = CryptoJS.TripleDES.decrypt(data.catedata, data.value);
                var Cat_Details = decrypted.toString(CryptoJS.enc.Utf8);
                var Cat_Data = JSON.parse(Cat_Details);
                $scope.quesFor = Cat_Data;
            }
            else
            {
                logger.logError('failed please try again.');
            }
        });

        // $http.get('/surveybuilder/findcategoryquestion/'+$routeParams.surveyid+'/'+category.catId)
        // .success(function(data, status, headers, config) {
        //                 if (data.result == 200) 
        //                 {
        //                     $scope.question = data.data;
        //                     $scope.quesFor = data.quesfordata;
        //                 } 
        //                 else if (data.result == 404) 
        //                 {
        //                     logger.logError('No record found');
        //                 }
        //             })

    }

    FindCategoryWiseQuestion();

    // add new field drop-down:
    $scope.addField = {};
    $scope.addField.types = FormService.fields;
    $scope.addField.new = $scope.addField.types[0].name;

    // create new field button click
    $scope.addNewField = function(addField)
    {
        var newField = {
            "field_title" : "What’s your favourite colour?" ,
            "field_type" : addField.name,
            "field_required" : true
                };

        // add questions
        SurveyBuilder.AddNewQuestion().save(
            {   surveyId: $routeParams.surveyid,
                cateId : $routeParams.catid},newField,
                function (data)
                {
                    if(data.result==200)
                    {
                        logger.logSuccess("New question added.");
                        FindCategoryWiseQuestion();
                    }
                    else
                    {
                        logger.logError("failed please try again.")
                    }
                })

    // add question click on button 
    // $http.post('/surveybuilder/addquestion/'+$routeParams.surveyid+'/'+$rootScope.catid,newField)
    //          .success(function(data, status, headers, config) {
    //                 if (data.result == 200) 
    //                 {
    //                     logger.logSuccess("New question added.");
    //                     $scope.form = {};
    //                     $scope.form.form_fields = data.data;
    //                     // $route.reload();
    //                     Display();
                        
    //                 } 
    //                 else if (data.result == 404) 
    //                 {
    //                     logger.logError('No record found');
    //                 }
    //             })

        // $scope.form.form_fields.push(newField);
    }

    // back survey
    $scope.backsurvey = function()
    {

        $location.path('/survey');
    }

    // deletes particular field on button click
    $scope.deleteField = function (questionId)
    {
        SurveyBuilder.RemoveQuestion().get({questId:questionId},
            function (data)
            {
                if(data.result==200)
                {
                    logger.logError("Question deleted.");
                    FindCategoryWiseQuestion();                    
                }
                else
                {
                    logger.logError("failed please try again.");
                }
            });
    }

    // save particular field on button click
    $scope.updateField = function (data,questionId)
    {
        SurveyBuilder.UpdateQuestion().save({questId:questionId},data,
            function (data)
            {
                if(data.result==200)
                {
                    logger.log("Updated successfully.");
                    FindCategoryWiseQuestion();
                }
                else
                {
                    logger.logError("failed please try again.");
                }
            })

        // $http.post('/surveybuilder/updatequestion/'+questionId,data)
        //       .success(function(data, status, headers, config) {
        //             if (data.result == 200) 
        //             {
        //                 logger.log("Question updated.");
        //                 Display();
        //                 // $route.reload();
        //             } 
        //             else if (data.result == 404) 
        //             {
        //                 logger.logError('No record found');
        //             }
        //         })
    }

    // add new option to the field
    $scope.addOption = function (field)
    {
        if(!field.field_options)
            field.field_options = new Array();

        var lastOptionID = 0;

        if(field.field_options[field.field_options.length-1])
            lastOptionID = field.field_options[field.field_options.length-1].option_id;

        // new option's id
        var option_id = lastOptionID + 1;

        var newOption = {
            "option_id" : option_id,
            "option_title" : "Option " + option_id,
            "option_value" : option_id
        };

        // put new option into field_options array
        field.field_options.push(newOption);
    }


    //Preview Question
    $scope.preview = function()
    {
        // console.log($rootScope.categoryId)   
        $location.path('/survey/create/view/'+$routeParams.surveyid+'/'+$routeParams.catid);

    }

    // delete particular option
    $scope.deleteOption = function (field, option)
    {
        for(var i = 0; i < field.field_options.length; i++){
            if(field.field_options[i].option_id == option.option_id){
                field.field_options.splice(i, 1);
                break;
            }
        }
    }

    // decides whether field options block will be shown (true for dropdown and radio fields)
    $scope.showAddOptions = function (field)
    {
        if(field.field_type == "radio"||field.field_type == "checkbox"|| field.field_type == "dropdown")
            return true;
        else
            return false;
    }

}

// View survey questions
function ViewSurveyQuestionCtrl($scope,SurveyBuilder,$location,logger,$routeParams)
{
    // find categories wise data
    function FindCategoryWiseQuestion()
    {        
        //find category details
        SurveyBuilder.FindCategoryQuestion().get({ surveyId : $routeParams.surveyid,cateId : $routeParams.catid },
        function (data)
        {
            if(data.result==200)
            {
                var decrypted = CryptoJS.TripleDES.decrypt(data.questdata, data.value);
                var QuestDetails = decrypted.toString(CryptoJS.enc.Utf8);
                var QuesData = JSON.parse(QuestDetails);
                $scope.question = QuesData;
            }
            else
            {
                logger.logError('failed please try again.');
            }
        });
    }

    FindCategoryWiseQuestion();

    $scope.backsurvey = function()
    {
        $location.path('/survey/create/'+$routeParams.surveyid+'/'+$routeParams.catid);
    }
}


// Preview survey questions
function FeedbackPreviewQuestion($scope,SurveyBuilder,$location,logger,$routeParams,$timeout)
{
    // find categories wise data
    function FindCategoryWiseQuestion()
    {        
        //find category details
        SurveyBuilder.FindCategoryQuestion().get({ surveyId : $routeParams.surveyid,cateId : $routeParams.catid },
        function (data)
        {
            if(data.result==200)
            {
                var decrypted = CryptoJS.TripleDES.decrypt(data.questdata, data.value);
                var QuestDetails = decrypted.toString(CryptoJS.enc.Utf8);
                var QuesData = JSON.parse(QuestDetails);
                $scope.question = QuesData;

                $scope.FlagQuestion = true;
                $timeout(function() {
                $scope.FlagQuestion = false;
                }, 3000);
            }
            else
            {
                logger.logError('failed please try again.');
            }
        });
    }

    FindCategoryWiseQuestion();

    $scope.backsurvey = function()
    {
        $location.path('/survey');
    }
}

// Feedback survey questions
function FeedbackQuestionCtrl($scope,SurveyBuilder,$location,logger,$routeParams,$timeout)
{
    // find categories wise data
    function FindCategoryWiseQuestion()
    {        
        //find category details
        SurveyBuilder.FindCategoryQuestion().get({ surveyId : $routeParams.surveyid,cateId : $routeParams.catid },
        function (data)
        {
            if(data.result==200)
            {
                var decrypted = CryptoJS.TripleDES.decrypt(data.questdata, data.value);
                var QuestDetails = decrypted.toString(CryptoJS.enc.Utf8);
                var QuesData = JSON.parse(QuestDetails);
                $scope.question = QuesData;

                $scope.FlagQuestion = true;
                $timeout(function() {
                $scope.FlagQuestion = false;
                }, 3000);
            }
            else
            {
                logger.logError('failed please try again.');
            }
        });
    }

    FindCategoryWiseQuestion();

    $scope.backsurvey = function()
    {
        $location.path('/survey');
    }

    $scope.submit = function()
    {
        var record = $scope.question;
        // console.log(record)
        var MathValue = Math.random();
        var value = btoa(MathValue);

        var secretString = JSON.stringify(record);
        var password = value;
        var encrypted = CryptoJS.TripleDES.encrypt(secretString, password);
        var Encrypt = encrypted.toString(); 

        var SendData = [];
        SendData.push({feedbackdata : Encrypt , data : value});

        SurveyBuilder.SubmitFeedbackSurvey().save(SendData,function (data)
        {
            if(data.result==200)
            {
                logger.logSuccess("Successfully submitted feedback form.");
                $scope.feedbackSubmitFlag = true;
                $scope.msg = 'Successfully submitted feedback form.';   

            }
            else
            {
                logger.logError("failed please try again.");
            }
        })
    }
}

// Feedback Link survey questions
// Feedback survey questions
function FeedbackQuestionLinkCtrl($scope,SurveyBuilder,$location,logger,$routeParams,$timeout)
{
    $scope.surveyid = atob($routeParams.surveyid);
    $scope.catid = atob($routeParams.catid);
    // find categories wise data
    function FindCategoryWiseQuestion()
    {        
        //find category details
        SurveyBuilder.FindCategoryQuestion().get({ surveyId : $scope.surveyid,cateId : $scope.catid },
        function (data)
        {
            if(data.result==200)
            {
                var decrypted = CryptoJS.TripleDES.decrypt(data.questdata, data.value);
                var QuestDetails = decrypted.toString(CryptoJS.enc.Utf8);
                var QuesData = JSON.parse(QuestDetails);
                $scope.question = QuesData;

                $scope.FlagQuestion = true;
                $timeout(function() {
                $scope.FlagQuestion = false;
                }, 3000);
            }
            else
            {
                logger.logError('failed please try again.');
            }
        });
    }

    FindCategoryWiseQuestion();

    $scope.backsurvey = function()
    {
        $location.path('/user');
    }

    $scope.submit = function()
    {
        var record = $scope.question;
        var MathValue = $routeParams.surveyid;
        var value = $routeParams.surveyid;// btoa(MathValue);

        var secretString = JSON.stringify(record);
        var password = value;
        var encrypted = CryptoJS.TripleDES.encrypt(secretString, password);
        var Encrypt = encrypted.toString(); 

        var SendData = [];
        SendData.push({feedbackdata : Encrypt , data : value});

        SurveyBuilder.SubmitFeedbackLinkSurvey().save(SendData,function (data)
        {
            if(data.result==200)
            {
                logger.logSuccess("Successfully submitted feedback form.");
                $scope.feedbackSubmitFlag = true;
                $scope.msg = 'Successfully submitted feedback form.';   

            }
            else
            {
                logger.logError("failed please try again.");
            }
        })
    }
} 

// checkbox Controllers
function CheckboxCtrl($scope,$rootScope)
{
   $scope.Flag = true;

    $scope.click = function()
    {
        $scope.Flag = false;
    }
}
// date controller
function DateCtrl($scope)
{
    $scope.dates = new Date();
    $scope.dates.setHours(0); 
    $scope.dates.setMinutes(0);
    $scope.time = {};
    $scope.time.value = $scope.dates;
    $scope.hstep = 1;
    $scope.mstep = 5;
    $scope.change = function(data)
    {
        if(data)
        {
            var time = data;
            var hrs = time.getHours();
            var min = time.getMinutes(); 
            if(hrs)
            {
                $scope.field.field_value = hrs *60 + min;
            } 
            else
            {
                $scope.field.field_value = min;
            }
        }
    }
}

function StarRatingCtrl($scope) 
{
        return $scope.rate = 0, $scope.max = 5, 
        $scope.isReadonly = !1,
        $scope.hoveringOver = function (value) 
        {
            // console.log($scope.rate)
            return $scope.overStar = value, $scope.percent = 100 * (value / $scope.max)
        },
        $scope.selected = function(rate)
        {
            $scope.field.field_value = rate
        }
}