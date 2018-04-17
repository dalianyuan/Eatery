var mongoose = require( "../utils/database.js" );

var Comment = mongoose.model('comment', {
  create_Date : { type: Date, default: Date.now }
});

module.exports = {
	comment_list(params, cb){
		Comment.find(params).then((result) => {
			cb(result);
		}).catch(() => {
			cb('error');
		})
	},
	comment_list_page(page, size, cb){
		page = parseInt(page, 10);
		size = parseInt(size, 10);
		Comment.find({}).limit(size).skip((page-1)*size).sort({create_Date: -1}).then((result) => {
			cb(result);
		}).catch(() => {
			cb('error');
		})
	},
	comment_remove(id, cb){
		Comment.findByIdAndRemove(id, (err)=> {
			cb(err);
		})
	},
	comment_search(keywords, page, size, cb){
		page = parseInt(page, 10);
		size = parseInt(size, 10);
		Comment.find({
			comment_text: {
				$regex: keywords
			}
		}).limit(size).skip((page-1)*size).sort({create_Date: -1}).then((result) => {
			cb(result);
		}).catch(() => {
			cb('error');
		})
	}
}