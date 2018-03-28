var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.js');
var goodsController = require('../controllers/goods.js');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

var storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, './uploads')
	},
	filename: function(req, file, cb){
		cb(null, file.originalname)
	}
})
var upload = multer({storage:storage})

router.post( "/regist", userController.regist );
router.post( "/login", userController.login );

router.post( "/goods_add", upload.single('goods_pic'), goodsController.goods_add );

module.exports = router;
