var mongoose = require( "../utils/database.js" );
   
/*创建文档定义*/
var Employee = mongoose.model('employee', {
	  employee_id 	  : String,
    employee_name   : String,
    employee_sex    : String,
    employee_birth  : String,
    employee_address: String,
    employee_tel  	: String,
    employee_type   : String,
    employee_salary : String,
    employee_time 	: String,
    employee_pic    : String,
    create_Date 		: { type: Date, default: Date.now }
});

module.exports = {
	employee_add( params, cb ){
		var employee = new employee({
			employee_id: params.employee_id,
			employee_name: params.employee_name,
			employee_sex: params.employee_sex,
			employee_birth: params.employee_birth,
			employee_address: params.employee_address,
			employee_tel: params.employee_tel,
			employee_type: params.employee_type,
			employee_salary: params.employee_salary,
			employee_time: params.employee_time,
			employee_pic: employee_pic
		});
		Employee.save(function(err){
			cb(err);
		})
	},
	findEmployee( findParams, cb){
		employee.findOne(findParams).then((result)=>{
			cb( result );
		}).catch(()=>{
			cb("error");
		})
	},
	/*employee_list(params, cb){
		employee.find(params).then((result) => {
			cb(result);
		}).catch(() => {
			cb('error');
		})
	},
	employee_list_page(page, size, cb){
		page = parseInt(page, 10);
		size = parseInt(size, 10);
		employee.find({}).limit(size).skip((page-1)*size).sort({create_Date: -1}).then((result) => {
			cb(result);
		}).catch(() => {
			cb('error');
		})
	},
	employee_remove(id, cb){
		employee.findByIdAndRemove(id, (err)=> {
			cb(err);
		})
	},
	employee_info(id, cb){
		employee.findById(id).then((result) => {
			cb(result);
		}).catch(() => {
			cb("error");
		})
	},
	employee_update(id, params, cb){
		employee.findByIdAndUpdate(id, params).then((result) => {
			cb(result);
		}).catch(() => {
			cb("error");
		})
	},
	employee_search(keywords, page, size, cb){
		page = parseInt(page, 10);
		size = parseInt(size, 10);
		employee.find({
			employee_name: {
				$regex: keywords
			}
		}).limit(size).skip((page-1)*size).sort({create_Date: -1}).then((result) => {
			cb(result);
		}).catch(() => {
			cb('error');
		})
	}*/
}