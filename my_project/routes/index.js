var express = require('express');
var router = express.Router();

/*注册页面 */
router.get('/', function(req, res, next) {
  res.render('regist', {});
});

/*登录页面*/
router.get('/login', function(req, res, next) {
  res.render('login', {});
});

/*后台主页面*/
router.get('/index', function(req, res, next) {
	//检查用户是否登录
//	if(req.session && req.session.username != null) {
		res.render('index', {});
//	} else {
//		res.redirect('/login');
//	}
});

/*头部*/
router.get('/top', function(req, res, next) {
  res.render('top', {});
});

/*左侧menu*/
router.get('/menu', function(req, res, next) {
  res.render('menu', {});
});

/*起始页内容区*/
router.get('/content', function(req, res, next) {
  res.render('content', {});
});

/*添加新商品*/
router.get('/goodsAdd', function(req, res, next) {
  res.render('goodsAdd', {});
});

/*商品列表*/
router.get('/goodsList', function(req, res, next) {
  res.render('goodsList', {});
});

/*商品详情页*/
router.get('/goodsDetail', function(req, res, next) {
  res.render('goodsDetail', {});
});

/*订单列表*/
router.get('/orderList', function(req, res, next) {
  res.render('orderList', {});
});








module.exports = router;
