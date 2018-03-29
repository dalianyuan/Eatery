var multer = require('multer');

var storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, './public/uploads')
	},
	filename: function(req, file, cb){
		cb(null, Date.now() + file.originalname)//加个时间戳,避免后上传的文件把前面的覆盖
	}
})
var upload = multer({storage:storage})

module.exports = upload;
