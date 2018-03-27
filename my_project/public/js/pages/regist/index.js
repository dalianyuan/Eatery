function Regist(){
	
}

Regist.template = `
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
				<input type="password" class="form-control js-psw" id="inputPassword3" placeholder="请设置6-12位密码">
			</div>
			<div class="col-sm-12 tips js-psw-tips">
			</div>
		</div>
		<div class="form-group">
			<div class="col-sm-12">
				<div class="btn js-submit">
					注 册
				</div>
			</div>
		</div>
	</form>
`;

$.extend(Regist.prototype, {
	userFlag: false,
	pswFlag: false,
	init: function(){
		this.createDom();
		this.bindEvent();
	},
	
	createDom: function(){
		var Container = $(".js-container");
		this.element = $(Regist.template);
		Container.append( this.element );
	},
	
	bindEvent: function(){
		var userIpt = $(".js-user");
		var pswIpt = $(".js-psw");
		var subBtn = $(".js-submit");
		userIpt.on("blur", $.proxy(this.handleUserBlur, this));
		pswIpt.on("blur", $.proxy(this.handlePswBlur, this));
		//$.proxy(this.handleSubBtn, this)
		//可以让handleSubBtn中的this指向Regist这个对象
		subBtn.on("click", $.proxy(this.handleSubBtn, this));
	},
	
	handleUserBlur: function(){
		var username = $(".js-user").val();
		var userTips = $(".js-user-tips");
		if( username.length < 4 ){
			userTips.addClass("tipsNo").removeClass("tipsOk");
			userTips.html("用户名至少由4位字符组成!");
			this.userFlag = false;
		}else{
			userTips.addClass("tipsOk").removeClass("tipsNo");
			userTips.html("用户名符合要求。");
			this.userFlag = true;
		}
	},
	
	handlePswBlur: function(){
		var password = $(".js-psw").val();
		var pswTips = $(".js-psw-tips");
		if( password.length < 6 ){
			pswTips.addClass("tipsNo").removeClass("tipsOk");
			pswTips.html("密码至少由6位字符组成!");
			this.pswFlag = false;
		}else{
			pswTips.addClass("tipsOk").removeClass("tipsNo");
			pswTips.html("密码符合要求。");
			this.pswFlag = true;
		}
	},
	
	handleSubBtn: function(){
		if( !(this.userFlag && this.pswFlag) ){
			alert( "请输入规范的用户名或密码" );
			return;
		}
		var username = $(".js-user").val();
		var password = $(".js-psw").val();
		$.ajax({
			url: "/api/regist",
			type: "post",
			data: {
				username: username,
				password: password
			},
			success: $.proxy(this.handleRegSuc, this)
		})
	},
	
	handleRegSuc: function(res){
//		console.log( res );
		if( res && res.ret && res.data && res.data.regist ){
			alert( "管理员注册成功,即将跳转到登录页面" );
			location.href = "/html/login.html";
		}else{
			alert( "对不起,你注册的用户名已存在。换一个吧~" );
			$(".js-user-tips").html("");
			$(".js-psw-tips").html("");
		}
	}
});