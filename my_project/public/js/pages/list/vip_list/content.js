function Content(contentContainer){
	this.contentContainer = contentContainer;
	this.page = 1;
	this.size = 5;
	this.init();
}
Content.template = `
	<!--会员列表title开始-->
	<h1>
		<span class="span1 left">
			<a href="javascript:;">Eatery后台管理中心 </a>
		</span>
		<span class="span2 left">&nbsp;-&nbsp; 会员列表</span>
		<span class="span3 left">
			<a href="javascript:;">
				<img src="/images/jnsy.png"/>
			</a>
		</span>
		<span class="span4 right">
			<a href="/html/vip/vip_add.html">添加新会员</a>
		</span>
	</h1>
	<!--会员列表title结束-->

	<!--会员列表搜索栏开始-->
	<div id="form-div">
		<!--<form id="form" action="/search_goods" method="post" enctype="multipart/form-data">-->
			<img src="/images/icon_search.gif" />
			<select name="type">
				<option value="">所有等级</option>
				<option value="">1</option>
				<option value="">2</option>
				<option value="">3</option>
			</select>
			<select name="mark">
				<option value="">积分区间</option>
				<option value="">100-500</option>
				<option value="">大于500 </option>
			</select>
			<select name="all">
				<option value="">全部</option>
			</select>
			关键字
			<input type="text" class="vip_keywords" id="vip_keywords" />
			<button id="btn" class="js-search">搜索</button>
		<!--</form>-->
	</div>
	<!--会员列表搜索栏结束-->

	<!--会员列表显示开始-->
	<div id="list-div">
		<table id="table" cellpadding="3" cellspacing="1">
			<thead>
				<tr>
					<th>会员编号</th>
					<th>会员姓名</th>
					<th>电子邮箱</th>
					<th>是否验证</th>
					<th>可用资金</th>
					<th>等级积分</th>
					<th>注册日期</th>
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
	<!--会员列表显示结束-->

	<!--会员列表底部结束-->
	<div id="footer">
		共执行 9 个查询，用时 0.024190 秒，Gzip 已禁用，内存占用 3.580 MB <br/> 版权所有 © 2005-2018 上海商派软件有限公司，并保留所有权利。
	</div>
	<!--会员列表底部结束-->
`;

Content.ModelTemplate = `
	<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="exampleModalLabel">修改会员信息</h4>
	      </div>
	      <div class="modal-body">
	        <form>
	          <div class="form-group">
	            <label for="recipient-count" class="control-label">会员编号:</label>
	            <input type="text" class="form-control vip_num" id="recipient-count">
	          </div>
	          <div class="form-group">
	            <label for="recipient-name" class="control-label">会员姓名:</label>
	            <input type="text" class="form-control vip_name" id="recipient-name">
	          </div>
	          <div class="form-group">
	            <label for="recipient-name" class="control-label">电子邮箱:</label>
	            <input type="text" class="form-control vip_email" id="recipient-name">
	          </div>
	          <div class="form-group">
	            <label for="recipient-price" class="control-label">是否验证:</label>
	            <input type="text" class="form-control vip_ok" id="recipient-price">
	          </div>
	          <div class="form-group">
	            <label for="recipient-count" class="control-label">可用资金:</label>
	            <input type="text" class="form-control vip_money" id="recipient-count">
	          </div>
	          <div class="form-group">
	            <label for="recipient-name" class="control-label">等级积分:</label>
	            <input type="text" class="form-control vip_grade" id="recipient-name">
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
		this.vip_num = this.model.find(".vip_num");
		this.vip_name = this.model.find(".vip_name");
		this.vip_email = this.model.find(".vip_email");
		this.vip_ok = this.model.find(".vip_ok");
		this.vip_money = this.model.find(".vip_money");
		this.vip_grade = this.model.find(".vip_grade");
	},
	showList: function(){
		$.ajax({
			type: "get",
			url: "/api/vip_list",
			data: {
				page: this.page,
				size: this.size
			},
			success: $.proxy(this.handleVipListSuc, this)
		});
	},
	handleVipListSuc: function(res){
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
			d = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
			res[i].create_Date = d;
		}
		var tbodyStr = "";
		for( var i = 0; i < res.length; i++ ){
			tbodyStr += `<tr>
				<td id="vip_num">
					${res[i].vip_num}
				</td>
				<td>
					${res[i].vip_name}
				</td>
				<td>
					${res[i].vip_email}
				</td>
				<td>
					${res[i].vip_ok}
				</td>
				<td>
					${res[i].vip_money}
				</td>
				<td>
					${res[i].vip_grade}
				</td>
				<td>
					${res[i].create_Date}
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
			if(confirm("确认删除该会员吗?")){
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
			url:"/api/vip_remove",
			data: {
				id: id
			},
			success: $.proxy(this.handleItemDelSuc, this)
		});
	},
	handleItemDelSuc: function(res){
		if(res && res.data && res.data.vip_remove){
			this.showList();
		}else{
			alert("数据删除失败!");
		}
	},
	changeItem: function(id){
		$.ajax({
			type:"get",
			url:"/api/vip_info",
			data: {
				id: id
			},
			success: $.proxy(this.handleItemChangeSuc, this)
		});
	},
	handleItemChangeSuc: function(res){
		if(res && res.ret && res.data && res.data.vip_info){
			var info = res.data.vip_info;
			this.vip_num.val(info.vip_num);
			this.vip_name.val(info.vip_name);
			this.vip_email.val(info.vip_email);
			this.vip_ok.val(info.vip_ok);
			this.vip_money.val(info.vip_money);
			this.vip_grade.val(info.vip_grade);
			this.id = info._id;
		}
	},
	handleItemUpdate: function(){
		var vip_num = this.vip_num.val();
		var vip_name = this.vip_name.val();
		var vip_email = this.vip_email.val();
		var vip_ok = this.vip_ok.val();
		var vip_money = this.vip_money.val();
		var vip_grade = this.vip_grade.val();
		
		$.ajax({
			type:"post",
			url:"/api/vip_update",
			data: {
				vip_num: vip_num,
				vip_name: vip_name,
				vip_email: vip_email,
				vip_ok: vip_ok,
				vip_money: vip_money,
				vip_grade: vip_grade,
				vip_id: this.id
			},
			success: $.proxy(this.handleItemUpdateSuc, this)
		});
	},
	handleItemUpdateSuc: function(res){
		if( res && res.ret && res.data && res.data.vip_update ){
			$(".modal-backdrop").hide();
			this.model.hide();
			this.showList();
			alert( "会员信息修改成功!" );
		}else{
			alert( "对不起,会员信息修改出现错误。" );
		}
	},
	handleItemSearch: function(){
		var vip_keywords = this.element.find(".vip_keywords").val();
		$.ajax({
			type:"get",
			url:"/api/vip_search",
			data: {
				vip_keywords: vip_keywords,
				page: this.page,
				size: this.size
			},
			success: $.proxy(this.handleItemSearchSuc, this)
		});
	},
	handleItemSearchSuc: function(res){
		if(res && res.data && res.data.list.length > 0){
			this.handleVipListSuc(res);
		}else{
			alert("对不起,您搜索的会员不存在。");
			this.element.find(".vip_keywords").val("");
		}
	}
})
