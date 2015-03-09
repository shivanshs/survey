var express = require('express');
var router = express.Router();

var UserController = require('../controllers/usercontroller.js');
var SurveyBuilder = require('../controllers/surveybuilder.js');
var MailMessage = require('../controllers/mailmessage.js');

/* GET home page. */
router.get('/', function (req, res) {
  res.sendfile('public/views/home/index.html');
});
/* GET user page. */
router.get('/user', function (req, res) {
  res.sendfile('public/views/user/index.html');
});
/*Signup Page*/
router.post('/user/signup',function (req,res)
{
	UserController.SignupCtrl(req,res);
});
/*Signin Page*/
router.post('/user/login',function (req,res)
{
	UserController.SigninCtrl(req,res);
});
/*User Details*/
router.get('/user/details',function (req,res)
{
	UserController.UserDetails(req,res);
});
/*Logged In Details*/
router.get('/user/loggedin',function (req,res)
{
	UserController.UserLoggedIn(req,res);
});
/*Logged Lock Screen Details*/
router.get('/user/lock_loggedin',function (req,res)
{
	UserController.UserLockLoggedIn(req,res);
});
/*Logout User*/
router.get('/user/logout',function (req,res)
{
	UserController.UserLogout(req,res);
});
/*Forgopassword User*/
router.post('/user/forgotpassword',function (req,res)
{
	UserController.UserForgotPassword(req,res);
});
/*check lock-screen password*/
router.post('/user/lockpassword',function (req,res)
{
	UserController.UserLockScreenPassword(req,res);
});
/*update details*/
router.post('/user/updatedetails',function (req,res)
{
	UserController.UserUpdateDetails(req,res);
});
/*update password details*/
router.post('/user/updatepassword',function (req,res)
{
	UserController.UserUpdatePassword(req,res);
});
/*update profile details*/
router.post('/user/uploadProfile',function (req,res)
{
	UserController.UserUploadProfilePic(req,res);
});

/*User Category : create category*/
router.post('/category/create', function (req,res)
{
	SurveyBuilder.AddCategory(req,res);
})
/*User Category : Find Category*/
router.get('/category/find', function (req,res)
{
	SurveyBuilder.FindCategory(req,res);
})
// Find one category
router.get('/category/FindOneCatgeory/:cateId',function (req,res)
{
	SurveyBuilder.FindOneCatgeory(req,res);
})
/*User Category : Find Category*/
router.get('/category/FindByStatus', function (req,res)
{
	SurveyBuilder.FindByStatus(req,res);
})
/*Update category details*/
router.post('/category/UpdateDetails/:cateId', function (req,res)
{
	SurveyBuilder.UpdateCategory(req,res);
})
/*update status active or false*/
router.get('/category/updatestaus/:id/:catname', function (req,res)
{
	SurveyBuilder.UpdateStatus(req,res);
});
/*remove category*/
router.get('/category/RemoveCategory/:id', function (req,res)
{
	SurveyBuilder.RemoveCategory(req,res);
})
// create subcategory data
router.get('/subcategory/FindAllSubCategory/:cateId', function (req,res)
{
	SurveyBuilder.FindAllSubCategories(req,res);
});
// add subcategory data
router.post('/subcategory/Add/:cateId', function (req,res)
{
	SurveyBuilder.AddSubCategory(req,res);
})
// remove subcategory
router.get('/subcategory/RemoveSubCategory/:subcateId', function (req,res)
{
	SurveyBuilder.RemoveSubCategories(req,res);
});
// find one subcategory data
router.get('/subcategory/FindOneSubCatgeory/:subcateId', function (req,res)
{
	SurveyBuilder.FindOneSubCatgeory(req,res);
});
// update subcategory data
router.post('/subcategory/UpdateSubCategory/:subcateId', function (req,res)
{
	SurveyBuilder.UpdateSubCategory(req,res);
});
// update subcategory status
router.get('/subcategory/UpdateStatus/:subcateId/:status', function (req,res)
{
	SurveyBuilder.SubCategoryStatusUpdate(req,res);
})


// ############## SurveyBuilder Section
// submit survey name and category
router.post('/SurveyBuilder/SurveyName', function (req,res)
{
	SurveyBuilder.SubmitSurveyName(req,res);
})
// find all survey 
router.get('/SurveyBuilder/FindAllSurvey', function (req,res)
{
	SurveyBuilder.FindAllSurvey(req,res);
});
// find one survey name and category name
router.get('/SurveyBuilder/FindOneSurveyDetails/:surveyId/:cateId', function (req,res)
{
	SurveyBuilder.FindOneSurveyDetail(req,res);
})
// add new questions
router.post('/SurveyBuilder/AddNewQuestion/:surveyId/:catId', function (req,res)
{
	SurveyBuilder.AddNewQuestions(req,res);
});
// find category wise question
router.get('/SurveyBuilder/FindCateQuestion/:surveyId/:cateId', function (req,res)
{
	SurveyBuilder.FindCategoryQuestion(req,res);
});
// update questions
router.post('/SurveyBuilder/UpdateQuestions/:questId', function (req,res)
{
	SurveyBuilder.UpdateQuestion(req,res);
});
// remove questions
router.get('/SurveyBuilder/RemoveQuestions/:questId', function (req,res)
{
	SurveyBuilder.RemoveQuestion(req,res);
})
// submit feedback survey
router.post('/SurveyBuilder/SubmitFeedbackSurvey', function (req,res)
{
	SurveyBuilder.FeedbackSubmitSurvey(req,res);
});
// submit feedback link survey
router.post('/SurveyBuilder/SubmitFeedbackLinkSurvey', function (req,res)
{
	SurveyBuilder.FeedbackSubmitLinkSurvey(req,res);
});
// find feedback data
router.get('/SurveyBuilder/FeedbackDataByCategoryID/:cateId', function (req,res)
{
	SurveyBuilder.FeedbackDataByCategoryID(req,res);
});
// remove survey successfully
router.get('/SurveyBuilder/RemoveSurvey/:surveyId', function (req,res)
{
	SurveyBuilder.RemoveSurvey(req,res);
});
// send feedback link
router.post('/SurveyBuilder/FeedbackLink', function (req,res)
{
	MailMessage.FeedbackLink(req,res);
})
module.exports = router;
