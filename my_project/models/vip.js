var mongoose = require( "../utils/database.js" );
   
/*创建文档定义*/
var Vip = mongoose.model('vip', {
	vip_num    : String,
	vip_name   : String,
	vip_email  : String,
  vip_ok     : String,
  vip_money  : String,
  vip_grade  : String,
  create_Date: { type: Date, default: Date.now }
});

module.exports = {
	vip_add( params, cb ){
		var vip = new Vip({
			vip_num: params.vip_num,
			vip_name: params.vip_name,
			vip_email: params.vip_email,
			vip_ok: params.vip_ok,
			vip_money: params.vip_money,
			vip_grade: params.vip_grade
		});
		vip.save(function(err){
			cb(err);
		})
	},
	findVip(findParams, cb){
		Vip.findOne(findParams).then((result)=>{
			cb( result );
		}).catch(()=>{
			cb("error");
		})
	},
	vip_list(params, cb){
		Vip.find(params).then((result) => {
			cb(result);
		}).catch(() => {
			cb('error');
		})
	},
	vip_list_page(page, size, cb){
		page = parseInt(page, 10);
		size = parseInt(size, 10);
		Vip.find({}).limit(size).skip((page-1)*size).sort({create_Date: -1}).then((result) => {
			cb(result);
		}).catch(() => {
			cb('error');
		})
	},
	vip_remove(id, cb){
		Vip.findByIdAndRemove(id, (err)=> {
			cb(err);
		})
	},
	vip_info(id, cb){
		Vip.findById(id).then((result) => {
			cb(result);
		}).catch(() => {
			cb("error");
		})
	},
	vip_update(id, params, cb){
		Vip.findByIdAndUpdate(id, params).then((result) => {
			cb(result);
		}).catch(() => {
			cb("error");
		})
	},
	vip_search(keywords, page, size, cb){
		page = parseInt(page, 10);
		size = parseInt(size, 10);
		Vip.find({
			vip_name: {
				$regex: keywords
			}
		}).limit(size).skip((page-1)*size).sort({create_Date: -1}).then((result) => {
			cb(result);
		}).catch(() => {
			cb('error');
		})
	}
}