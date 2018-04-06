function Content(contentContainer){
	this.contentContainer = contentContainer;
	this.init();
}
Content.template = `
	<!--店铺详情title开始-->
	<h1>
		<span class="span1 left">
			<a href="javascript:;">Eatery后台管理中心 </a>
		</span>
		<span class="span2 left">&nbsp;-&nbsp; 店铺信息添加</span>
	</h1>
	<!--店铺详情title结束-->

	<!--添加店铺主体部分开始-->
	<div id="main">
		<div id="bar">
			<p>
				<span class="active">店铺信息</span>
			</p>
		</div>
		<div id="form">
			<!--添加店铺,用ajax提交数据时不需要form表单-->
			
				<!--店铺信息开始-->
				<table class="tableOn">
					<tr>
						<td class="label">店铺名称：</td>
						<td>
							<input class="left eatery_name" type="text" value="Eatery" id="eatery_name"/>
							<span class="xing">*</span>
						</td>
					</tr>
					<tr>
						<td class="label">
							<a href="javascript:;" class="tips" title="点击此处查看提示信息">
								<img src="/images/notice.gif"/>
							</a>
							店铺简介：
						</td>
						<td>
							<textarea id="eatery_intro">一家只会做健康绿色食物的小eatery</textarea>
						</td>
					</tr>
					<tr>
						<td class="label">店铺关键字：</td>
						<td>
							<input type="text" id="eatery_keywords" class="left eatery_keywords" value="绿色,美味"/>
						</td>
					</tr>
					<tr>
						<td class="label">店铺地址：</td>
						<td>
							<input type="text" id="eatery_address" class="left eatery_address" value="北京市西城区"/>
						</td>
					</tr>
					<tr>
						<td class="label">
							<a href="javascript:;" class="tips" title="点击此处查看提示信息">
								<img src="/images/notice.gif"/>
							</a>
							店铺联系电话：
						</td>
						<td>
							<input type="text" id="eatery_tel" class="left eatery_tel" value="17604062617"/>
						</td>
					</tr>
					<tr>
						<td class="label">上传店铺logo：</td>
						<td>
							<input type="file" class="picFile" name="eatery_logo" id="eatery_logo" value="未选择任何文件"/>
						</td>
					</tr>
				</table>
				<!--通用信息结束-->
				
				<!--确定和重置按钮-->
				<div id="subBtn">
					<button class="btn js-submit" id="btnOk">确定</button>
					<button class="btn">重置</button>
				</div>
			
		</div>
	</div>
	<!--添加店铺主体部分结束-->

	<!--店铺详情底部开始-->
	<div id="footer">
		共执行 9 个查询，用时 0.024190 秒，Gzip 已禁用，内存占用 3.580 MB <br/> 版权所有 © 2005-2018 上海商派软件有限公司，并保留所有权利。
	</div>
	<!--店铺详情底部结束-->
`;

$.extend(Content.prototype, {
	init: function(){
		this.createDom();
		this.bindEvents();
	},
	createDom: function(){
		this.element = $(Content.template);
		this.contentContainer.append(this.element);
	},
	bindEvents: function(){
		var subBtn = this.element.find(".js-submit");
		subBtn.on("click", $.proxy(this.handleSubClick, this));
	},
	handleSubClick: function(){
		var eatery_name = this.element.find("#eatery_name").val();
		var eatery_intro = this.element.find("#eatery_intro").val();
		var eatery_keywords = this.element.find("#eatery_keywords").val();
		var eatery_address = this.element.find("#eatery_address").val();
		var eatery_tel = this.element.find("#eatery_tel").val();
		var eatery_logo = this.element.find("#eatery_logo")[0].files[0];
		
		var formData = new FormData();
		formData.append( "eatery_name", eatery_name );
		formData.append( "eatery_intro", eatery_intro );
		formData.append( "eatery_keywords", eatery_keywords );
		formData.append( "eatery_address", eatery_address );
		formData.append( "eatery_tel", eatery_tel );
		formData.append( "eatery_logo", eatery_logo );
		
		$.ajax({
			type:"post",
			url:"/api/eatery_add",
			cache: false,
			processData: false,
			contentType: false,
			data: formData,
			success: $.proxy(this.handleDetailAddSuc, this)
		});
	},
	handleDetailAddSuc: function(res){
		if( res && res.ret && res.data && res.data.eatery_add ){
			alert( "店铺信息添加成功,即将跳转到店铺详情页~" );
			location.href = "/html/eatery/eatery_detail.html";
		}else{
			alert( "对不起,店铺信息添加失败!" );
		}
	}
})
