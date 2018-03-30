const goodsModel = require("../models/goods.js");

module.exports = {
	
	goods_add: (req, res) => {
		const { goods_name, goods_price, goods_count } = req.body;
		const goods_pic = req.file ? req.file.filename : "";
		goodsModel.findGoods( {goods_name: goods_name}, ( result ) => {
			if(result && result !== "error"){
				res.json({
					ret: true,
					data: {
						goods_add: false
					}
				})
			}else{
				goodsModel.goods_add(goods_name, goods_price, goods_count, goods_pic, (err) => {
					res.json({
						ret: true,
						data: {
							goods_add: !err
						}
					})
				});
			}
		} );
	},
	
	goods_list: (req, res) => {
		const {page, size} = req.query;
		let totalPage = 0;
		goodsModel.goods_list({}, (result) => {
			if(result && result !== "error"){
				totalPage = Math.ceil( result.length/size );
				goodsModel.goods_list_page(page, size, (result) => {
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
	
	goods_remove: function(req, res){
		goodsModel.goods_remove(req.query.id, (err) => {
			res.json({
				ret: true,
				data: {
					goods_remove: !err
				}
			})
		});
	},
	
	goods_info: function(req, res){
		goodsModel.goods_info(req.query.id, (result) => {
			res.json({
				ret: true,
				data: {
					goods_info: (result && result !== "error") ? result : false
				}
			})
		});
	},
	
	goods_update: function(req, res){
		const { goods_name, goods_price, goods_count, goods_id } = req.body;
		goodsModel.goods_update(goods_id, {goods_name, goods_price, goods_count}, (result) => {
			res.json({
				ret: true,
				data: {
					goods_update: (result && result !== "error") ? true : false
				}
			})
		})
	},
	
	goods_search: function(req, res){
		const {goods_keywords,page, size} = req.query;
		let totalPage = 0;
		goodsModel.goods_search(goods_keywords, page, size, (result) => {
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
