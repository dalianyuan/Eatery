var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.js');
var goodsController = require('../controllers/goods.js');
var employeeController = require('../controllers/employee.js');
var vipController = require('../controllers/vip.js');
var orderController = require('../controllers/order.js');
var upload = require('../utils/uploads.js');

router.post( "/regist", userController.regist );
router.post( "/login", userController.login );

router.post( "/goods_add", upload.single('goods_pic'), goodsController.goods_add );
router.get( "/goods_list", goodsController.goods_list );
router.get( "/goods_remove", goodsController.goods_remove );
router.get( "/goods_info", goodsController.goods_info );
router.post( "/goods_update", goodsController.goods_update );
router.get( "/goods_search", goodsController.goods_search );

router.post( "/employee_add", upload.single('employee_pic'), employeeController.employee_add );
router.get( "/employee_list", employeeController.employee_list );
router.get( "/employee_remove", employeeController.employee_remove );
router.get( "/employee_info", employeeController.employee_info );
router.post( "/employee_update", employeeController.employee_update );
router.get( "/employee_search", employeeController.employee_search );

router.post( "/vip_add", vipController.vip_add );
router.get( "/vip_list", vipController.vip_list );
router.get( "/vip_remove", vipController.vip_remove );
router.get( "/vip_info", vipController.vip_info );
router.post( "/vip_update", vipController.vip_update );
router.get( "/vip_search", vipController.vip_search );

router.get( "/order_list", orderController.order_list );
router.get( "/order_remove", orderController.order_remove );
router.get( "/order_info", orderController.order_info );
router.post( "/order_update", orderController.order_update );
router.get( "/order_search", orderController.order_search );

module.exports = router;
