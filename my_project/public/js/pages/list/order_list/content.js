function Content(contentContainer){
	this.contentContainer = contentContainer;
	this.page = 1;
	this.size = 5;
	this.init();
}
Content.template = `
	<!--订单列表title开始-->
	<h1>
		<span class="span1 left">
			<a href="javascript:;">Eatery后台管理中心 </a>
		</span>
		<span class="span2 left">&nbsp;-&nbsp; 订单列表</span>
		<span class="span3 left">
			<a href="javascript:;">
				<img src="/images/jnsy.png"/>
			</a>
		</span>
		<span class="span4 right">
			<a href="javascript:;">新订单</a>
		</span>
	</h1>
	<!--订单列表title结束-->

	<!--订单列表搜索栏开始-->
	<div id="form-div">
		<!--<form id="form" action="/search_goods" method="post" enctype="multipart/form-data">-->
			<img src="/images/icon_search.gif" />
			<select name="type">
				<option value="">所有分类</option>
				<option value="">川菜</option>
				<option value="">东北炖菜</option>
			</select>
			<select name="mark">
				<option value="">地区</option>
				<option value="">北京</option>
				<option value="">大连</option>
			</select>
			<select name="all">
				<option value="">全部</option>
				<option value="">新品</option>
				<option value="">精品</option>
				<option value="">热销</option>
			</select>
			关键字
			<input type="text" class="order_keywords" id="order_keywords" />
			<button id="btn" class="js-search">搜索</button>
		<!--</form>-->
	</div>
	<!--订单列表搜索栏结束-->

	<!--订单列表显示开始-->
	<div id="list-div">
		<table id="table" cellpadding="3" cellspacing="1">
			<thead>
				<tr>
					<th>订单编号</th>
					<th>订单名称</th>
					<th>总价格</th>
					<th>用户姓名</th>
					<th>电话</th>
					<th>地址</th>
					<th>下单时间</th>
					<th>状态</th>
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
	<!--订单列表显示结束-->

	<!--订单列表底部结束-->
	<div id="footer">
		共执行 9 个查询，用时 0.024190 秒，Gzip 已禁用，内存占用 3.580 MB <br/> 版权所有 © 2005-2018 上海商派软件有限公司，并保留所有权利。
	</div>
	<!--订单列表底部结束-->
`;

Content.ModelTemplate = `
	<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="exampleModalLabel">修改订单信息</h4>
	      </div>
	      <div class="modal-body">
	        <form>
	          <div class="form-group">
	            <label for="recipient-count" class="control-label">用户电话:</label>
	            <input type="text" class="form-control user_tel" id="recipient-count">
	          </div>
	          <div class="form-group">
	            <label for="recipient-name" class="control-label">地址:</label>
	            <input type="text" class="form-control user_address" id="recipient-name">
	          </div>
	          <div class="form-group">
	            <label for="recipient-name" class="control-label">订单状态:</label>
	            <input type="text" class="form-control order_status" id="recipient-name">
	          </div>
	        </form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	        <button type="button" class="btn btn-primary js-ok">确认修改</button>
	      </div>
	    </div>
	  </div>
	</div>
`;

$.extend(Content.prototype, {
	init: function(){
		this.createDom();
		this.showList();
		this.bindEvents();
	},
	createDom: function(){
		this.element = $(Content.template);
		this.model = $(Content.ModelTemplate);
		this.contentContainer.append(this.element);
		this.contentContainer.append(this.model);
		this.user_tel = this.model.find(".user_tel");
		this.user_address = this.model.find(".user_address");
		this.order_status = this.model.find(".order_status");
	},
	showList: function(){
		$.ajax({
			type: "get",
			url: "/api/order_list",
			data: {
				page: this.page,
				size: this.size
			},
			success: $.proxy(this.handleOrderListSuc, this)
		});
	},
	handleOrderListSuc: function(res){
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
		for(var i = 0; i < res.length; i++){
			var d = new Date( res[i].create_Date );  
			d = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
			res[i].create_Date = d;
		}
		var tbodyStr = "";
		for( var i = 0; i < res.length; i++ ){
			tbodyStr += `<tr>
				<td id="vip_num">
					${res[i].order_num}
				</td>
				<td>
					${res[i].order_name}
				</td>
				<td>
					￥${res[i].order_price}
				</td>
				<td>
					${res[i].user_name}
				</td>
				<td>
					${res[i].user_tel}
				</td>
				<td>
					${res[i].user_address}
				</td>
				<td>
					${res[i].create_Date}
				</td>
				<td>
					${res[i].order_status}
				</td>
				<td>
					<a href="javascript:;" title="修改">
						<img data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"
						data-id="${res[i]._id}" class="js-change" src="/images/icon_edit.gif" />
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
		var updateBtn = this.model.find(".js-ok");
		var searchBtn = this.element.find(".js-search");
		pageContainer.on("click", $.proxy(this.handleChangePage, this));
		operateContainer.on("click", $.proxy(this.handleItemOperate, this));
		updateBtn.on("click", $.proxy(this.handleItemUpdate, this));
		searchBtn.on("click", $.proxy(this.handleItemSearch, this));
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
			if(confirm("确认删除该订单吗?")){
				this.delItem( target.data("id") );
			}
		}
		if(isChangeClick){
			this.changeItem( target.data("id") );
		}
	},
	delItem: function(id){
		$.ajax({
			type:"get",
			url:"/api/order_remove",
			data: {
				id: id
			},
			success: $.proxy(this.handleItemDelSuc, this)
		});
	},
	handleItemDelSuc: function(res){
		if(res && res.data && res.data.order_remove){
			this.showList();
		}else{
			alert("数据删除失败!");
		}
	},
	changeItem: function(id){
		$.ajax({
			type:"get",
			url:"/api/order_info",
			data: {
				id: id
			},
			success: $.proxy(this.handleItemChangeSuc, this)
		});
	},
	handleItemChangeSuc: function(res){
		if(res && res.ret && res.data && res.data.order_info){
			var info = res.data.order_info;
			this.user_tel.val(info.user_tel);
			this.user_address.val(info.user_address);
			this.order_status.val(info.order_status);
			this.id = info._id;
		}
	},
	handleItemUpdate: function(){
		var user_tel = this.user_tel.val();
		var user_address = this.user_address.val();
		var order_status = this.order_status.val();
		
		$.ajax({
			type:"post",
			url:"/api/order_update",
			data: {
				user_tel: user_tel,
				user_address: user_address,
				order_status: order_status,
				order_id: this.id
			},
			success: $.proxy(this.handleItemUpdateSuc, this)
		});
	},
	handleItemUpdateSuc: function(res){
		if( res && res.ret && res.data && res.data.order_update ){
			$(".modal-backdrop").hide();
			this.model.hide();
			this.showList();
			alert( "订单信息修改成功!" );
		}else{
			alert( "对不起,订单信息修改出现错误。" );
		}
	},
	handleItemSearch: function(){
		var order_keywords = this.element.find(".order_keywords").val();
		$.ajax({
			type:"get",
			url:"/api/order_search",
			data: {
				order_keywords: order_keywords,
				page: this.page,
				size: this.size
			},
			success: $.proxy(this.handleItemSearchSuc, this)
		});
	},
	handleItemSearchSuc: function(res){
		if(res && res.data && res.data.list.length > 0){
			this.handleOrderListSuc(res);
		}else{
			alert("对不起,您搜索的订单不存在。");
			this.element.find(".order_keywords").val("");
		}
	}
})
