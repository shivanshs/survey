var mongoose = require('mongoose');

var CheckBoxResponse = mongoose.Schema(
	{
		option_title : { type:String }
	});

var surveyFeedbackSchema = mongoose.Schema({
	survey_id :{ type : mongoose.Schema.Types.ObjectId, ref:'Survey' },
	question_id :{ type : mongoose.Schema.Types.ObjectId, ref:'Question' },
	category_id: {type: mongoose.Schema.Types.ObjectId, ref:'Category'},
	quesfor_id : {type:mongoose.Schema.Types.ObjectId,ref:'Subcategory'},
	user_id : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	field_type : { type : String},
	patient_response: {type:String},
	patient_checkboxresponse: [CheckBoxResponse],
	created:{type: Date},
	date:{type: Number},
    month:{type: Number},
    year:{type: Number}
});

var Feedback = mongoose.model('Feedback',surveyFeedbackSchema);

module.exports = Feedback;