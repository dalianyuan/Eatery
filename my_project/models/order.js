var mongoose = require( "../utils/database.js" );

var Order = mongoose.model('order', {
  create_Date : { type: Date, default: Date.now }
});

module.exports = {
	order_list(params, cb){
		Order.find(params).then((result) => {
			cb(result);
		}).catch(() => {
			cb('error');
		})
	},
	order_list_page(page, size, cb){
		page = parseInt(page, 10);
		size = parseInt(size, 10);
		Order.find({}).limit(size).skip((page-1)*size).sort({create_Date: -1}).then((result) => {
			cb(result);
		}).catch(() => {
			cb('error');
		})
	},
	order_remove(id, cb){
		Order.findByIdAndRemove(id, (err)=> {
			cb(err);
		})
	},
	order_info(id, cb){
		Order.findById(id).then((result) => {
			cb(result);
		}).catch(() => {
			cb("error");
		})
	},
	order_update(id, params, cb){
		Order.findByIdAndUpdate(id, params).then((result) => {
			cb(result);
		}).catch(() => {
			cb("error");
		})
	},
	order_search(keywords, page, size, cb){
		page = parseInt(page, 10);
		size = parseInt(size, 10);
		Order.find({
			order_name: {
				$regex: keywords
			}
		}).limit(size).skip((page-1)*size).sort({create_Date: -1}).then((result) => {
			cb(result);
		}).catch(() => {
			cb('error');
		})
	}
}