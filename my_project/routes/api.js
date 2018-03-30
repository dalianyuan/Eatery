var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.js');
var goodsController = require('../controllers/goods.js');
var upload = require('../utils/uploads.js');

router.post( "/regist", userController.regist );
router.post( "/login", userController.login );

router.post( "/goods_add", upload.single('goods_pic'), goodsController.goods_add );
router.get( "/goods_list", goodsController.goods_list );
router.get( "/goods_remove", goodsController.goods_remove );
router.get( "/goods_info", goodsController.goods_info );
router.post( "/goods_update", goodsController.goods_update );
router.get( "/goods_search", goodsController.goods_search );

module.exports = router;
