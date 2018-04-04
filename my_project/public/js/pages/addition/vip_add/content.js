function Content(contentContainer){
	this.contentContainer = contentContainer;
	this.init();
}
Content.template = `
	<h1>
		<span class="span1 left">
			<a href="javascript:;">Eatery后台管理中心 </a>
		</span>
		<span class="span2 left">&nbsp;-&nbsp; 添加新会员</span>
		<span class="span3 left">
			<a href="javascript:;">
				<img src="/images/jnsy.png"/>
			</a>
		</span>
		<span class="span4 right">
			<a href="/html/vip/vip_list.html">会员列表</a>
		</span>
	</h1>
	
	<!--添加商品主体部分开始-->
	<div id="main">
		<div id="bar">
			<p>
				<span class="active">通用信息</span>
				<span>详细描述</span>
				<span>其他信息</span>
			</p>
		</div>
		<div id="form">
			<!--添加商品,用ajax提交数据时不需要form表单-->
				<!--通用信息开始-->
				<table class="tableOn">
					<tr>
						<td class="label">会员编号：</td>
						<td>
							<input class="left" type="text" name="vip_num" id="vip_num"/>
							<select class="left style" name="vip_num_style">
								<option value="">字体样式</option>
								<option value="strong">加粗</option>
								<option value="em">斜体</option>
								<option value="u">下划线</option>
								<option value="del">删除线</option>
							</select>
							<span class="xing">*</span>
						</td>
					</tr>
					<tr>
						<td class="label">
							<a href="javascript:;" class="tips" title="点击此处查看提示信息">
								<img src="/images/notice.gif"/>
							</a>
							会员名称：
						</td>
						<td>
							<input type="text" id="vip_name" name="vip_name"/>
							<p class="notice">必填项哦！</p>
						</td>
					</tr>
					<tr>
						<td class="label">会员等级：</td>
						<td>
							<select name="vip_level" id="vip_level">
								<option value="">请选择：</option>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
							</select>
							<a href="javascript:;" class="tianjia">添加等级</a>
							<span class="xing">*</span>
						</td>
					</tr>
					<tr>
						<td class="label">电子邮箱：</td>
						<td>
							<input type="text" id="vip_email" class="left" value=""/>
							<span class="xing">*</span>
						</td>
					</tr>
					<tr>
						<td class="label">
							<a href="javascript:;" class="tips" title="点击此处查看提示信息">
								<img src="/images/notice.gif"/>
							</a>
							是否认证：
						</td>
						<td>
							<label><input type="radio" name="vip_ok" id="vip_ok" class="left vip_ok" value="是" checked/><span class="left vip">是</span></label>
							<label><input type="radio" name="vip_ok" id="vip_ok" class="left vip_ok" value="否"/><span class="left">否</span></label>
						</td>
					</tr>
					<tr>
						<td class="label">
							等级积分：
						</td>
						<td>
							<input id="vip_grade" type="text" value="900"/>
						</td>
					</tr>
					<tr>
						<td class="label">
							<a href="javascript:;" class="tips" title="点击此处查看提示信息">
								<img src="/images/notice.gif"/>
							</a>
							积分购买金额：
						</td>
						<td>
							<input id="vip_money" type="text" value="700"/>
							<p class="notice">(此处需填写金额)购买该商品时最多可以使用积分的金额</p>
						</td>
					</tr>
				</table>
				<!--通用信息结束-->
				
				<!--详细描述开始-->
				<table>
					<tr><td>
						<textarea id="detail"></textarea>
					</td></tr>
				</table>
				<!--详细描述结束-->
				
				<!--其他信息开始-->
				<table>
					<tr>
						<td class="label">
							<a href="javascript:;" class="tips" title="点击此处查看提示信息">
								<img src="/images/notice.gif"/>
							</a>
							会员优惠商品：
						</td>
						<td>
							<input id="count" name="count" type="text" value=""/>
						</td>
					</tr>
					<tr>
						<td class="label">
							<a href="javascript:;" class="tips" title="点击此处查看提示信息">
								<img src="/images/notice.gif"/>
							</a>
							商品简单描述：
						</td>
						<td>
							<textarea name="" rows="7" cols="42"></textarea>
						</td>
					</tr>
				</table>
				<!--其他信息结束-->
				
				<!--确定和重置按钮-->
				<div id="subBtn">
					<button class="btn js-submit" id="btnOk" >确定</button>
					<button class="btn">重置</button>
				</div>
		</div>
	</div>
	<!--添加商品主体部分结束-->
	
	<div id="footer">
		共执行 9 个查询，用时 0.024190 秒，Gzip 已禁用，内存占用 3.580 MB <br/>
		版权所有 © 2005-2018 上海商派软件有限公司，并保留所有权利。
	</div>
`;

$.extend(Content.prototype, {
	init: function(){
		this.createDom();
		this.tabChange();
		this.bindEvents();
	},
	createDom: function(){
		this.element = $(Content.template);
		this.contentContainer.append(this.element);
	},
	tabChange: function(){
		//tab切换
		$( "#bar span" ).click( function(){
			var index = $(this).index();
			$(this).addClass("active").siblings().removeClass("active");
			$("#form table").eq(index).addClass("tableOn").siblings().removeClass("tableOn");
		} )
		
		/*点击查看提示信息*/
		$( ".tips" ).click( function(){
			$( this ).parent().parent().find( ".notice" ).toggle();
		} )
	},
	bindEvents: function(){
		var subBtn = this.element.find(".js-submit");
		subBtn.on("click", $.proxy(this.handleSubClick, this));
	},
	handleSubClick: function(){
		$.ajax({
			type:"post",
			url:"/api/vip_add",
			data: {
				vip_num: this.element.find("#vip_num").val(),
				vip_name: this.element.find("#vip_name").val(),
				vip_email: this.element.find("#vip_email").val(),
				vip_ok: this.element.find("#vip_ok").prop("checked"),
				vip_money: this.element.find("#vip_money").val(),
				vip_grade: this.element.find("#vip_grade").val()
			},
			success: $.proxy(this.handleVipAddSuc, this)
		});
	},
	handleVipAddSuc: function(res){
		if( res && res.ret && res.data && res.data.vip_add ){
			if( !confirm( "会员添加成功!点击确定继续添加会员,点击取消将跳转到会员列表页。" ) ){
				location.href = "/html/vip/vip_list.html";
			}
		}else{
			alert( "对不起,该会员已存在。继续添加下一个吧~" );
		}
	}
})
