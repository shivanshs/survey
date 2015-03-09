var mongoose = require('mongoose');

var SurveySchema = mongoose.Schema({
	survey_name: { type : String,required: true},	
	survey_status: { type : Boolean},
	created_date : { type : Date},
	modified_date : { type : Date},
	category_id : { type: mongoose.Schema.Types.ObjectId, ref:'Category'},
	user_id: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
});

var Survey = mongoose.model('Survey',SurveySchema);

module.exports = Survey;