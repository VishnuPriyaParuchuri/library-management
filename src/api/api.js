const express = require('express');

let app = express();
const config = require ('../../config');
const bodyParser = require("body-parser");
const formData = require('express-form-data');
const Authentication = require('../service/authentication');
const {userType}= require('../utils/constants');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));


let uploadPath = config.upload_files;
app.use(express.static(uploadPath.substring(0, uploadPath.length - 1)));



let options = {
	uploadDir: uploadPath
  };

app.use(formData.parse(options));
// const apiDocument = require('../../api_docs');
// apiDocument(app);


let userService = require('../service/user');
let bookDetailsService = require('../service/bookDetails');


app.get('/api/user/details', async(req, res) =>
 {
   return res.json(await userService.userDetails())
});

app.post('/api/create/user', async(req,res) =>
{
   return res.json(await userService.createUser(req.body));
});

app.post('/api/send/email', async(req, res) =>
{
   return res.json(await userService.sendEmail(req.body));
})

app.post('/api/verify/otp', async(req, res) =>
{
   return res.json(await userService.verifyOTP(req.body));
})

let myInit = async (req, res, next) => 
{
	try
	{

		let lmRole = req.headers['role'];
		let lmToken = req.headers['lmtoken'];

		if (!lmToken)
		{
			return res.json({
				status: 0,
				message: "Authorization is required."
			});
		}
		else if (lmToken)
		{
			await Authentication.validateToken(lmToken, async function (tokenResult) 
			{
				if (tokenResult.status == 1)
				{
					let tokenUser = tokenResult.user;
					
					
					let newToken = await Authentication.generateToken(tokenUser);

					if (newToken)
					{
						res.append('newtoken', newToken);

						req.tokens = {
							...req.tokens,
							lmtoken: newToken,
							role: lmRole
						};
					}

					req.lmUser = tokenUser;
					req.authId = tokenUser.uuid || null;

					let userRole = req.lmUser.role;

					if(userRole.search(lmRole) < 0)
					{
						return res.json({
							status: 0,
							message: "Authorization failed: Do not have access for this API"
						});
					}

					next();
				}
				else if (tokenResult.status == 0)
				{
					return res.json(tokenResult);
				}
			});
		}
	}
	catch (error)
	{
	
		return res.json({
			status: 0,
			message: error.message,
		});
	}
};

app.use(myInit);

app.post('/api/update/user', Authentication.authorize([userType.STAFF]), async(req,res) =>{
   return res.json(await userService.updateUser(req.body, req.lmUser))
});

app.post('/api/delete/user', Authentication.authorize([userType.STAFF]), async(req, res) =>
{
  return res.json(await userService.deleteUser(req.body, req.lmUser))
});

app.post('/api/book/details', Authentication.authorize([userType.STAFF]), async(req, res) =>
{
   return res.json(await bookDetailsService.bookDetails())
});



module.exports = app;