var mongoose = require('mongoose');

var SubCategorySchema = mongoose.Schema({
	subcategory_name : {type:String ,required:true},
	created_date: { type: Date },
	modified_date : { type: Date },
	status : { type : Boolean },
	category_id : { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
	user_id : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Subcategory',SubCategorySchema);