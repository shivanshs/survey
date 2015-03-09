var User = require('../models/user.js');
var NodeRSA = require('node-rsa');
var encrypt = require('mongoose-encryption');
var CryptoJS = require("crypto-js");
var crypto = require('crypto');
var fs = require('fs');
var smtpTransport = require('nodemailer-smtp-transport');
var nodemailer = require('nodemailer');
var bcrypt=require('bcrypt-nodejs');
var formidable = require('formidable');

	/*This is random value generator function*/
	function randomValueBase64 (len) 
	{
	    return crypto.randomBytes(Math.ceil(len * 3 / 4))
	        .toString('base64')   // convert to base64 format
	        .slice(0, len)        // return required number of characters
	        .replace(/\+/g, '0')  // replace '+' with '0'
	        .replace(/\//g, '0'); // replace '/' with '0'
	}


// Sign up controller
var SignupCtrl = function(req,res)
{ 	 
	var User_Inst = new User;
	var pass = User_Inst.generateHash(req.param('password'));
	var record = new User({
					username:req.param('username'),
					email:req.param('email'),
					password:pass,
					first_name :req.param('username'),
					profile_image:'noimage.jpg',
					brand_image : 'noimage.jpg'
				});

	var value = randomValueBase64(12);

	record.save(function(err,data)
	{
		if(err)
		{
			console.log(err);
			if(err.code==11000)
			{
				res.json({'result':402});
			}
			else
			{
				res.json({'result':400});
			}
		}
		else
		{
			var secretString = JSON.stringify(data);
			var password = value;
			var encrypted = CryptoJS.TripleDES.encrypt(secretString, password);
			var Encrypt = encrypted.toString();

			res.json({'result':200,'data':Encrypt,"value":value});
		}
	})
}
exports.SignupCtrl = SignupCtrl;

// signin controllers
var SigninCtrl = function(req,res)
{
	User.findOne({email:req.param('email')},
		function (err,data)
		{
			if(err)
			{
				console.log(err);
				res.json({'result':400});
			}
			else if(data==null)
			{
				res.json({"result":402});
			}
			else
			{				
				if(data.validPassword(req.param('password')))
				{
					req.session.user = data;
					res.json({"result":200});
				}
				else
				{					
					res.json({'result':401});
				}
			}
		})
}
exports.SigninCtrl = SigninCtrl;

// user details
var UserDetails = function(req,res)
{
	var value = randomValueBase64(12);
	var User_Id = req.session.user._id;
	User.findOne({_id:User_Id},
		function(err,data)
		{
			if(err)
			{
				console.log(err);
				res.json({'result':400});
			}
			else
			{
				var secretString = JSON.stringify(data);
				var password = value;
				var encrypted = CryptoJS.TripleDES.encrypt(secretString, password);
				var Encrypt = encrypted.toString();
				res.json({'result':200,'data':Encrypt,"value":value});
			}
		})
}
exports.UserDetails = UserDetails;

// user loggedin or not
var UserLoggedIn = function(req,res)
{
	res.json({'result':req.session.user?true:false});
}
exports.UserLoggedIn = UserLoggedIn;

// user locked loggedin or not
var UserLockLoggedIn = function(req,res)
{
	if(req.session.user)
	{
		req.session.userlock = req.session.user._id;
		delete req.session.user;
		res.json({'result':200});
	}
	else if(req.session.userlock)
	{
		// res.json({'result':402});
		res.json({'result':req.session.userlock?true:false});
	}	
	else
	{
		res.json({'result':400});
	}
}
exports.UserLockLoggedIn = UserLockLoggedIn;

// user logout 
var UserLogout = function(req,res)
{
	delete req.session.user;
	delete req.session.userlock;
	res.json({"result":200});
}
exports.UserLogout = UserLogout;

// user forgot password
var UserForgotPassword = function(req,res)
{	
	var value = randomValueBase64(12);
	var User_Inst = new User();
	var newPassword = User_Inst.generateHash(value);

	User.findOne({email:req.param('email')},
		function(err,data)
		{
			if(err)
			{
				console.log(err);
				res.json({'result':400});
			}
			else if(data==null)
			{
				res.json({'result':401});
			}
			else
			{
				var transporter = 
					nodemailer.createTransport('SMTP',{
					    	service: 'Gmail',
					    		auth: {
					        		 user: 'amitbb2909@gmail.com',
					        		 pass: '@mitbb2909'
					    				}
							});

				var mailOptions = 
					{
					    from: "<amitbb2909@gmail.com>", // sender address
					    to: req.param('email'), // list of receivers
					    subject: 'New password', // Subject line
					    html: "<p>Hi "+data.username+",</p>\n\n<p>This is new password : "+value+" </p>\n\n<p>Thank You!</p>\n\n<p>Support Team</p>\n" // html body
					};

				transporter.sendMail(mailOptions, function(err, info)
				{
				    if(err)
					{
					    console.log(err);
					    res.json({'result':402});
					}
			    	else
				    {
				    	User.update({email:req.param('email')},
				    				{$set:{password:newPassword}},
				    		function(err,data)
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
				});
			}
		})
}
exports.UserForgotPassword = UserForgotPassword;

// check lock-screen password
var UserLockScreenPassword = function(req,res)
{
	var password =  req.param('password'); //enter password user
	var User_Id = req.session.userlock;

	User.findOne({_id:User_Id},
		function (err,data)
		{
			if(err)
			{
				console.log(err);
				res.json({'result':400});
			}
			else if(data==null)
			{
				res.json({'result':400});				
			}
			else
			{
				var data_pass = data.password; 				
				bcrypt.compare(password, data_pass, function(err, matches) 
				{
					if (err)
					{
				    	res.json({'result':400});
					}
					else if (matches)
					{						
						req.session.user = data;
						delete req.session.userlock;
				    	res.json({"result":200});
					}
				  	else
				  	{
				    	res.json({'result':401});
				  	}
				});
			}
		})	
}
exports.UserLockScreenPassword = UserLockScreenPassword;

// update User details
var UserUpdateDetails = function(req,res)
{
	var User_Id = req.session.user._id;
	User.update({_id:User_Id},
				{$set:{	username : req.param('username'),
						first_name : req.param('first_name'),
						last_name : req.param('last_name'),
						address : req.param('address'),
						phone : req.param('phone')}},
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
exports.UserUpdateDetails = UserUpdateDetails;

var UserUpdatePassword = function(req,res)
{
	var User_Password = req.session.user.password;
	var User_Current_Pass = req.param('cur_pass')

	bcrypt.compare(User_Current_Pass, User_Password, function(err, matches) 
				{
					if (err)
					{
				    	res.json({'result':400});
					}
					else if (matches)
					{		
						var User_Id = req.session.user._id;
						var newPassword = req.param('new_pass');
						var User_Inst = new User();
						var update_pass = User_Inst.generateHash(newPassword);
						User.update({_id:User_Id},
									{$set:{password:update_pass}},
									function (err,data)
									{
										if(err)
										{
											console.log(err);
											res.json({'result':400});
										}
										else
										{
				    						res.json({"result":200});
										}
									})		
					}
				  	else
				  	{
				    	res.json({'result':401});
				  	}
				});
}
exports.UserUpdatePassword = UserUpdatePassword;

var UserUploadProfilePic = function(req,res)
{
	var form = new formidable.IncomingForm();
	form.uploadDir = "./public/assets/images/";       //set upload directory
	form.keepExtensions = true;     //keep file extension

	var User_Id = req.session.user._id;

	form.parse(req, function (err, fields, files) 
	{
		var file = files.file.name; 
		var profile_pic = file;

		var file1 = files.files.name; 
		var brand_image = file1;

		fs.rename(files.file.path, "./public/assets/images/"+ profile_pic,function(err) {     
			if (err)
			{
				console.log(err);
				res.json({'result':404});
			}
			else 
			{
				User.update({_id:User_Id},
							{$set:{profile_image:profile_pic}})
				.exec(function (err)
				{
					if(err)
					{
						console.log(err);
						res.json({'result':404});
					}
				})								
			}  
		})

		fs.rename(files.files.path, "./public/assets/images/"+ brand_image,function(err) {     
			if (err)
			{
				console.log(err);
				res.json({'result':404});
			}
			else 
			{
				User.update({_id:User_Id},
							{$set:{brand_image:brand_image}})
				.exec(function (err)
				{
					if(err)
					{
						console.log(err);
						res.json({'result':404});
					}
				})								
			}  
		})
	});
	res.json({'result':200})
}
exports.UserUploadProfilePic = UserUploadProfilePic;




