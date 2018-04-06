function Content(contentContainer){
	this.contentContainer = contentContainer;
	this.page = 1;
	this.size = 5;
	this.init();
}
Content.template = `
	<!--店铺详情title开始-->
	<h1>
		<span class="span1 left">
			<a href="javascript:;">Eatery后台管理中心 </a>
		</span>
		<span class="span2 left">&nbsp;-&nbsp; 店铺详情页</span>
	</h1>
	<!--店铺详情title结束-->

	<div id="main">
		<div id="bar">
			<p>
				<span class="active">店铺信息</span>
			</p>
		</div>
		<div id="form">
			<!--添加店铺,用ajax提交数据时不需要form表单-->
			
				<!--店铺信息开始-->
				<table class="tableOn js-table" id="table">
					
				</table>
				<!--通用信息结束-->
				
				<!--修改信息按钮-->
				<div id="subBtn">
					<button class="btn js-submit" id="btnOk" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">修改店铺信息</button>
				</div>
				
		</div>
	</div>

	<div id="footer">
		共执行 9 个查询，用时 0.024190 秒，Gzip 已禁用，内存占用 3.580 MB <br/> 版权所有 © 2005-2018 上海商派软件有限公司，并保留所有权利。
	</div>
`;

Content.ModelTemplate = `
	<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="exampleModalLabel">修改店铺信息</h4>
	      </div>
	      <div class="modal-body">
	        <form>
	          <div class="form-group">
	            <label for="recipient-name" class="control-label">店铺名称:</label>
	            <input type="text" class="form-control eatery_name" id="recipient-name">
	          </div>
	          <div class="form-group">
	            <label for="recipient-price" class="control-label">店铺简介:</label>
	            <input type="text" class="form-control eatery_intro" id="recipient-price">
	          </div>
	          <div class="form-group">
	            <label for="recipient-count" class="control-label">店铺关键字:</label>
	            <input type="text" class="form-control eatery_keywords" id="recipient-count">
	          </div>
	          <div class="form-group">
	            <label for="recipient-name" class="control-label">店铺地址:</label>
	            <input type="text" class="form-control eatery_address" id="recipient-name">
	          </div>
	          <div class="form-group">
	            <label for="recipient-price" class="control-label">联系电话:</label>
	            <input type="text" class="form-control eatery_tel" id="recipient-price">
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
		this.showDetail();
		this.bindEvents();
	},
	createDom: function(){
		this.element = $(Content.template);
		this.model = $(Content.ModelTemplate);
		this.contentContainer.append(this.element);
		this.contentContainer.append(this.model);
		this.eatery_name = this.model.find(".eatery_name");
		this.eatery_intro = this.model.find(".eatery_intro");
		this.eatery_keywords = this.model.find(".eatery_keywords");
		this.eatery_address = this.model.find(".eatery_address");
		this.eatery_tel = this.model.find(".eatery_tel");
	},
	showDetail: function(){
		$.ajax({
			type: "get",
			url: "/api/eatery_detail",
			success: $.proxy(this.handleShowDetailSuc, this)
		});
	},
	handleShowDetailSuc: function(res){
		if(res && res.data && res.data.eatery_detail){
			this.createItems(res.data.eatery_detail);
		}else{
			alert("请求数据发生错误!");
		}
	},
	createItems: function(res){
		var tableStr = "";
		tableStr += `
			<tr>
				<td class="label">店铺名称：</td>
				<td>
					${res.eatery_name}
				</td>
			</tr>
			<tr>
				<td class="label">
					店铺简介：
				</td>
				<td>
					${res.eatery_intro}
				</td>
			</tr>
			<tr>
				<td class="label">店铺关键字：</td>
				<td>
					${res.eatery_keywords}
				</td>
			</tr>
			<tr>
				<td class="label">店铺地址：</td>
				<td>
					${res.eatery_address}
				</td>
			</tr>
			<tr>
				<td class="label">
					店铺联系电话：
				</td>
				<td>
					${res.eatery_tel}
				</td>
			</tr>
			<tr>
				<td class="label eatery_logo">店铺logo：</td>
				<td>
					<div class="img-div">
						<img src="/uploads/${res.eatery_logo}" alt="图片显示失败"/>
					</div>
				</td>
			</tr>
		`;
		this.element.find(".js-table").html( tableStr );
	},
	bindEvents: function(){
		var subBtn = this.element.find(".js-submit");
		var updateBtn = this.model.find(".js-ok");
		subBtn.on("click", $.proxy(this.handleDetailChange, this));
		updateBtn.on("click", $.proxy(this.handleDetailUpdate, this));
	},
	handleDetailChange: function(){
		$.ajax({
			type:"get",
			url:"/api/eatery_info",
			success: $.proxy(this.handleDetailChangeSuc, this)
		});
	},
	handleDetailChangeSuc: function(res){
		if(res && res.ret && res.data && res.data.eatery_info){
			var info = res.data.eatery_info;
			this.eatery_name.val(info.eatery_name);
			this.eatery_intro.val(info.eatery_intro);
			this.eatery_keywords.val(info.eatery_keywords);
			this.eatery_address.val(info.eatery_address);
			this.eatery_tel.val(info.eatery_tel);
			this.id = info._id;
		}
	},
	handleDetailUpdate: function(){
		var eatery_name = this.eatery_name.val();
		var eatery_intro = this.eatery_intro.val();
		var eatery_keywords = this.eatery_keywords.val();
		var eatery_address = this.eatery_address.val();
		var eatery_tel = this.eatery_tel.val();
		
		$.ajax({
			type:"post",
			url:"/api/eatery_update",
			data: {
				eatery_name: eatery_name,
				eatery_intro: eatery_intro,
				eatery_keywords: eatery_keywords,
				eatery_address: eatery_address,
				eatery_tel: eatery_tel,
				eatery_id: this.id
			},
			success: $.proxy(this.handleDetailUpdateSuc, this)
		});
	},
	handleDetailUpdateSuc: function(res){
		if( res && res.ret && res.data && res.data.eatery_update ){
			$(".modal-backdrop").hide();
			this.model.hide();
			this.showDetail();
			alert( "店铺信息修改成功!" );
		}else{
			alert( "对不起,店铺信息修改出现错误。" );
		}
	}
})
