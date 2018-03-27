function Content(contentContainer){
	this.contentContainer = contentContainer;
	this.init();
}
Content.template = `
	<h1>
		<span class="span1 left">
			<a href="javascript:;">Eatery后台管理中心 </a>
		</span>
		<span class="span2 left">&nbsp;-&nbsp; 添加新商品</span>
		<span class="span3 left">
			<a href="javascript:;">
				<img src="/images/jnsy.png"/>
			</a>
		</span>
		<span class="span4 right">
			<a href="/html/goods/goods_list.html">商品列表</a>
		</span>
	</h1>
	
	<!--添加商品主体部分开始-->
	<div id="main">
		<div id="bar">
			<p>
				<span class="active">通用信息</span>
				<span>详细描述</span>
				<span>其他信息</span>
				<span>商品属性</span>
				<span>商品相册</span>
			</p>
		</div>
		<div id="form">
			<!--添加商品,用ajax提交数据时不需要form表单-->
			<form id="frm" action="/add_goods" method="post" enctype="multipart/form-data">
				<!--通用信息开始-->
				<table class="tableOn">
					<tr>
						<td class="label">商品名称：</td>
						<td>
							<input class="left" type="text" name="goods_name" id="goods_name"/>
							<select class="left style" name="goods_name_style">
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
							商品货号：
						</td>
						<td>
							<input type="text" id="goods_id" name="goods_id"/>
							<p class="notice">如果您不输入商品货号，系统将自动生成一个唯一的货号。</p>
						</td>
					</tr>
					<tr>
						<td class="label">商品分类：</td>
						<td>
							<select name="goods_type">
								<option value="">请选择：</option>
								<option value="ss"熟食</option>
								<option value="xb">饮品</option>
								<option value="yf">凉菜</option>
								<option value="hw">点心</option>
								<option value="dz">小食</option>
							</select>
							<a href="javascript:;" class="tianjia">添加分类</a>
							<span class="xing">*</span>
						</td>
					</tr>
					<tr>
						<td class="label">本店价格：</td>
						<td>
							<input type="text" name="goods_price" class="left" value="79"/>
							<input class="price_btn left" type="button" value="按市场价计算" />
							<span class="xing">*</span>
						</td>
					</tr>
					<tr>
						<td class="label">
							<a href="javascript:;" class="tips" title="点击此处查看提示信息">
								<img src="/images/notice.gif"/>
							</a>
							会员价格：
						</td>
						<td>
							注册用户<input class="w58" type="text" value="-1"/>
							代销用户<input class="w58" type="text" value="-1"/>
							vip<input class="w58" type="text" value="-1"/>
							<p class="notice">会员价格为-1时表示会员价按会员等级折扣率计算</p>
						</td>
					</tr>
					<tr>
						<td class="label">
							<a href="javascript:;" class="tips" title="点击此处查看提示信息">
								<img src="/images/notice.gif"/>
							</a>
							商品优惠价格：
						</td>
						<td>
							[+]优惠数量<input class="w58" type="text"/>
							优惠价格<input class="w58" type="text"/>
							<p class="notice">购买数量达到优惠数量时享受的优惠价格</p>
						</td>
					</tr>
					<tr>
						<td class="label">
							<a href="javascript:;" class="tips" title="点击此处查看提示信息">
								<img src="/images/notice.gif"/>
							</a>
							库存：
						</td>
						<td>
							<input type="text" value="21"/>
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
							<input type="text" value="0"/>
							<p class="notice">(此处需填写金额)购买该商品时最多可以使用积分的金额</p>
						</td>
					</tr>
					<tr>
						<td class="label">上传商品图片：</td>
						<td>
							<input type="file" name="pic" class="picFile" id="pic" value="未选择任何文件"/>
							<input type="text" name="goods_picUrl" class="picUrl" id="picUrl" value="商品图片外部URL"/>
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
							商品库存数量：
						</td>
						<td>
							<input id="count" name="count" type="text" value="100"/>
							<p class="notice">库存在商品为虚货或商品存在货品时为不可编辑状态，库存数值取决于其虚货数量或货品数量</p>
						</td>
					</tr>
					<tr>
						<td class="label">
							加入推荐：
						</td>
						<td>
							<p class="ck">
								<input type="checkbox" class="left" id="ck1" />
								<label class="left lab" for="ck1">精品</label>
								<input type="checkbox" class="left" id="ck2" />
								<label class="left lab" for="ck2">新品</label>
								<input type="checkbox" class="left" id="ck3" />
								<label class="left lab" for="ck3">热销</label>
							</p>
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
				
				<!--商品属性开始-->
				<table>
					<tr>
						<td class="label">
							<a href="javascript:;" class="tips" title="点击此处查看提示信息">
								<img src="/images/notice.gif"/>
							</a>
							商品类型：
						</td>
						<td>
							<select name="">
								<option value="">请选择商品类型</option>
								<option value="ss">首饰</option>
								<option value="xb">箱包</option>
								<option value="yf">衣服</option>
								<option value="hw">户外</option>
								<option value="dz">电子产品</option>
							</select>
							<p class="notice">请选择商品的所属类型，进而完善此商品的属性</p>
						</td>
					</tr>
				</table>
				<!--商品属性结束-->
				
				<!--商品相册开始-->
				<table>
					<tr>
						<td class="label">上传文件：</td>
						<td>
							<input type="file" class="picFile" id="pic" value="未选择任何文件"/>
							<br/>
							<input type="text" class="picUrl" id="picUrl" value="或者输入图片外部URL"/>
						</td>
					</tr>
					<tr>
						<td class="label">
							图片描述：
						</td>
						<td>
							<textarea name="" rows="7" cols="42"></textarea>
						</td>
					</tr>
				</table>	
				<!--商品相册结束-->
				
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
