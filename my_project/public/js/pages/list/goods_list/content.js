function Content(contentContainer){
	this.contentContainer = contentContainer;
	this.page = 1;
	this.size = 5;
	this.init();
}
Content.template = `
	<!--商品列表title开始-->
	<h1>
		<span class="span1 left">
			<a href="javascript:;">Eatery后台管理中心 </a>
		</span>
		<span class="span2 left">&nbsp;-&nbsp; 商品列表</span>
		<span class="span3 left">
			<a href="javascript:;">
				<img src="/images/jnsy.png"/>
			</a>
		</span>
		<span class="span4 right">
			<a href="/html/goods/goods_add.html">添加新商品</a>
		</span>
	</h1>
	<!--商品列表title结束-->

	<!--商品列表搜索栏开始-->
	<div id="form-div">
		<!--<form id="form" action="/search_goods" method="post" enctype="multipart/form-data">-->
			<img src="/images/icon_search.gif" />
			<select name="type">
				<option value="">所有分类</option>
				<option value="">饮品</option>
				<option value="">热卖菜品</option>
				<option value="">点心</option>
				<option value="">沙拉</option>
			</select>
			<select name="mark">
				<option value="">口味</option>
				<option value="">甜</option>
				<option value="">辣</option>
				<option value="">酸</option>
			</select>
			<select name="all">
				<option value="">全部</option>
				<option value="">新品</option>
				<option value="">精品</option>
				<option value="">热销</option>
			</select>
			关键字
			<input type="text" name="goods_keywords" id="goods_keywords" />
			<button id="btn" onclick="search()">搜索</button>
		<!--</form>-->
	</div>
	<!--商品列表搜索栏结束-->

	<!--商品列表显示开始-->
	<div id="list-div">
		<table id="table" cellpadding="3" cellspacing="1">
			<thead>
				<tr>
					<th>商品图片</th>
					<th>商品名称</th>
					<th>价格</th>
					<th>新品</th>
					<th>精品</th>
					<th>热销</th>
					<th>库存</th>
					<th>操作</th>
				</tr>
			</thead>
			
			<tbody class="js-tbody"></tbody>
		</table>

		<!--列表下的页码开始-->
		<div id="page">
			<nav aria-label="Page navigation">
			    <ul class="pagination js-pagination">
				    <li><a href="javascript:;">1</a></li>
			    </ul>
			</nav>
		</div>
		<!--列表下的页码结束-->

	</div>
	<!--商品列表显示结束-->

	<!--商品列表底部结束-->
	<div id="footer">
		共执行 9 个查询，用时 0.024190 秒，Gzip 已禁用，内存占用 3.580 MB <br/> 版权所有 © 2005-2018 上海商派软件有限公司，并保留所有权利。
	</div>
	<!--商品列表底部结束-->
`;

$.extend(Content.prototype, {
	init: function(){
		this.createDom();
		this.showList();
		this.bindEvents();
	},
	createDom: function(){
		this.element = $(Content.template);
		this.contentContainer.append(this.element);
	},
	showList: function(){
		$.ajax({
			type: "get",
			url: "/api/goods_list",
			data: {
				page: this.page,
				size: this.size
			},
			success: $.proxy(this.handleGoodsListSuc, this)
		});
	},
	handleGoodsListSuc: function(res){
//		console.log( res );
		if(res && res.data && res.data.list){
			this.createItems(res.data.list);
			if( this.page > res.data.totalPage ){
				this.page = res.data.totalPage;
				this.showList();
			}
			this.createPages(res.data.totalPage);
		}else{
			alert("请求数据发生错误!");
		}
	},
	createItems: function(res){
		var tbodyStr = "";
		for( var i = 0; i < res.length; i++ ){
			tbodyStr += `<tr>
				<td id="goods_img">
					<img src="/uploads/${res[i].goods_pic}"/>
				</td>
				<td id="goods_name">
					${res[i].goods_name}
				</td>
				<td>
					￥${res[i].goods_price}
				</td>
				<td>
					<img src="/images/no.gif" />
				</td>
				<td>
					<img src="/images/yes.gif" />
				</td>
				<td>
					<img src="/images/yes.gif" />
				</td>
				<td>
					${res[i].goods_count}
				</td>
				<td>
					<a href="javascript:;" title="查看">
						<img src="/images/icon_view.gif" />
					</a>
					<a href="javascript:;" title="修改">
						<img data-id="${res[i]._id}" class="js-change" src="/images/icon_edit.gif" />
					</a>
					<a href="javascript:;"" title="删除">
						<img data-id="${res[i]._id}" class="js-del" src="/images/icon_trash.gif" />
					</a>
				</td>
			</tr>`;
		}
		this.element.find(".js-tbody").html( tbodyStr );
	},
	createPages: function(length){
		var pageStr = "";
		for( var i = 1; i <= length; i++ ){
			pageStr += `<li><a class="js-page" href="javascript:;">${i}</a></li>`;
		}
		this.element.find(".js-pagination").html( pageStr );
	},
	bindEvents: function(){
		var pageContainer = this.element.find(".js-pagination");
		var operateContainer = this.element.find(".js-tbody");
		pageContainer.on("click", $.proxy(this.handleChangePage, this));
		operateContainer.on("click", $.proxy(this.handleItemOperate, this));
		
	},
	handleChangePage: function(e){
		this.page = e.target.innerHTML;
		this.showList();
	},
	handleItemOperate: function(e){
		var target = $(e.target);
		var isDelClick = target.hasClass("js-del");
		var isChangeClick = target.hasClass("js-change");
		if(isDelClick){
			this.delItem( target.data("id") );
		}
	},
	delItem: function(id){
		$.ajax({
			type:"get",
			url:"/api/goods_remove",
			data: {
				id: id
			},
			success: $.proxy(this.handleItemDelSuc, this)
		});
	},
	handleItemDelSuc: function(res){
		if(res && res.data && res.data.goods_remove){
			this.showList();
		}else{
			alert("数据删除失败!");
		}
	}
})
