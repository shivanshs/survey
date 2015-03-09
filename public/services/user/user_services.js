var Services_user = angular.module('MyApp_Services',['ngResource'])

Services_user.factory('User',function ($resource)
{
	return	{

		Signup : function()
		{
			return $resource('/user/signup',{ 'save' : { method:'POST' }})
		},

		Login : function()
		{
			return $resource('/user/login',{ 'save' : { method :'POST' }})
		},

		Details : function()
		{
			return $resource('/user/details')
		},

		Logout : function()
		{
			return $resource('/user/logout')
		},

		ForgotPassword : function()
		{
			return $resource('/user/forgotpassword',{ 'save' : { method : 'POST'}})
		},

		LockPassword : function()
		{
			return $resource('/user/lockpassword',{	'save' : { method : 'POST' }})
		},

		UpdateDetails : function()
		{
			return $resource('/user/updatedetails', { 'save' : { method : 'POST' }})
		},

		UpdatePassword : function()
		{
			return $resource('/user/updatepassword', { 'save' : { method : 'POST' }})
		}
	}
})
.factory('Category',function ($resource)
{
	return	{
		// create new category
		CategoryCreate : function()
		{
			return $resource('/category/create',{ 'save' : { method:'POST' }});
		},
		// find all category
		CategoryFind : function()
		{
			return $resource('/category/find');
		},
		// find one category
		FindOneCatgeory : function()
		{
			return $resource('/category/FindOneCatgeory/:cateId')
		},
		// find category (status: true)
		CategoryFindByStatus : function()
		{
			return $resource('/category/FindByStatus');
		},
		// update status
		UpdateStatus : function()
		{
			return $resource('/category/updatestaus/:id/:catname');
		},
		// update category details
		UpdateCategory : function()
		{
			return $resource('/category/UpdateDetails/:cateId',{ ' save ' : { method : 'POST' }})
		},
		// remove category
		RemoveCategory : function()
		{
			return $resource('/category/RemoveCategory/:id');
		},
		// find all subcategory
		FindAllSubCategory : function()
		{
			return $resource('/subcategory/FindAllSubCategory/:cateId')
		},
		// add subcategory
		SubCategoryCreate : function()
		{
			return $resource('/subcategory/Add/:cateId',{ 'save' : { method : 'POST' }})
		},
		// remove sub category data
		RemoveSubCategory : function()
		{
			return $resource('/subcategory/RemoveSubCategory/:subcateId');
		},
		// Find One Subcategory data
		FindOneSubCatgeory : function()
		{
			return $resource('/subcategory/FindOneSubCatgeory/:subcateId');
		},
		// update subcategory data
		UpdateSubCategory : function()
		{
			return $resource('/subcategory/UpdateSubCategory/:subcateId',
				{ 'save' : { method : 'POST' }});
		},
		SubCateUpdateStatus : function()
		{
			return $resource('/subcategory/UpdateStatus/:subcateId/:status');
		}
	}
})
.factory('SurveyBuilder', function ($resource)
{
	return {

		// submit survey name 
		SurveyName : function()
		{
			return $resource('/SurveyBuilder/SurveyName',{ 'save' : { method : 'POST' }});
		},
		// find all survey
		FindAllSurvey : function()
		{
			return $resource('/SurveyBuilder/FindAllSurvey')
		},
		// find one survey name and survey category name
		FindOneSurveyDetails : function()
		{
			return $resource('/SurveyBuilder/FindOneSurveyDetails/:surveyId/:cateId');
		},
		// Add new questions
		AddNewQuestion : function()
		{
			return $resource('/SurveyBuilder/AddNewQuestion/:surveyId/:cateId',
					{ 'save' : { method : 'POST' }});
		},
		// find category wise question
		FindCategoryQuestion : function()
		{
			return $resource('/SurveyBuilder/FindCateQuestion/:surveyId/:cateId');
		},
		// Update questions
		UpdateQuestion : function()
		{
			return $resource('/SurveyBuilder/UpdateQuestions/:questId',
				{ 'save' : { method : 'POST' }});
		},
		// remove questions
		RemoveQuestion : function()
		{
			return $resource('/SurveyBuilder/RemoveQuestions/:questId');
		},
		//submit feedback survey
		SubmitFeedbackSurvey : function()
		{
			return $resource('/SurveyBuilder/SubmitFeedbackSurvey',
				{ 'save' : { method : 'POST' }})
		},
		// find feedback data
		FeedbackDataByCateId : function()
		{
			return $resource('/SurveyBuilder/FeedbackDataByCategoryID/:cateId');
		},
		// remove survey sucessfully
		RemoveSurvey : function()
		{
			return $resource('/SurveyBuilder/RemoveSurvey/:surveyId')
		},
		// feedback links
		FeedbackLink : function()
		{
			return $resource('/SurveyBuilder/FeedbackLink',
				{ 'save' : { method : 'POST' }})
		},
		SubmitFeedbackLinkSurvey : function()
		{
			return $resource('/SurveyBuilder/SubmitFeedbackLinkSurvey',
				{ 'save' : { method : 'POST' }})
		}
	}
})









// Flash Messages for storing data
.factory("flash", function($rootScope) {
      
      var SurveyData = [];

    return {
        setSurvey: function(message) {
          	SurveyData.push(message);
        },
        getSurvey: function() {
          	return SurveyData;
        },
        emptySurvey: function()
        {
            SurveyData = [];
        }
     };
})