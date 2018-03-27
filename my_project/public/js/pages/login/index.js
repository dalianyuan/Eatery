function Login(){
	
}

Login.template = `
	<h1 id="title">
		Eatery后台管理系统
	</h1>
	<form class="form-horizontal">
		<div class="form-group">
			<div class="col-sm-12">
				<input type="email" class="form-control js-user" id="inputEmail3" placeholder="用户名">
			</div>
			<div class="col-sm-12 tips js-user-tips">
			</div>
		</div>
		<div class="form-group">
			<div class="col-sm-12">
				<input type="password" class="form-control js-psw" id="inputPassword3" placeholder="密码">
			</div>
			<div class="col-sm-12 tips js-psw-tips">
			</div>
		</div>
		<div class="form-group">
			<div class="col-sm-12">
				<div class="btn js-submit">
					登录
				</div>
			</div>
		</div>
	</form>
`;

$.extend(Login.prototype, {
	init: function(){
		this.createDom();
		this.bindEvent();
	},
	createDom: function(){
		var Container = $(".js-container");
		this.element = $(Login.template);
		Container.append( this.element );
	},
	bindEvent: function(){
		var subBtn = $(".js-submit");
		//$.proxy(this.handleSubBtn, this)
		//可以让handleSubBtn中的this指向Regist这个对象
		subBtn.on("click", $.proxy(this.handleSubBtn, this));
	},
	handleSubBtn: function(){
		var username = $(".js-user").val();
		var password = $(".js-psw").val();
		$.ajax({
			url: "/api/login",
			type: "post",
			data: {
				username: username,
				password: password
			},
			success: $.proxy(this.handleLogSuc, this)
		})
	},
	handleLogSuc: function(res){
//		console.log( res );
		if( res && res.ret && res.data && res.data.login ){
			alert( "登录成功,即将跳转到后台主页" );
			location.href = "/";
		}else{
			alert( "您的用户名或密码错误,请重新输入。" );
		}
	}
});