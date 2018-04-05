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
		<span class="span2 left">&nbsp;-&nbsp; 店铺详情</span>
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
							<input class="left" type="text" name="eatery_name" id="eatery_name"/>
							<span class="xing">*</span>
						</td>
					</tr>
					<tr>
						<td class="label">
							<a href="javascript:;" class="tips" title="点击此处查看提示信息">
								<img src="/images/notice.gif"/>
							</a>
							店铺描述：
						</td>
						<td>
							<textarea>一家只会做健康绿色食物的小eatery</textarea>
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
							<input type="file" class="picFile" name="eatery_pic" id="eatery_pic" value="未选择任何文件"/>
						</td>
					</tr>
					<tr>
						<td class="label">上传店铺认证照：</td>
						<td>
							<input type="file" class="picFile" name="eatery_pic" id="eatery_pic" value="未选择任何文件"/>
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

Content.ModelTemplate = `
	<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="exampleModalLabel">修改店铺详情信息</h4>
	      </div>
	      <div class="modal-body">
	        <form>
	          <div class="form-group">
	            <label for="recipient-name" class="control-label">店铺详情姓名:</label>
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
	},
	createDom: function(){
		this.element = $(Content.template);
		this.model = $(Content.ModelTemplate);
		this.contentContainer.append(this.element);
		this.contentContainer.append(this.model);
	}
})
