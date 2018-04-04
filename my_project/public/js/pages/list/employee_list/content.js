function Content(contentContainer){
	this.contentContainer = contentContainer;
	this.page = 1;
	this.size = 5;
	this.init();
}
Content.template = `
	<!--职工列表title开始-->
	<h1>
		<span class="span1 left">
			<a href="javascript:;">Eatery后台管理中心 </a>
		</span>
		<span class="span2 left">&nbsp;-&nbsp; 职工列表</span>
		<span class="span3 left">
			<a href="javascript:;">
				<img src="/images/jnsy.png"/>
			</a>
		</span>
		<span class="span4 right">
			<a href="/html/employee/employee_add.html">添加新职工</a>
		</span>
	</h1>
	<!--职工列表title结束-->

	<!--职工列表搜索栏开始-->
	<div id="form-div">
			<img src="/images/icon_search.gif" />
			<select name="type">
				<option value="">所有分类</option>
				<option value="">职位</option>
			</select>
			<select name="mark">
				<option value="">薪资范围</option>
				<option value=""><4000</option>
				<option value="">4000-8000</option>
				<option value="">>8000</option>
			</select>
			<select name="all">
				<option value="">全部</option>
			</select>
			关键字
			<input type="text" class="employee_keywords" id="employee_keywords" />
			<button id="btn" class="js-search">搜索</button>
	</div>
	<!--职工列表搜索栏结束-->

	<!--职工列表显示开始-->
	<div id="list-div">
		<table id="table" cellpadding="3" cellspacing="1">
			<thead>
				<tr>
					<th>职工图片</th>
					<th>姓名</th>
					<th>性别</th>
					<th>出生日期</th>
					<th>联系电话</th>
					<th>家庭住址</th>
					<th>职位</th>
					<th>薪水</th>
					<th>入职时间</th>
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
	<!--职工列表显示结束-->

	<!--职工列表底部结束-->
	<div id="footer">
		共执行 9 个查询，用时 0.024190 秒，Gzip 已禁用，内存占用 3.580 MB <br/> 版权所有 © 2005-2018 上海商派软件有限公司，并保留所有权利。
	</div>
	<!--职工列表底部结束-->
`;

Content.ModelTemplate = `
	<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="exampleModalLabel">修改职工信息</h4>
	      </div>
	      <div class="modal-body">
	        <form>
	          <div class="form-group">
	            <label for="recipient-name" class="control-label">职工姓名:</label>
	            <input type="text" class="form-control employee_name" id="recipient-name">
	          </div>
	          <div class="form-group">
	            <label for="recipient-price" class="control-label">性别:</label>
	            <input type="text" class="form-control employee_sex" id="recipient-price">
	          </div>
	          <div class="form-group">
	            <label for="recipient-count" class="control-label">出生日期:</label>
	            <input type="text" class="form-control employee_birth" id="recipient-count">
	          </div>
	          <div class="form-group">
	            <label for="recipient-name" class="control-label">联系电话:</label>
	            <input type="text" class="form-control employee_tel" id="recipient-name">
	          </div>
	          <div class="form-group">
	            <label for="recipient-price" class="control-label">家庭住址:</label>
	            <input type="text" class="form-control employee_address" id="recipient-price">
	          </div>
	          <div class="form-group">
	            <label for="recipient-count" class="control-label">职位:</label>
	            <input type="text" class="form-control employee_type" id="recipient-count">
	          </div>
	          <div class="form-group">
	            <label for="recipient-name" class="control-label">薪水:</label>
	            <input type="text" class="form-control employee_salary" id="recipient-name">
	          </div>
	          <div class="form-group">
	            <label for="recipient-price" class="control-label">入职时间:</label>
	            <input type="text" class="form-control employee_time" id="recipient-price">
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
		this.employee_name = this.model.find(".employee_name");
		this.employee_sex = this.model.find(".employee_sex");
		this.employee_birth = this.model.find(".employee_birth");
		this.employee_tel = this.model.find(".employee_tel");
		this.employee_address = this.model.find(".employee_address");
		this.employee_type = this.model.find(".employee_type");
		this.employee_salary = this.model.find(".employee_salary");
		this.employee_time = this.model.find(".employee_time");
	},
	showList: function(){
		$.ajax({
			type: "get",
			url: "/api/employee_list",
			data: {
				page: this.page,
				size: this.size
			},
			success: $.proxy(this.handleEmployeeListSuc, this)
		});
	},
	handleEmployeeListSuc: function(res){
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
				<td id="employee_pic">
					<img src="/uploads/${res[i].employee_pic}"/>
				</td>
				<td id="employee_name">
					${res[i].employee_name}
				</td>
				<td>
					${res[i].employee_sex}
				</td>
				<td>
					${res[i].employee_birth}
				</td>
				<td>
					${res[i].employee_tel}
				</td>
				<td>
					${res[i].employee_address}
				</td>
				<td>
					${res[i].employee_type}
				</td>
				<td>
					${res[i].employee_salary}
				</td>
				<td>
					${res[i].employee_time}
				</td>
				<td>
					<a href="javascript:;" title="查看">
						<img src="/images/icon_view.gif" />
					</a>
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
			if(confirm("确认删除该职工吗?")){
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
			url:"/api/employee_remove",
			data: {
				id: id
			},
			success: $.proxy(this.handleItemDelSuc, this)
		});
	},
	handleItemDelSuc: function(res){
		if(res && res.data && res.data.employee_remove){
			this.showList();
		}else{
			alert("数据删除失败!");
		}
	},
	changeItem: function(id){
		$.ajax({
			type:"get",
			url:"/api/employee_info",
			data: {
				id: id
			},
			success: $.proxy(this.handleItemChangeSuc, this)
		});
	},
	handleItemChangeSuc: function(res){
		if(res && res.ret && res.data && res.data.employee_info){
			var info = res.data.employee_info;
			this.employee_name.val(info.employee_name);
			this.employee_sex.val(info.employee_sex);
			this.employee_birth.val(info.employee_birth);
			this.employee_tel.val(info.employee_tel);
			this.employee_address.val(info.employee_address);
			this.employee_type.val(info.employee_type);
			this.employee_salary.val(info.employee_salary);
			this.employee_time.val(info.employee_time);
			this.id = info._id;
		}
	},
	handleItemUpdate: function(){
		var employee_name = this.employee_name.val();
		var employee_sex = this.employee_sex.val();
		var employee_birth = this.employee_birth.val();
		var employee_tel = this.employee_tel.val();
		var employee_address = this.employee_address.val();
		var employee_type = this.employee_type.val();
		var employee_salary = this.employee_salary.val();
		var employee_time = this.employee_time.val();
		
		$.ajax({
			type:"post",
			url:"/api/employee_update",
			data: {
				employee_name: employee_name,
				employee_sex: employee_sex,
				employee_birth: employee_birth,
				employee_tel: employee_tel,
				employee_address: employee_address,
				employee_type: employee_type,
				employee_salary: employee_salary,
				employee_time: employee_time,
				employee_id: this.id
			},
			success: $.proxy(this.handleItemUpdateSuc, this)
		});
	},
	handleItemUpdateSuc: function(res){
		console.log(res)
		if( res && res.ret && res.data && res.data.employee_update ){
			$(".modal-backdrop").hide();
			this.model.hide();
			this.showList();
			alert( "职工信息修改成功!" );
		}else{
			alert( "对不起,职工信息修改出现错误。" );
		}
	},
	handleItemSearch: function(){
		var employee_keywords = this.element.find(".employee_keywords").val();
		$.ajax({
			type:"get",
			url:"/api/employee_search",
			data: {
				employee_keywords: employee_keywords,
				page: this.page,
				size: this.size
			},
			success: $.proxy(this.handleItemSearchSuc, this)
		});
	},
	handleItemSearchSuc: function(res){
		if(res && res.data && res.data.list.length > 0){
			this.handleEmployeeListSuc(res);
		}else{
			alert("对不起,您搜索的职工不存在。");
			this.element.find(".employee_keywords").val("");
		}
	}
})
