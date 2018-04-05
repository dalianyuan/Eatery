function Menu(menuContainer){
	this.menuContainer = menuContainer;
	this.init();
}

Menu.template =`
	<div id="menuBar">
		<p>
			<span class="tab">导航菜单</span>
		</p>
	</div>
	<div id="menu">
		<ul id="menu-ul">
			<li class="list1 special">
				商品管理
				<ul class="ul2">
					<li>
						<a href="/html/goods/goods_list.html">商品列表</a>
					</li>
					<li>
						<a href="/html/goods/goods_add.html">添加新商品</a>
					</li>
					<li>
						<a href="javascript:;">商品分类</a>
					</li>
					<li>
						<a href="javascript:;">用户评论</a>
					</li>
					<li>
						<a href="javascript:;">图片批量处理</a>
					</li>
					<li>
						<a href="javascript:;">商品批量上传</a>
					</li>
				</ul>
			</li>
			<li class="list2">
				促销管理
				<ul class="ul2">
					<li>
						<a href="javascript:;">夺宝奇兵</a>
					</li>
					<li>
						<a href="javascript:;">红包类型</a>
					</li>
					<li>
						<a href="javascript:;">商品包装</a>
					</li>
					<li>
						<a href="javascript:;">祝福贺卡</a>
					</li>
					<li>
						<a href="javascript:;">团购活动</a>
					</li>
					<li>
						<a href="javascript:;">专题管理</a>
					</li>
					<li>
						<a href="javascript:;">拍卖活动</a>
					</li>
					<li>
						<a href="javascript:;">优惠活动</a>
					</li>
					<li>
						<a href="javascript:;">批发管理</a>
					</li>
					<li>
						<a href="javascript:;">超值礼包</a>
					</li>
					<li>
						<a href="javascript:;">积分商城商品</a>
					</li>
				</ul>
			</li>
			<li class="list3 special">
				订单管理
				<ul class="ul2">
					<li>
						<a href="/html/order/order_list.html">订单列表</a>
					</li>
					<li>
						<a href="javascript:;">订单打印</a>
					</li>
					<li>
						<a href="javascript:;">缺货登记</a>
					</li>
					<li>
						<a href="javascript:;">发货单列表</a>
					</li>
					<li>
						<a href="javascript:;">退货单列表</a>
					</li>
				</ul>
			</li>
			<li class="list4">
				广告管理
				<ul class="ul2">
					<li>
						<a href="javascript:;">广告列表</a>
					</li>
					<li>
						<a href="javascript:;">广告位置</a>
					</li>
				</ul>
			</li>
			<li class="list5 special">
				职工管理
				<ul class="ul2">
					<li>
						<a href="/html/employee/employee_list.html">职工列表</a>
					</li>
					<li>
						<a href="/html/employee/employee_add.html">添加职工</a>
					</li>
					<li>
						<a href="javascript:;">销售概况</a>
					</li>
					<li>
						<a href="javascript:;">销售明细</a>
					</li>
				</ul>
			</li>
			<li class="list6">
				文章管理
				<ul class="ul2">
					<li>
						<a href="javascript:;">文章分类</a>
					</li>
				</ul>
			</li>
			<li class="list7 special">
				会员管理
				<ul class="ul2">
					<li>
						<a href="/html/vip/vip_list.html">会员列表</a>
					</li>
					<li>
						<a href="/html/vip/vip_add.html">添加会员</a>
					</li>
					<li>
						<a href="javascript:;">会员等级</a>
					</li>
					<li>
						<a href="javascript:;">会员留言</a>
					</li>
					<li>
						<a href="javascript:;">充值和提现申请</a>
					</li>
					<li>
						<a href="javascript:;">资金管理</a>
					</li>
				</ul>
			</li>
			<li class="list8">
				权限管理
				<ul class="ul2">
					<li>
						<a href="javascript:;">管理员列表</a>
					</li>
					<li>
						<a href="javascript:;">供货商列表</a>
					</li>
				</ul>
			</li>
			<li class="list9 special">
				店铺设置
				<ul class="ul2">
					<li>
						<a href="/html/eatery/eatery_add.html">店铺详情</a>
					</li>
					<li>
						<a href="javascript:;">配送方式</a>
					</li>
					<li>
						<a href="javascript:;">地区列表</a>
					</li>
					<li>
						<a href="javascript:;">友情链接</a>
					</li>
				</ul>
			</li>
			<li class="list10">
				数据库管理
				<ul class="ul2">
					<li>
						<a href="javascript:;">数据备份</a>
					</li>
					<li>
						<a href="javascript:;">数据表优化</a>
					</li>
				</ul>
			</li>
		</ul>
	</div>
`;

$.extend(Menu.prototype, {
	init: function(){
		this.createDom();
		this.bindEvents();
	},
	createDom: function(){
		this.element = $(Menu.template);
		this.menuContainer.append(this.element);
	},
	bindEvents: function(){
		var allLists = this.element.find("li");
		var lists = this.element.find("#menu-ul>li");
		allLists.on("click", this.handleStopLiClick);
		lists.on("click", this.handleListsClick);
		lists.on("hover", this.handleListsHover);
	},
	handleStopLiClick: function(e){
		var e = e || event;
		e.stopPropagation();
	},
	handleListsClick: function(){
		var picIndex = $(this).index() + 1;
		if( $(this).children("ul").css("display") == "none"	){
			$(this).css("background","#454545 url(/images/menu1_"+ picIndex +".png) 9px 0 no-repeat");
		}else{
			$(this).css("background","#575757 url(/images/menu_"+ picIndex +".png) 9px 0 no-repeat");
		}
		$(this).children("ul").toggle();
	},
	handleListsHover: function(){
		$( this ).css( "background-color", "#454545" ).siblings().css( "background-color", "#575757" );
	}
})