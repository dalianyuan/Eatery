const goodsModel = require("../models/goods.js");
const crypto = require("crypto");

module.exports = {
	
	goods_add: (req, res) => {
		const { goods_name, goods_price, goods_count, goods_pic } = req.body;
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
	}
	
}
