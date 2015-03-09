var mongoose = require('mongoose');

var FieldOptions = mongoose.Schema({ 
          option_id:Number, //question option static id
          option_title: String, 
          option_value: String
});

module.exports = FieldOptions;


var questionSchema = mongoose.Schema({
  field_title: String, //question title
  field_type: String,  // question type
  field_required: Boolean, // question required
  field_options: [FieldOptions], // question options
  created_date: Date,
  modified_date : Date,
  quesfor_id:{ type: mongoose.Schema.Types.ObjectId, ref:'Subcategory'},
  survey_id:{ type: mongoose.Schema.Types.ObjectId, ref:'Survey'},
  category_id : { type: mongoose.Schema.Types.ObjectId, ref:'Category'},
  user_id : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  is_deleted : Boolean
});

var Question = mongoose.model('Question',questionSchema);

module.exports = Question;