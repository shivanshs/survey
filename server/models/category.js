var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
	category_name:{ type:String,required:true },	
	created_date: { type: Date },
	modified_date : { type: Date },
	status : { type : Boolean },
	user_id :{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Category',CategorySchema);
