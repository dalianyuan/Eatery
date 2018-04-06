const detailModel = require("../models/detail.js");

module.exports = {
	
	eatery_add: (req, res) => {
		req.body.eatery_logo = req.file ? req.file.filename : "";
		detailModel.eatery_add(req.body, (err) => {
			res.json({
				ret: true,
				data: {
					eatery_add: !err
				}
			})
		});
	},
	
	eatery_detail: (req, res) => {
		detailModel.eatery_detail({}, (result) => {
			res.json({
				ret: true,
				data: {
					eatery_detail: result
				}
			})
		})
	},
	
	eatery_info: function(req, res){
		detailModel.eatery_detail({}, (result) => {
			res.json({
				ret: true,
				data: {
					eatery_info: (result && result !== "error") ? result : false
				}
			})
		});
	},
	
	eatery_update: function(req, res){
		detailModel.eatery_update(req.body.eatery_id, req.body, (result) => {
			res.json({
				ret: true,
				data: {
					eatery_update: (result && result !== "error") ? true : false
				}
			})
		})
	}
	
}
