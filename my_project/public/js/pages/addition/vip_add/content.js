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
			<form id="frm" action="/add_vip" method="post" enctype="multipart/form-data">
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
							<select name="vip_grade">
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
							<input type="text" name="vip_email" class="left" value=""/>
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
							<input type="text" name="vip_ok" class="left" value="是"/>
						</td>
					</tr>
					<tr>
						<td class="label">
							等级积分：
						</td>
						<td>
							<input type="text" value="900"/>
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
							<input type="text" value="700"/>
							<p class="notice">(此处需填写金额)购买该商品时最多可以使用积分的金额</p>
						</td>
					</tr>
					<tr>
						<td class="label">
							注册时间：
						</td>
						<td>
							<input type="text" value=""/>
							<p class="notice">购买该商品时赠送消费积分数,-1表示按商品价格赠送</p>
						</td>
					</tr>
					<tr>
						<td class="label">上传vip认证照：</td>
						<td>
							<input type="file" name="pic" class="picFile" id="pic" value="未选择任何文件"/>
							<img src="/images/no.gif"/><br/>
							<input type="text" name="vip_picUrl" class="picUrl" id="picUrl" value="商品图片外部URL"/>
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
					<button class="btn" id="btnOk" onclick="addGoods()">确定</button>
					<button class="btn">重置</button>
				</div>
			</form>
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
	}
})
