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
	}
	
}
