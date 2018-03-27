var mongoose = require( "../utils/database.js" );
 
/*创建文档定义*/
var User = mongoose.model('user', {
    username    : String,
    password    : String,
    regist_Date : { type: Date, default: Date.now }
});

module.exports = {
	regist( username, password, cb ){
		var user = new User({
			username: username,
			password: password
		});
		user.save(function(err){
			cb(err);
		})
	},
	findUser( findParams, cb){
		User.findOne(findParams).then((result)=>{
			cb( result );
		}).catch(()=>{
			cb("error");
		})
	}
}
