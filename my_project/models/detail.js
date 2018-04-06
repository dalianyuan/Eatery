var mongoose = require( "../utils/database.js" );
   
/*创建文档定义*/
var Eatery = mongoose.model('eatery', {
    eatery_name    : String,
    eatery_intro   : String,
    eatery_keywords: String,
    eatery_address : String,
    eatery_tel 		 : String,
    eatery_logo    : String,
    create_Date    : { type: Date, default: Date.now }
});

module.exports = {
	eatery_add( params, cb ){
		console.log(params)
		var eatery = new Eatery({
			eatery_name: params.eatery_name,
			eatery_intro: params.eatery_intro,
			eatery_keywords: params.eatery_keywords,
			eatery_address: params.eatery_address,
			eatery_tel: params.eatery_tel,
			eatery_logo: params.eatery_logo
		});
		eatery.save(function(err){
			cb(err);
		})
	},
	eatery_detail(params, cb){
		Eatery.find(params).then((result) => {
			cb(result[result.length-1]);
		}).catch(() => {
			cb('error');
		})
	},
	eatery_info(id, cb){
		Eatery.findById(id).then((result) => {
			cb(result);
		}).catch(() => {
			cb("error");
		})
	},
	eatery_update(id, params, cb){
		Eatery.findByIdAndUpdate(id, params).then((result) => {
			cb(result);
		}).catch(() => {
			cb("error");
		})
	}
}