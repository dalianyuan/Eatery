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
			<li class="list1">
				商品管理
				<ul class="ul2">
					<li>
						<a href="/html/goods/goods_list.html">商品列表</a>
					</li>
					<li>
						<a href="/html/goods/goods_add.html">添加新商品</a>
					</li>
				</ul>
			</li>
			
			<li class="list2">
				订单管理
				<ul class="ul2">
					<li>
						<a href="/html/order/order_list.html">订单列表</a>
					</li>
				</ul>
			</li>
			
			<li class="list3">
				评论管理
				<ul class="ul2">
					<li>
						<a href="/html/comment/comment_list.html">评论列表</a>
					</li>
				</ul>
			</li>
			
			<li class="list4">
				职工管理
				<ul class="ul2">
					<li>
						<a href="/html/employee/employee_list.html">职工列表</a>
					</li>
					<li>
						<a href="/html/employee/employee_add.html">添加职工</a>
					</li>
				</ul>
			</li>
			
			<li class="list5">
				会员管理
				<ul class="ul2">
					<li>
						<a href="/html/vip/vip_list.html">会员列表</a>
					</li>
					<li>
						<a href="/html/vip/vip_add.html">添加会员</a>
					</li>
				</ul>
			</li>
			
			<li class="list6">
				店铺设置
				<ul class="ul2">
					<li>
						<a href="/html/eatery/eatery_detail.html">店铺详情</a>
					</li>
					<li>
						<a href="/html/eatery/eatery_add.html">店铺信息添加</a>
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