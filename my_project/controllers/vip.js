const vipModel = require("../models/vip.js");

module.exports = {
	
	vip_add: (req, res) => {
		vipModel.findVip( {vip_num: req.body.vip_num}, ( result ) => {
			if(result && result !== "error"){
				res.json({
					ret: true,
					data: {
						vip_add: false
					}
				})
			}else{
				vipModel.vip_add(req.body, (err) => {
					res.json({
						ret: true,
						data: {
							vip_add: !err
						}
					})
				});
			}
		} );
	},
	
	vip_list: (req, res) => {
		const {page, size} = req.query;
		let totalPage = 0;
		vipModel.vip_list({}, (result) => {
			if(result && result !== "error"){
				totalPage = Math.ceil( result.length/size );
				vipModel.vip_list_page(page, size, (result) => {
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
	
	vip_remove: function(req, res){
		vipModel.vip_remove(req.query.id, (err) => {
			res.json({
				ret: true,
				data: {
					vip_remove: !err
				}
			})
		});
	},
	
	vip_info: function(req, res){
		vipModel.vip_info(req.query.id, (result) => {
			res.json({
				ret: true,
				data: {
					vip_info: (result && result !== "error") ? result : false
				}
			})
		});
	},
	
	vip_update: function(req, res){
		vipModel.vip_update(req.body.vip_id, req.body, (result) => {
			res.json({
				ret: true,
				data: {
					vip_update: (result && result !== "error") ? true : false
				}
			})
		})
	},
	
	vip_search: function(req, res){
		const {vip_keywords,page, size} = req.query;
		let totalPage = 0;
		vipModel.vip_search(vip_keywords, page, size, (result) => {
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
