const employeeModel = require("../models/employee.js");

module.exports = {
	
	employee_add: (req, res) => {
		req.body.employee_pic = req.file ? req.file.filename : "";
		employeeModel.findEmployee( {employee_id: req.body.employee_id}, ( result ) => {
			if(result && result !== "error"){
				res.json({
					ret: true,
					data: {
						employee_add: false
					}
				})
			}else{
				employeeModel.employee_add(req.body, (err) => {
					res.json({
						ret: true,
						data: {
							employee_add: !err
						}
					})
				});
			}
		} );
	},
	
	employee_list: (req, res) => {
		const {page, size} = req.query;
		let totalPage = 0;
		employeeModel.employee_list({}, (result) => {
			if(result && result !== "error"){
				totalPage = Math.ceil( result.length/size );
				employeeModel.employee_list_page(page, size, (result) => {
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
	
	employee_remove: function(req, res){
		employeeModel.employee_remove(req.query.id, (err) => {
			res.json({
				ret: true,
				data: {
					employee_remove: !err
				}
			})
		});
	},
	
	employee_info: function(req, res){
		employeeModel.employee_info(req.query.id, (result) => {
			res.json({
				ret: true,
				data: {
					employee_info: (result && result !== "error") ? result : false
				}
			})
		});
	},
	
	employee_update: function(req, res){
		employeeModel.employee_update(req.body.employee_id, req.body, (result) => {
			res.json({
				ret: true,
				data: {
					employee_update: (result && result !== "error") ? true : false
				}
			})
		})
	},
	
	employee_search: function(req, res){
		const {employee_keywords,page, size} = req.query;
		let totalPage = 0;
		employeeModel.employee_search(employee_keywords, page, size, (result) => {
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
