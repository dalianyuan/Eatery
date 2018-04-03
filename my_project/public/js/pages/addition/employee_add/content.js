function Content(contentContainer){
	this.contentContainer = contentContainer;
	this.init();
}
Content.template = `
	<h1>
		<span class="span1 left">
			<a href="javascript:;">Eatery后台管理中心 </a>
		</span>
		<span class="span2 left">&nbsp;-&nbsp; 添加新职工</span>
		<span class="span3 left">
			<a href="javascript:;">
				<img src="/images/jnsy.png"/>
			</a>
		</span>
		<span class="span4 right">
			<a href="/html/employee/employee_list.html">职工列表</a>
		</span>
	</h1>
	
	<!--添加职工主体部分开始-->
	<div id="main">
		<div id="bar">
			<p>
				<span class="active">职工信息</span>
				<span>职工相册</span>
			</p>
		</div>
		<div id="form">
			<!--添加职工,用ajax提交数据时不需要form表单-->
				<!--职工信息开始-->
				<table class="tableOn">
					<tr>
						<td class="label">
							<a href="javascript:;" class="tips" title="点击此处查看提示信息">
								<img src="/images/notice.gif"/>
							</a>
							职工号：
						</td>
						<td>
							<input type="text" id="employee_id" name="employee_id"/>
							<p class="notice">请务必输入正确的职工号。</p>
						</td>
					</tr>
					<tr>
						<td class="label">职工姓名：</td>
						<td>
							<input class="left" type="text" name="employee_name" id="employee_name"/>
							<select class="left style" name="employee_name_style">
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
							职工性别：
						</td>
						<td>
							<input type="text" id="employee_sex" name="employee_sex"/>
						</td>
					</tr>
					<tr>
						<td class="label">
							出生年月：
						</td>
						<td>
							<input type="text" id="employee_birth" name="employee_birth"/>
						</td>
					</tr>
					<tr>
						<td class="label">
							家庭住址：
						</td>
						<td>
							<input type="text" id="employee_address" name="employee_address"/>
						</td>
					</tr>
					<tr>
						<td class="label">
							联系电话：
						</td>
						<td>
							<input type="text" id="employee_tel" name="employee_tel"/>
						</td>
					</tr>
					<tr>
						<td class="label">职工职位：</td>
						<td>
							<select id="employee_type" name="employee_type">
								<option value="">请选择：</option>
								<option value="manager">店长</option>
								<option value="chef">主厨</option>
								<option value="zhuli">主厨助理</option>
								<option value="waiter">服务员</option>
								<option value="delivery">送餐员</option>
								<option value="cleaner">保洁人员</option>
							</select>
							<a href="javascript:;" class="tianjia">添加分类</a>
							<span class="xing">*</span>
						</td>
					</tr>
					<tr>
						<td class="label">职工薪水：</td>
						<td>
							<input type="text" name="employee_salary" id="employee_salary" value="9999"/>
							<a href="javascript:;" class="tianjia">以元为单位</a>
						</td>
					</tr>
					<tr>
						<td class="label">
							参加工作时间：
						</td>
						<td>
							<input type="text" id="employee_time" name="employee_time"/>
						</td>
					</tr>
					<tr>
						<td class="label">上传职工图片：</td>
						<td>
							<input type="file" id="employee_pic" name="employee_pic" class="picFile" id="pic" value="未选择任何文件"/>
						</td>
					</tr>
				</table>
				<!--职工信息结束-->
				
				<!--职工相册开始-->
				<table>
					<tr>
						<td class="label">上传文件：</td>
						<td>
							<input type="file" class="picFile" id="pic" value="未选择任何文件"/>
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
				<!--职工相册结束-->
				
				<!--确定和重置按钮-->
				<div id="subBtn">
					<button class="btn" id="btnOk" onclick="addemployee()">确定</button>
					<button class="btn">重置</button>
				</div>
		</div>
	</div>
	<!--添加职工主体部分结束-->
	
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
		var employee_id = this.element.find("#employee_id").val();
		var employee_name = this.element.find("#employee_name").val();
		var employee_sex = this.element.find("#employee_sex").val();
		var employee_birth = this.element.find("#employee_birth").val();
		var employee_address = this.element.find("#employee_address").val();
		var employee_tel = this.element.find("#employee_tel").val();
		var employee_type = this.element.find("#employee_type").val();
		var employee_salary = this.element.find("#employee_salary").val();
		var employee_time = this.element.find("#employee_time").val();
		var employee_pic = this.element.find("#employee_pic")[0].files[0];
		
		var formData = new FormData();
		formData.append( "employee_id", employee_id );
		formData.append( "employee_name", employee_name );
		formData.append( "employee_sex", employee_sex );
		formData.append( "employee_birth", employee_birth );
		formData.append( "employee_address", employee_address );
		formData.append( "employee_tel", employee_tel );
		formData.append( "employee_type", employee_type );
		formData.append( "employee_salary", employee_salary );
		formData.append( "employee_time", employee_time );
		formData.append( "employee_pic", employee_pic );
		
		$.ajax({
			type:"post",
			url:"/api/employee_add",
			cache: false,
			processData: false,
			contentType: false,
			data: formData,
			success: $.proxy(this.handleEmployeeAddSuc, this)
		});
	},
	handleEmployeeAddSuc: function(res){
		console.log(res)
		if( res && res.ret && res.data && res.data.goods_add ){
			if( !confirm( "职工添加成功!点击确定继续添加职工,点击取消将跳转到职工列表页。" ) ){
				location.href = "/html/employee/employee_list.html";
			}else{
				this.element.find("#employee_name").val("");
			}
		}else{
			alert( "对不起,您添加的职工已存在。继续添加下一个吧~" );
		}
	}
})
