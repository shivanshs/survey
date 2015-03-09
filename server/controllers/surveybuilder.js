var Category = require('../models/category.js');
var Subcategory = require('../models/subcategory.js');
var SurveyBuild = require('../models/survey.js');
var Question = require('../models/questions.js');
var Feedback = require('../models/feedback.js');
var NodeRSA = require('node-rsa');
var encrypt = require('mongoose-encryption');
var CryptoJS = require("crypto-js");
var crypto = require('crypto');
var fs = require('fs');
var smtpTransport = require('nodemailer-smtp-transport');
var nodemailer = require('nodemailer');
var bcrypt=require('bcrypt-nodejs');
var formidable = require('formidable');

var Enumerable = require('../models/linq.js');

/*This is random value generator function*/
function randomValueBase64 (len) 
{
    return crypto.randomBytes(Math.ceil(len * 3 / 4))
        .toString('base64')   // convert to base64 format
        .slice(0, len)        // return required number of characters
        .replace(/\+/g, '0')  // replace '+' with '0'
        .replace(/\//g, '0'); // replace '/' with '0'
}

// Add Category 
var AddCategory = function(req,res)
{
	var record = new Category({
					category_name : req.param('cat_name'),
					created_date : new Date(),
					modified_date : new Date(),
					status : true,
					user_id : req.session.user._id
				});

		record.save(function (err,data)
		{
			if(err)
			{
				console.log(err);				
				if(err.code==11000)
				{
					res.json({'result':401});
				}
				else
				{
					
					res.json({'result':400});
				}
			}
			else
			{
				var value = randomValueBase64(9);
				var secretString = JSON.stringify(data._id);
				var password = value;
				var encrypted = CryptoJS.TripleDES.encrypt(secretString, password);
				var Encrypt = encrypted.toString();
				res.json({'result':200,'data':Encrypt,"value":value});
			}
		});
}
exports.AddCategory = AddCategory;

// Find Category
var FindCategory = function (req,res)
{
	var value = randomValueBase64(10);

	var UserId = req.session.user._id;
	Category.find({user_id:UserId},
		function (err,data)
		{
			if(err)
			{
				console.log(err);
				res.json({'result':400});
			}
			else if(data)
			{
				var secretString = JSON.stringify(data);
				var password = value;
				var encrypted = CryptoJS.TripleDES.encrypt(secretString, password);
				var Encrypt = encrypted.toString();
				res.json({'result':200,'data':Encrypt,"value":value});
			}
			else
			{
				res.json({'result':404})
			}
		})
}
exports.FindCategory = FindCategory;

// Find only true status value
var FindByStatus = function (req,res)
{
	var value = randomValueBase64(10);

	var UserId = req.session.user._id;
	Category.find({user_id:UserId,status:true},'category_name',
		function (err,data)
		{
			if(err)
			{
				console.log(err);
				res.json({'result':400});
			}
			else if(data)
			{
				var secretString = JSON.stringify(data);
				var password = value;
				var encrypted = CryptoJS.TripleDES.encrypt(secretString, password);
				var Encrypt = encrypted.toString();
				res.json({'result':200,'data':Encrypt,"value":value});
			}
			else
			{
				res.json({'result':404})
			}
		})
}
exports.FindByStatus = FindByStatus;

// find one category by Id
var FindOneCatgeory = function(req,res)
{
	Category.findOne({_id:req.param('cateId')},'category_name',
		function (err,data)
		{
			if(err)
			{
				console.log(err);
				res.json({'result':400})
			}
			else
			{
				var value = randomValueBase64(8);
				var secretString = JSON.stringify(data);
				var password = value;
				var encrypted = CryptoJS.TripleDES.encrypt(secretString, password);
				var Encrypt = encrypted.toString();
				res.json({'result':200,'data':Encrypt,"value":value});
			}
		})
}
exports.FindOneCatgeory = FindOneCatgeory;

// Update category details
var UpdateCategory = function(req,res)
{
	Category.update({_id:req.param('cateId')},
					{$set:{category_name : req.param('category_name')}},
					function (err,data)
					{
						if(err)
						{
							console.log(err);
							res.json({'result':400});
						}
						else
						{
							res.json({'result':200});
						}
					})
}
exports.UpdateCategory = UpdateCategory;

// update status active and deactive
var UpdateStatus = function(req,res)
{
	Category.update({_id:req.param('id')},
					{$set:{status:req.param('catname')}},
					function (err,data)
					{
						if(err)
						{
							console.log(err);
							res.json({'result':400});
						}
						else
						{
							console.log(data);
							res.json({'result':200});
						}
					})
}
exports.UpdateStatus = UpdateStatus;

// Remove Category
var RemoveCategory= function(req,res)
{
	Category.remove({_id:req.param('id')},
	function (err,data)
	{
		if(err)
		{
			console.log(err);
			res.json({'result':400});
		}
		else
		{
			Feedback.remove({category_id : req.param('id')},
			function (err,data)
			{
				if(err)
				{
					console.log(err);
					res.json({'result':400});
				}
				else
				{
					Question.remove({ category_id : req.param('id')},
					function (err,data)
					{
						if(err)
						{
							console.log(err);
							res.json({'result':400});
						}
						else
						{
							Subcategory.remove({ category_id : req.param('id')},
							function (err,data)
							{
								if(err)
								{
									console.log(err);
									res.json({'result':400});
								}
								else
								{
									SurveyBuild.remove({ category_id : req.param('id')},
									function (err,data)
									{
										if(err)
										{
											console.log(err);
											res.json({'result':400});
										}
										else
										{
											res.json({'result':200});																
										}
									})													
								}
							})
						}
					})
				}
			})
		}
	})
}
exports.RemoveCategory = RemoveCategory;

// find all subcategory data
var FindAllSubCategories = function(req,res)
{
	Subcategory.find({category_id:req.param('cateId')},
		function (err,data)
		{
			if(err)
			{
				console.log(err);
				res.json({'result':400});
			}
			else
			{
				var value = randomValueBase64(8);
				var secretString = JSON.stringify(data);
				var password = value;
				var encrypted = CryptoJS.TripleDES.encrypt(secretString, password);
				var Encrypt = encrypted.toString();
				res.json({'result':200,'data':Encrypt,"value":value});
			}
		})
}
exports.FindAllSubCategories = FindAllSubCategories;

// add subcategory
var AddSubCategory = function(req,res)
{
	var record = new Subcategory({
			subcategory_name : req.param('subcate_name'),
			category_id : req.param('cateId'),
			created_date : new Date(),
			modified_date : new Date(),
			user_id : req.session.user._id,
			status : true
			});

	record.save(function (err,data)
	{
		if(err)
		{
			console.log(err);
			res.json({'result':400});
		}
		else
		{
			res.json({'result':200});
		}
	})
}
exports.AddSubCategory = AddSubCategory;

// remove subcategory
var RemoveSubCategories = function(req,res)
{
	Subcategory.remove({_id:req.param('subcateId')},
	function (err,data)
	{
		if(err)
		{
			console.log(err);
			res.json({'result':400});
		}
		else
		{
			Feedback.remove({ quesfor_id : req.param('subcateId')},
			function (err,data)
			{
				if(err)
				{
					console.log(err);
					res.json({'result':400});
				}
				else
				{
					Question.remove({ quesfor_id : req.param('subcateId')},
					function (err,data)
					{
						if(err)
						{
							console.log(err);
							res.json({'result':400});
						}
						else
						{
							res.json({'result':200});
						}
					})
				}
			})
			}
		})
}
exports.RemoveSubCategories = RemoveSubCategories;

// find one subcategory data
var FindOneSubCatgeory = function(req,res)
{
	Subcategory.findOne({_id:req.param('subcateId')},
		function (err,data)
		{
			if(err)
			{
				console.log(err);
				res.json({'result':400});
			}
			else
			{
				var value = randomValueBase64(10);
				var secretString = JSON.stringify(data);
				var password = value;
				var encrypted = CryptoJS.TripleDES.encrypt(secretString, password);
				var Encrypt = encrypted.toString();
				res.json({'result':200,'data':Encrypt,"value":value});
			}
		})
}
exports.FindOneSubCatgeory = FindOneSubCatgeory;

// update sub-category data
var UpdateSubCategory = function(req,res)
{
	Subcategory.update({_id:req.param('subcateId')},
						{$set:{	subcategory_name : req.param('subcategory_name'),
								modified_date : new Date()}},
		function (err,data)
		{
			if(err)
			{
				console.log(err);
				res.json({'result':400});
			}
			else
			{
				res.json({'result':200});
			}
		});
}
exports.UpdateSubCategory = UpdateSubCategory;

// update subcategory status
var SubCategoryStatusUpdate = function(req,res)
{
	Subcategory.update({_id:req.param('subcateId')},
						{$set:{	status : req.param('status')}},
		function (err,data)
		{
			if(err)
			{
				console.log(err);
				res.json({'result':400});
			}
			else
			{
				res.json({'result':200});
			}
		});
}
exports.SubCategoryStatusUpdate = SubCategoryStatusUpdate;

// Submit Survey Name and Category
var SubmitSurveyName = function(req,res)
{
	var record = new SurveyBuild(
				{
					survey_name : req.param('survey_name'),
					survey_status : true,
					created_date : new Date(),
					modified_date : new Date(),
					category_id : req.body.category._id,
					user_id : req.session.user._id
				});

		record.save(function (err,data)
		{
			if(err)
			{
				console.log(err);
				if(err.code==11000)
				{
					res.json({'result':401});
				}
				else
				{
					res.json({'result':400});
				}
			}
			else
			{
				var newData = { survey_id : data._id,category_id : data.category_id};
				var value = randomValueBase64(10);
				var secretString = JSON.stringify(newData);
				var password = value;
				var encrypted = CryptoJS.TripleDES.encrypt(secretString, password);
				var Encrypt = encrypted.toString();
				res.json({'result':200,'data':Encrypt,"value":value});
			}
		})
}
exports.SubmitSurveyName = SubmitSurveyName;

// Remove survey data
var RemoveSurvey = function(req,res)
{
	SurveyBuild.remove({ _id : req.param('surveyId')},
	function (err,data)
	{
		if(err)
		{
			console.log(err);
			res.json({'result':400});
		}
		else
		{
			Feedback.remove({survey_id : req.param('surveyId')},
			function (err,data)
			{
				if(err)
				{
					console.log(err);
					res.json({'result':400});
				}
				else
				{
					Question.remove({ survey_id : req.param('surveyId')},
					function (err,data)
					{
						if(err)
						{
							console.log(err);
							res.json({'result':400});
						}
						else
						{
							res.json({'result':200});
						}
					})
				}
			})																
		}
	})	
}
exports.RemoveSurvey = RemoveSurvey;

//find all survey
var FindAllSurvey = function(req,res)
{
	SurveyBuild.find({}).populate('category_id')
	.exec(function (err,data)
		{
			if(err)
			{
				console.log(err);
				res.json({'result':400});
			}
			else if(data)
			{
				var value = randomValueBase64(15);
				var secretString = JSON.stringify(data);
				var password = value;
				var encrypted = CryptoJS.TripleDES.encrypt(secretString, password);
				var Encrypt = encrypted.toString();
				res.json({'result':200,'data':Encrypt,"value":value});
			}
			else
			{
				res.json({'result':404});
			}
		})
} 
exports.FindAllSurvey = FindAllSurvey;
// Add New Question
var AddNewQuestions = function(req,res)
{
	var record = new Question({
		field_title : req.param('field_title'),
		field_type : req.param('field_type'),
		field_required : req.param('field_type'),
		created_date : new Date(),
		modified_date : new Date(),
		survey_id : req.param('surveyId'),
		category_id : req.param('catId'),
		user_id : req.session.user._id,
		is_deleted : false
	});

	record.save(function (err,data)
	{
		if(err)
		{
			console.log(err);
			res.json({'result':400});
		}
		else
		{
			res.json({'result':200});
		}
	})

}
exports.AddNewQuestions = AddNewQuestions;

//Find Category wise questions
var FindCategoryQuestion = function(req,res)
{
	Question.find({	survey_id : req.param('surveyId'),
				  	category_id : req.param('cateId'),
					is_deleted : false}).sort({_id:1})
	.exec(function (err,data)
	{
		if(err)
		{
			console.log(err);
			res.json({'result':400});
		}
		else
		{
			var value = randomValueBase64(14);
			var secretString = JSON.stringify(data);
			var password = value;
			var encrypted = CryptoJS.TripleDES.encrypt(secretString, password);
			var QuestionsEncrypt = encrypted.toString();

			Subcategory.find({category_id:req.param('cateId')},'subcategory_name',
				function (err,subcateData)
				{
					if(err)
					{
						console.log(err);
						res.json({'result':400});
					}
					else
					{
						var secretString = JSON.stringify(subcateData);
						var password = value;
						var encrypted = CryptoJS.TripleDES.encrypt(secretString, password);
						var CategoryEncrypt = encrypted.toString();
						res.json({'result':200,'questdata':QuestionsEncrypt,'catedata':CategoryEncrypt,"value":value});
					}
				})
		}
	})
} 
exports.FindCategoryQuestion = FindCategoryQuestion;

// find survey name and category name
var FindOneSurveyDetail = function(req,res)
{
	SurveyBuild.findOne({_id:req.param('surveyId')},'survey_name category_id').populate('category_id')
	.exec(function (err,data)
	{
		if(err)
		{
			console.log(err);
			res.json({'result':400});
		}
		else
		{
			var value = randomValueBase64(10);
			var secretString = JSON.stringify(data);
			var password = value;
			var encrypted = CryptoJS.TripleDES.encrypt(secretString, password);
			var Encrypt = encrypted.toString();
			res.json({'result':200,'data':Encrypt,"value":value});
		}
	})
}
exports.FindOneSurveyDetail = FindOneSurveyDetail;

// update questions
var UpdateQuestion = function(req,res)
{
	Question.update({_id:req.param('questId')},
					{$set:{	field_title : req.param('field_title'),
							field_required : req.param('field_required'),
							field_options : req.body.field_options,
							quesfor_id : req.param('quesfor_id'),
							modified_date : new Date(),
							is_deleted :false
						 }})
		.exec(function (err,data)
		{
			if(err)
			{
				console.log(err);
				res.json({'result':400});
			}
			else
			{
				res.json({'result':200});
			}
		})
}
exports.UpdateQuestion = UpdateQuestion;

// Remove questions
var RemoveQuestion = function(req,res)
{
	Question.update({_id:req.param('questId')},
					{ $set: { is_deleted : true }})
	.exec(function (err,data)
		{
			if(err)
			{
				console.log(err);
				res.json({'result':400});
			}
			else
			{
				res.json({'result':200});
			}
		})
}
exports.RemoveQuestion = RemoveQuestion;

// submit feedback survey
var FeedbackSubmitSurvey = function(req,res)
{
	// decrypt the data
	var key = req.body[0].data;
	var Feedbackdata = req.body[0].feedbackdata;
	var decrypted = CryptoJS.TripleDES.decrypt(Feedbackdata,key);
    var FeedbackDetails = decrypted.toString(CryptoJS.enc.Utf8);
    var FeedbackData = JSON.parse(FeedbackDetails);

    console.log(JSON.stringify(FeedbackData));
    // return false;
    // date conversion in date,month and year
	var d = new Date();
	var date = d.getDate();
	var month = d.getMonth();
	var year = d.getFullYear();

	// Total Minutes
	var total_min = 0;
  
  	// Find Length value
  	var val = FeedbackData.length;

    for (var i = 0 ; i < val; i++) 
    {
			// This is checkbox collections data
			if(FeedbackData[i].field_type=='checkbox')
			{
				var PatientRes = FeedbackData[i].field_options;
            	var record = new Feedback(
                		{
		                	user_id : req.session.user._id,
		                    survey_id:FeedbackData[i].survey_id,
		                    question_id : FeedbackData[i]._id,
		                    category_id : FeedbackData[i].category_id,
		                    quesfor_id : FeedbackData[i].quesfor_id,
		                    field_type : FeedbackData[i].field_type,
		                    created : d,
		                    date:date,
		                    month:month +1,
		                    year:year
                    	});

             	record.save(function (err,data)
              	{
                    if(err)
                    {
                      console.log(err);
                    }
                    else
                    {
                    	for (var j = 0; j <  PatientRes.length;j++) 
                    	{
                    		if(PatientRes[j].field_value)
                    		{
                    			var record = { option_title : PatientRes[j].option_title };
                    			data.patient_checkboxresponse.push(record)
                    			data.save( function (err)
                    			{
                    				if(err)
                    				{
                    					console.log(err)
                    				}
                    			})
                    		}
                    	};
                      console.log('success feedback');
                    }
              	})
          	}
            else if(FeedbackData[i].field_type=='radio' || FeedbackData[i].field_type=='dropdown')
        	{
        		var PatientRes = parseInt(FeedbackData[i].field_value) - 1;
        		var record = new Feedback(
                		{
		                	user_id : req.session.user._id,
		                    survey_id:FeedbackData[i].survey_id,
		                    question_id : FeedbackData[i]._id,
		                    category_id : FeedbackData[i].category_id,
		                    quesfor_id : FeedbackData[i].quesfor_id,
		                    field_type : FeedbackData[i].field_type,
		                    patient_response : FeedbackData[i].field_options[PatientRes].option_title,
		                    created : d,
		                    date:date,
		                    month:month +1,
		                    year:year
                    	});

             	record.save(function(err,data)
              	{
                    if(err)
                    {
                      console.log(err);
                    }
                    else
                    {
                      console.log('success feedback');
                    }
              	});
          	}
			else
			{
              	var record = new Feedback(
              			{
              				user_id : req.session.user._id,
							survey_id:FeedbackData[i].survey_id,
							question_id : FeedbackData[i]._id,
							category_id : FeedbackData[i].category_id,
							patient_response : FeedbackData[i].field_value,
							quesfor_id : FeedbackData[i].quesfor_id,
							field_type : FeedbackData[i].field_type,
							created : d,
							date:date,
							month:month +1,
							year:year
                  		});

				record.save(function(err,data)
				{
					if(err)
					{
						console.log(err);
					}
					else
					{
						console.log('success feedback');
					}
				})
          	}
    }
    res.json({'result':200});
}
exports.FeedbackSubmitSurvey = FeedbackSubmitSurvey;


// feedback link survey data
var FeedbackSubmitLinkSurvey = function(req,res)
{	
	// decrypt the data
	var key = req.body[0].data;
	var Feedbackdata = req.body[0].feedbackdata;
	var decrypted = CryptoJS.TripleDES.decrypt(Feedbackdata,key);
    var FeedbackDetails = decrypted.toString(CryptoJS.enc.Utf8);
    var FeedbackData = JSON.parse(FeedbackDetails);

    console.log(JSON.stringify(FeedbackData));
    // date conversion in date,month and year
	var d = new Date();
	var date = d.getDate();
	var month = d.getMonth();
	var year = d.getFullYear();

	// Total Minutes
	var total_min = 0;
  
  	// Find Length value
  	var val = FeedbackData.length;

    for (var i = 0 ; i < val; i++) 
    {
			// This is checkbox collections data
			if(FeedbackData[i].field_type=='checkbox')
			{
				var PatientRes = FeedbackData[i].field_options;
            	var record = new Feedback(
                		{
		                	user_id : FeedbackData[i].user_id,
		                    survey_id:FeedbackData[i].survey_id,
		                    question_id : FeedbackData[i]._id,
		                    category_id : FeedbackData[i].category_id,
		                    quesfor_id : FeedbackData[i].quesfor_id,
		                    field_type : FeedbackData[i].field_type,
		                    created : d,
		                    date:date,
		                    month:month +1,
		                    year:year
                    	});

             	record.save(function (err,data)
              	{
                    if(err)
                    {
                      console.log(err);
                    }
                    else
                    {
                    	for (var j = 0; j <  PatientRes.length;j++) 
                    	{
                    		if(PatientRes[j].field_value)
                    		{
                    			var record = { option_title : PatientRes[j].option_title };
                    			data.patient_checkboxresponse.push(record)
                    			data.save( function (err)
                    			{
                    				if(err)
                    				{
                    					console.log(err)
                    				}
                    			})
                    		}
                    	};
                      console.log('success feedback');
                    }
              	})
          	}
            else if(FeedbackData[i].field_type=='radio' || FeedbackData[i].field_type=='dropdown')
        	{
        		var PatientRes = parseInt(FeedbackData[i].field_value) - 1;
        		var record = new Feedback(
                		{
		                	user_id : FeedbackData[i].user_id,
		                    survey_id:FeedbackData[i].survey_id,
		                    question_id : FeedbackData[i]._id,
		                    category_id : FeedbackData[i].category_id,
		                    quesfor_id : FeedbackData[i].quesfor_id,
		                    field_type : FeedbackData[i].field_type,
		                    patient_response : FeedbackData[i].field_options[PatientRes].option_title,
		                    created : d,
		                    date:date,
		                    month:month +1,
		                    year:year
                    	});

             	record.save(function(err,data)
              	{
                    if(err)
                    {
                      console.log(err);
                    }
                    else
                    {
                      console.log('success feedback');
                    }
              	});
          	}
			else
			{
              	var record = new Feedback(
              			{
              				user_id : FeedbackData[i].user_id,
							survey_id:FeedbackData[i].survey_id,
							question_id : FeedbackData[i]._id,
							category_id : FeedbackData[i].category_id,
							patient_response : FeedbackData[i].field_value,
							quesfor_id : FeedbackData[i].quesfor_id,
							field_type : FeedbackData[i].field_type,
							created : d,
							date:date,
							month:month +1,
							year:year
                  		});

				record.save(function(err,data)
				{
					if(err)
					{
						console.log(err);
					}
					else
					{
						console.log('success feedback');
					}
				})
          	}
    }
    res.json({'result':200});
}
exports.FeedbackSubmitLinkSurvey = FeedbackSubmitLinkSurvey;

// find category feedback data
var FeedbackDataByCategoryID  = function(req,res)
{
	var CategoryId = req.param('cateId');

	// text field and text area 
	var TextFieldNAreaData = [];
	var TextGrpData;
	var TextTotalArray = [];
	var ResultTextdata = [];
	var TextFinalTotalArray = [];

	// radio and dropdown button
	var RadioDropButtonData = [];
	var RadioDropGrpData;
	var ResultRDdata = [];
	var RadioDropDownTotalArray = [];
	var RadioDropCheckFinalTotalArray = [];

	// text area
	var StarRateData = [];
	var StarGrpData;
	
	// checkbox 
	var CheckboxData = [];
	var CheckboxGrpData;
	var ResultCheckdata = [];
	var CheckBoxTotalArray = [];
	var CheckboxFinalTotalArray = [];

	// time
	var TimeData = [];
	var TimeGrpData;


	Feedback.find({category_id:CategoryId}).populate('quesfor_id')
	.exec(function (err,FeedbackAllData)
		{
			if(err)
			{
				console.log(err);
				res.json({"result":200});
			}
			else
			{
				// console.log(JSON.stringify(FeedbackAllData))
				// This is all feedback data
				for (var i = 0; i < FeedbackAllData.length; i++) 
				{
					// textfield and textarea data
					if(FeedbackAllData[i].field_type =='textfield' || FeedbackAllData[i].field_type=='textarea')
					{
						if(FeedbackAllData[i].patient_response && FeedbackAllData[i].quesfor_id && FeedbackAllData[i].quesfor_id.subcategory_name)
						{
							var record = { 	SubCategoryName : FeedbackAllData[i].quesfor_id.subcategory_name+"_"+FeedbackAllData[i].patient_response };
								TextFieldNAreaData.push(record);
						}
					}
					// radio and drop down data
					else if(FeedbackAllData[i].field_type=='radio' || FeedbackAllData[i].field_type=='dropdown')
					{
						if(FeedbackAllData[i].patient_response && FeedbackAllData[i].quesfor_id && FeedbackAllData[i].quesfor_id.subcategory_name)
						{
							if(FeedbackAllData[i].patient_response)
							{
								var record = {
												SubCategoryName : FeedbackAllData[i].quesfor_id.subcategory_name+"_"+FeedbackAllData[i].patient_response,
												Count : 1
											};
								RadioDropButtonData.push(record);
							}
						}
					}
					// time data
					else if(FeedbackAllData[i].field_type=='time')
					{
						if(FeedbackAllData[i].patient_response && FeedbackAllData[i].quesfor_id && FeedbackAllData[i].quesfor_id.subcategory_name)
						{
							var record = 
								{
									SubCategoryName : FeedbackAllData[i].quesfor_id.subcategory_name,
									TimeValue : FeedbackAllData[i].patient_response
								}
							TimeData.push(record);
						}
					}
					// check box data
					else if(FeedbackAllData[i].field_type=='checkbox')
					{
						if(FeedbackAllData[i].patient_checkboxresponse && FeedbackAllData[i].quesfor_id && FeedbackAllData[i].quesfor_id.subcategory_name)
						{
							var PatientCheckbox = FeedbackAllData[i].patient_checkboxresponse;

							for (var k = 0; k < PatientCheckbox.length; k++) 
							{
								var record = 
								{
									SubCategoryName : FeedbackAllData[i].quesfor_id.subcategory_name+"_"+PatientCheckbox[k].option_title,
									Count : 1
								}

								CheckboxData.push(record);
							};							
						}

					}
					// star rating data
					else if(FeedbackAllData[i].field_type=='star')
					{
						if(FeedbackAllData[i].patient_response && FeedbackAllData[i].quesfor_id && FeedbackAllData[i].quesfor_id.subcategory_name)
						{
							var record = 
								{
									SubCategoryName : FeedbackAllData[i].quesfor_id.subcategory_name,
									RatingValue : FeedbackAllData[i].patient_response
								}
							StarRateData.push(record);
						}
					}
				};

				// ############# Textfield and TextArea Data ##############################
	            console.log("============== Textfield and TextArea Data =====================" )
				
				var linq = Enumerable.From(TextFieldNAreaData);
                TextGrpData =	linq.GroupBy(function(x){return x.SubCategoryName;})
                    				.Select(function(x){return { 	SubCategoryName:x.Key(),
                    												Count : x.Sum(function(z) { return 1|0}) };})
                   	 				.ToArray();


                // this is radio and drop group by data
				for (var i = 0; i < TextGrpData.length; i++) 
				{
					var spiltData = TextGrpData[i].SubCategoryName.split('_');
					var spiltData0 = spiltData[0];
					var spiltData1 = spiltData[1];
					var record = 
						{
							SubCateName : spiltData0,
							TextTitle : spiltData1
						}
					ResultTextdata.push(record);
				};
				
				var ForTextLoopCount = ResultTextdata.length;
				var CountText = 1;
				// find subcategorywise data
	            for (var i = 0; i < ForTextLoopCount; i++) 
	            {
	            	if(CountText<=ForTextLoopCount)
	            	{
		            	if(ResultTextdata[i].SubCateName)
		            	{
		            		TextTotalArray = [];
		            		for (var j = 0; j < ResultTextdata.length; j++) 
		                	{	                		
		                		if(ResultTextdata[i].SubCateName==ResultTextdata[j].SubCateName)
		            			{
		            				var record = {
					            					TextTitleF : ResultTextdata[j].TextTitle
		            							};
		            				TextTotalArray.push(record);
		            				CountText++;
		            			}
		                	};

		                	// final radio and drop down data
		                	TextFinalTotalArray.push(
		                		{	SubcatNameF : ResultTextdata[i].SubCateName,
		                			finalArray:TextTotalArray 
		                		});
		                }
	            	}
	            }
	            console.log(JSON.stringify(TextFinalTotalArray));

	            console.log("Textfield close =================================")
	            // ================================= End Textfield and Textarea Data
				// -------------------------------- Texfield and TextArea -----------------------------------------------


				//  ################ Radio and Drop-Down Data ##########################
				console.log("======= Radio and DropDown Data ==============");
				var linq = Enumerable.From(RadioDropButtonData);
                RadioDropGrpData =	linq.GroupBy(function(x){return x.SubCategoryName;})
                    				.Select(function(x){return { 	SubCategoryName:x.Key(), 
                    												CountValue: x.Sum(function(y){return y.Count|0;}) };})
                   	 				.ToArray();

                // this is radio and drop group by data
				for (var i = 0; i < RadioDropGrpData.length; i++) 
				{
					var spiltData = RadioDropGrpData[i].SubCategoryName.split('_');
					var spiltData0 = spiltData[0];
					var spiltData1 = spiltData[1];
					var record = 
						{
							SubCateName : spiltData0,
							Title : spiltData1,
							Count : RadioDropGrpData[i].CountValue
						}
					ResultRDdata.push(record);
				};
				
				var ForLoopCount = ResultRDdata.length;
				var CountRDBtn = 1;

				// find subcategorywise data
	            for (var i = 0; i < ForLoopCount; i++) 
	            {
	            	if(CountRDBtn<=ForLoopCount)
	            	{
		            	if(ResultRDdata[i].SubCateName)
		            	{
		            		RadioDropDownTotalArray = [];
		            		for (var j = 0; j < ResultRDdata.length; j++) 
		                	{	                		
		                		if(ResultRDdata[i].SubCateName==ResultRDdata[j].SubCateName)
		            			{
		            				var record = {
					            					TitleF : ResultRDdata[j].Title,
					            					CountF : ResultRDdata[j].Count
		            							};
		            				RadioDropDownTotalArray.push(record);
		            				CountRDBtn++;
		            			}
		                	};

		                	// final radio and drop down data
		                	RadioDropCheckFinalTotalArray.push(
		                		{	SubcatNameF : ResultRDdata[i].SubCateName,
		                			finalArray:RadioDropDownTotalArray 
		                		});
		                }	                	
	            	}
	            }
	            console.log(JSON.stringify(RadioDropCheckFinalTotalArray));
	            // End Radio and Drop-Down Data ======================================
				// -------------------------------- Radio and Checkbox Data -----------------------------------------------


	            // ################ CheckBox Data ###########################

	            console.log("========================= CheckboxData Box ======================")
	            var linq = Enumerable.From(CheckboxData);
                CheckboxGrpData =	linq.GroupBy(function(x){return x.SubCategoryName;})
                    				.Select(function(x){return { 	SubCategoryName:x.Key(), 
                    												CountValue: x.Sum(function(y){return y.Count|0;}) };})
                   	 				.ToArray();

                // this is radio and drop group by data
				for (var i = 0; i < CheckboxGrpData.length; i++) 
				{
					var spiltData = CheckboxGrpData[i].SubCategoryName.split('_');
					var spiltData0 = spiltData[0];
					var spiltData1 = spiltData[1];
					var record = 
						{
							SubCateName : spiltData0,
							Title : spiltData1,
							Count : CheckboxGrpData[i].CountValue
						}
					ResultCheckdata.push(record);
				};
				
				var CheckForLoopCount = ResultCheckdata.length;
				var CountCheck = 1;
				// find subcategorywise data
	            for (var i = 0; i < CheckForLoopCount; i++) 
	            {
	            	if(CountCheck<=CheckForLoopCount)
	            	{
		            	if(ResultCheckdata[i].SubCateName)
		            	{
		            		CheckBoxTotalArray = [];
		            		for (var j = 0; j < ResultCheckdata.length; j++) 
		                	{	                		
		                		if(ResultCheckdata[i].SubCateName==ResultCheckdata[j].SubCateName)
		            			{
		            				var record = {
					            					TitleF : ResultCheckdata[j].Title,
					            					CountF : ResultCheckdata[j].Count
		            							};
		            				CheckBoxTotalArray.push(record);
		            				CountCheck++;
		            			}
		                	};
		                	RadioDropCheckFinalTotalArray.push(
		                		{	SubcatNameF : ResultCheckdata[i].SubCateName,
		                			finalArray:CheckBoxTotalArray 
		                		});	                	
		            	}
		            }
	            }
	            console.log(JSON.stringify(RadioDropCheckFinalTotalArray));
				// --------------------------------  Checkbox Data -----------------------------------------------
	            // ================================= End Radio and Checkbox Data

	             // ############# Time all Data ##############################
	            console.log("============== Time Data =====================" )
				
				var linq = Enumerable.From(TimeData);
                TimeGrpData =	linq.GroupBy(function(x){return x.SubCategoryName;})
                    				.Select(function(x){return { 	SubCategoryName:x.Key(), 
                    												TimeValue: x.Sum(function(y){return y.TimeValue|0;}),
                    												Count : x.Sum(function(z) { return 1|0}) };})
                   	 				.ToArray();
				console.log(JSON.stringify(TimeGrpData));
				// -------------------------------- Time Data -----------------------------------------------
	            // ================================= End Total Time Data


	            // ############# Star Rating Data ##############################
	            console.log(" ============== Rating Data ======================")				
				var linq = Enumerable.From(StarRateData);
                StarGrpData =	linq.GroupBy(function(x){return x.SubCategoryName;})
                    				.Select(function(x){return { 	SubCategoryName:x.Key(), 
                    												RatingValue: x.Sum(function(y){return y.RatingValue|0;}),
                    												Count : x.Sum(function(z) { return 1|0}) };})
                   	 				.ToArray();
				console.log(JSON.stringify(StarGrpData));
				// -------------------------------- Rating Data -----------------------------------------------
	            // ============= End Star Rating Data

	            // Final Record send to client side

	            var FinalRecord =
		            {
		            	TextFieldAreaData : TextFinalTotalArray,
		            	RadioDropCheckData : RadioDropCheckFinalTotalArray,
						TimeData : TimeGrpData,
						StarData : StarGrpData
		            };

		        var value = randomValueBase64(15);
				var secretString = JSON.stringify(FinalRecord);
				var password = value;
				var encrypted = CryptoJS.TripleDES.encrypt(secretString, password);
				var Encrypt = encrypted.toString();
				res.json({'result':200,'data':Encrypt,"value":value});

			}
		})
}
exports.FeedbackDataByCategoryID = FeedbackDataByCategoryID;

