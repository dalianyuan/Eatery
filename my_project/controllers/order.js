const orderModel = require("../models/order.js");

module.exports = {
	
	order_list: (req, res) => {
		const {page, size} = req.query;
		let totalPage = 0;
		orderModel.order_list({}, (result) => {
			if(result && result !== "error"){
				totalPage = Math.ceil( result.length/size );
				orderModel.order_list_page(page, size, (result) => {
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
	
	order_remove: function(req, res){
		orderModel.order_remove(req.query.id, (err) => {
			res.json({
				ret: true,
				data: {
					order_remove: !err
				}
			})
		});
	},
	
	order_info: function(req, res){
		orderModel.order_info(req.query.id, (result) => {
			res.json({
				ret: true,
				data: {
					order_info: (result && result !== "error") ? result : false
				}
			})
		});
	},
	
	order_update: function(req, res){
		orderModel.order_update(req.body.order_id, req.body, (result) => {
			res.json({
				ret: true,
				data: {
					order_update: (result && result !== "error") ? true : false
				}
			})
		})
	},
	
	order_search: function(req, res){
		const {order_keywords,page, size} = req.query;
		let totalPage = 0;
		orderModel.order_search(order_keywords, page, size, (result) => {
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
