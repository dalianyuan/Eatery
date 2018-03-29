var mongoose = require( "../utils/database.js" );
   
/*创建文档定义*/
var Goods = mongoose.model('goods', {
    goods_name  : String,//商品名称
    goods_price : String,//本店价格
    goods_count : Number,//库存
    goods_pic   : String,//商品图片
    create_Date : { type: Date, default: Date.now }
});

module.exports = {
	goods_add( goods_name, goods_price, goods_count, goods_pic, cb ){
		var goods = new Goods({
			goods_name: goods_name,
			goods_price: goods_price,
			goods_count: goods_count,
			goods_pic: goods_pic
		});
		goods.save(function(err){
			cb(err);
		})
	},
	findGoods( findParams, cb){
		Goods.findOne(findParams).then((result)=>{
			cb( result );
		}).catch(()=>{
			cb("error");
		})
	},
	goods_list(params, cb){
		Goods.find(params).then((result) => {
			cb(result);
		}).catch(() => {
			cb('error');
		})
	},
	goods_list_page(page, size, cb){
		page = parseInt(page, 10);
		size = parseInt(size, 10);
		Goods.find({}).limit(size).skip((page-1)*size).sort({create_Date: -1}).then((result) => {
			cb(result);
		}).catch(() => {
			cb('error');
		})
	},
	goods_remove(id, cb){
		Goods.findByIdAndRemove(id, (err)=> {
			cb(err);
		})
	},
	goods_info(id, cb){
		Goods.findById(id).then((result) => {
			cb(result);
		}).catch(() => {
			cb("error");
		})
	},
	goods_update(id, params, cb){
		Goods.findByIdAndUpdate(id, params).then((result) => {
			cb(result);
		}).catch(() => {
			cb("error");
		})
	}
}