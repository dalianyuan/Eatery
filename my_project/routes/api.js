var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.js');
var goodsController = require('../controllers/goods.js');
var upload = require('../utils/uploads.js');

router.post( "/regist", userController.regist );
router.post( "/login", userController.login );

router.post( "/goods_add", upload.single('goods_pic'), goodsController.goods_add );

module.exports = router;
