function Header(headerContainer){
	this.headerContainer = headerContainer;
	this.init();
}
Header.template = `
	<div id="header">
		<div id="logo" class="left">
			<img src="/images/logo.png"/>
		</div>
		<div id="menuTop">
			<ul>
				<li class="left">
					<a href="/">
						<img src="/images/topmune_09.png"/>
						<span>后台首页</span>
					</a>
				</li>
				<li class="left">
					<a href="javascript:;">
						<img src="/images/topmune_01.png"/>
						<span>开店向导</span>
					</a>
				</li>
				<li class="left">
					<a href="javascript:;">
						<img src="/images/topmune_02.png"/>
						<span>记事本</span>
					</a>
				</li>
				<li class="left">
					<a href="javascript:;">
						<img src="/images/topmune_03.png"/>
						<span>刷新</span>
					</a>
				</li>
				<li class="left">
					<a href="javascript:;">
						<img src="/images/topmune_04.png"/>
						<span>个人设置</span>
					</a>
				</li>
				<li class="left">
					<a href="javascript:;">
						<img src="/images/topmune_05.png"/>
						<span>管理员留言</span>
					</a>
				</li>
				<li class="left">
					<a href="javascript:;">
						<img src="/images/topmune_06.png"/>
						<span>查看网店</span>
					</a>
				</li>
				<li class="left">
					<a href="javascript:;">
						<img src="/images/topmune_007.png"/>
						<span>帮助</span>
					</a>
				</li>
				<li class="left">
					<a href="javascript:;">
						<img src="/images/topmune_07.png"/>
						<span>关于Eatery</span>
					</a>
				</li>
				<li class="left">
					<a href="javascript:;">
						<img src="/images/qingchu.png"/>
						<span>清除缓存</span>
					</a>
				</li>
				<li class="left">
					<a href="/html/login.html">
						<img src="/images/topmune_08.png"/>
						<span>退出</span>
					</a>
				</li>
			</ul>
		</div>
	</div>
	<div id="nav">
		<ul>
			<li class="left">
				<a href="javascript:;">
					<img src="/images/index-11_07.png"/>
					<span>起始页</span>
				</a>
				<span class="fenge"></span>
			</li>
			<li class="left">
				<a href="javascript:;">
					<img src="/images/index-11_41.png"/>
					<span>设置导航栏</span>
				</a>
				<span class="fenge"></span>
			</li>
			<li class="left">
				<a href="javascript:;">
					<img src="/images/index-11_09.png"/>
					<span>商品管理</span>
				</a>
				<span class="fenge"></span>
			</li>
			<li class="left">
				<a href="javascript:;">
					<img src="/images/dd.png"/>
					<span>订单管理</span>
				</a>
				<span class="fenge"></span>
			</li>
			<li class="left">
				<a href="javascript:;">
					<img src="/images/index-11_13.png"/>
					<span>广告管理</span>
				</a>
				<span class="fenge"></span>
			</li>
			<li class="left">
				<a href="javascript:;">
					<img src="/images/index-11_19.png"/>
					<span>用户评论</span>
				</a>
				<span class="fenge"></span>
			</li>
			<li class="left">
				<a href="javascript:;">商品列表</a>
			</li>
			<li class="left">
				<a href="javascript:;">会员列表</a>
			</li>
			<li class="left">
				<a href="javascript:;">商店设置</a>
			</li>
			<li class="left">
				<a href="javascript:;">移动版</a>
			</li>
			<li class="left">
				<a href="javascript:;">服务市场</a>
			</li>
			<li class="left">
				<a href="javascript:;">商品回收站</a>
			</li>
			<li class="left">
				<a href="javascript:;">添加新商品</a>
			</li>
			<li class="left">
				<a href="javascript:;">商品类型</a>
			</li>
			<li class="left">
				<a href="javascript:;">权限管理</a>
			</li>
		</ul>
	</div>
`;

$.extend(Header.prototype, {
	init: function(){
		this.createDom();
	},
	createDom: function(){
		this.element = $(Header.template);
		this.headerContainer.append(this.element);
	}
})
