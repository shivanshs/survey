var smtpTransport = require('nodemailer-smtp-transport');
var nodemailer = require('nodemailer');

var FeedbackLink = function(req,res)
{
	var transporter = nodemailer.createTransport('SMTP',
						{
				    		service: 'Gmail',
				    		auth: {
				        		 user: 'amitbb2909@gmail.com',
				        		 pass: '@mitbb2909'
				    				}
						});

	var mailOptions = {
	    from: '<amitbb2909@gmail.com>', // sender address
	    to: [req.param('email')], // list of receivers
	    subject: 'Feedback Survey Link', // Subject line
	    html: '<p><h2>Survey Builder Feedback Link </h2></p>\n\n<hr />\n<p><strong>Thanks for using Survey builder.</strong></p>\n\n<hr />\n<p>Please fill the feedback form.</p>\n\n<p>Please go through below link to get started with feedback.</p>\n\n<p><a href="'+req.param("feedbacklink")+'">Click here</a></p>\n\n<hr />\n<p><strong> Thanks,</strong></p>\n\n<p><strong>Survey Builder Team</strong></p>\n' // html body
	};

	transporter.sendMail(mailOptions, function(err, info)
	{
	    if(err)
		{
		    console.log(err);
		    res.json({'result':400});
		}
    	else
	    {
			console.log('Message sent');
			res.json({'result':200});	
		}
	});
}
exports.FeedbackLink = FeedbackLink;