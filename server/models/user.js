var mongoose = require('mongoose');
var bcrypt=require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
	username:{ type:String },
	first_name:{ type:String },
	last_name:{ type:String },
	email:{ type:String,unique: true,required:true },
	password:{ type:String ,required:true},
	address: { type:String },
	phone: { type: String },
	profile_image : {type:String},
	brand_image : {type:String},	
	created_date: { type: Date },
	status: { type: Boolean }
});

UserSchema.methods.generateHash=function(password){
	return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
}

UserSchema.methods.validPassword=function(password){
	return bcrypt.compareSync(password,this.password);
};

module.exports = mongoose.model('User',UserSchema);