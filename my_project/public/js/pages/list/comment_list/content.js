function Content(contentContainer){
	this.contentContainer = contentContainer;
	this.page = 1;
	this.size = 5;
	this.init();
}
Content.template = `
	<!--评论列表title开始-->
	<h1>
		<span class="span1 left">
			<a href="javascript:;">Eatery后台管理中心 </a>
		</span>
		<span class="span2 left">&nbsp;-&nbsp; 评论列表</span>
		<span class="span3 left">
			<a href="javascript:;">
				<img src="/images/jnsy.png"/>
			</a>
		</span>
		<span class="span4 right">
			<a href="javascript:;">新评论</a>
		</span>
	</h1>
	<!--评论列表title结束-->

	<!--评论列表搜索栏开始-->
	<div id="form-div">
		<!--<form id="form" action="/search_goods" method="post" enctype="multipart/form-data">-->
			<img src="/images/icon_search.gif" />
			<select name="type">
				<option value="">所有分类</option>
				<option value="">好评</option>
				<option value="">中评</option>
				<option value="">差评</option>
			</select>
			<select name="all">
				<option value="">全部</option>
				<option value="">新品</option>
				<option value="">精品</option>
				<option value="">热销</option>
			</select>
			关键字
			<input type="text" class="comment_keywords" id="comment_keywords" />
			<button id="btn" class="js-search">搜索</button>
		<!--</form>-->
	</div>
	<!--评论列表搜索栏结束-->

	<!--评论列表显示开始-->
	<div id="list-div">
		<table id="table" cellpadding="3" cellspacing="1">
			<thead>
				<tr>
					<th>评论编号</th>
					<th>商品</th>
					<th>评论内容</th>
					<th>评论用户名</th>
					<th>评论时间</th>
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
	<!--评论列表显示结束-->

	<!--评论列表底部结束-->
	<div id="footer">
		共执行 9 个查询，用时 0.024190 秒，Gzip 已禁用，内存占用 3.580 MB <br/> 版权所有 © 2005-2018 上海商派软件有限公司，并保留所有权利。
	</div>
	<!--评论列表底部结束-->
`;

Content.ModelTemplate = `
	<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="exampleModalLabel">回复评论</h4>
	      </div>
	      <div class="modal-body">
	        <form>
	          <div class="form-group">
	            <label for="recipient-count" class="control-label">商家说:</label>
	            <textarea class="form-control" id="recipient-count"></textarea>
	          </div>
	        </form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	        <button type="button" class="btn btn-primary js-ok">回复</button>
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
	},
	showList: function(){
		$.ajax({
			type: "get",
			url: "/api/comment_list",
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
				<td>
					${res[i].comment_num}
				</td>
				<td>
					${res[i].goods_name}
				</td>
				<td>
					${res[i].comment_text}
				</td>
				<td>
					${res[i].user_name}
				</td>
				<td>
					${res[i].create_Date}
				</td>
				<td>
					<a href="javascript:;" title="回复">
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
		var answerBtn = this.model.find(".js-ok");
		var searchBtn = this.element.find(".js-search");
		pageContainer.on("click", $.proxy(this.handleChangePage, this));
		operateContainer.on("click", $.proxy(this.handleItemOperate, this));
		answerBtn.on("click", $.proxy(this.handleItemAnswer, this));
		searchBtn.on("click", $.proxy(this.handleItemSearch, this));
	},
	handleChangePage: function(e){
		this.page = e.target.innerHTML;
		this.showList();
	},
	handleItemOperate: function(e){
		var target = $(e.target);
		var isDelClick = target.hasClass("js-del");
		if(isDelClick){
			if(confirm("确认删除该评论吗?")){
				this.delItem( target.data("id") );
			}
		}
	},
	delItem: function(id){
		$.ajax({
			type:"get",
			url:"/api/comment_remove",
			data: {
				id: id
			},
			success: $.proxy(this.handleItemDelSuc, this)
		});
	},
	handleItemDelSuc: function(res){
		if(res && res.data && res.data.comment_remove){
			this.showList();
		}else{
			alert("数据删除失败!");
		}
	},
	handleItemAnswer: function(){
		alert("评论回复成功！");
		$(".modal-backdrop").hide();
		this.model.hide();
		this.showList();
	},
	handleItemSearch: function(){
		var comment_keywords = this.element.find(".comment_keywords").val();
		$.ajax({
			type:"get",
			url:"/api/comment_search",
			data: {
				comment_keywords: comment_keywords,
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
			alert("对不起,您搜索的评论不存在。");
			this.element.find(".comment_keywords").val("");
		}
	}
})
