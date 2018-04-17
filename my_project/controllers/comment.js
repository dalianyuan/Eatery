const commentModel = require("../models/comment.js");

module.exports = {
	
	comment_list: (req, res) => {
		const {page, size} = req.query;
		let totalPage = 0;
		commentModel.comment_list({}, (result) => {
			if(result && result !== "error"){
				totalPage = Math.ceil( result.length/size );
				commentModel.comment_list_page(page, size, (result) => {
					res.json({
						ret: true,
						data: {
							list: result,
							totalPage: totalPage
						}
					})
				})
			}else{
				console.log("数据库错误。");
			}
			
		});
	},
	
	comment_remove: function(req, res){
		commentModel.comment_remove(req.query.id, (err) => {
			res.json({
				ret: true,
				data: {
					comment_remove: !err
				}
			})
		});
	},
	
	comment_search: function(req, res){
		const {comment_keywords,page, size} = req.query;
		let totalPage = 0;
		commentModel.comment_search(comment_keywords, page, size, (result) => {
			if(result && result !== "error"){
				totalPage = Math.ceil( result.length/size );
				res.json({
					ret: true,
					data: {
						list: result,
						totalPage: totalPage
					}
				})
			}else{
				console.log("数据库错误。");
			}
		})
	}
	
}
