const userModel = require("../models/user.js");
const crypto = require("crypto");

module.exports = {
	
	regist: (req, res) => {
		const hash = crypto.createHash('sha256');
		const {username, password} = req.body;
		hash.update( password );
		
		userModel.findUser( {username: username}, ( result ) => {
			if(result && result !== "error"){
				res.json({
					ret: true,
					data: {
						regist: false
					}
				})
			}else{
				userModel.regist(username, hash.digest('hex'), (err) => {
					res.json({
						ret: true,
						data: {
							regist: !err
						}
					})
				});
			}
		} );
	},
	
	login: (req, res) => {
		const hash = crypto.createHash('sha256');
		const {username, password} = req.body;
		hash.update( password );
		userModel.findUser({
			username: username,
			password: hash.digest('hex')
		}, (result) => {
			if( result && result!=="error" ){
				req.session.username = username;
			}
			res.json({
				ret: true,
				data: {
					login: ( result && result!=="error" ) ? true : false
				}
			})
		})
	}
	
}
