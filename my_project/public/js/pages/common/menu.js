function Menu(menuContainer){
	this.menuContainer = menuContainer;
	this.init();
}

Menu.template =`
	<div id="bar">
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
						<a href="/html/goods_list.html">商品列表</a>
					</li>
					<li>
						<a href="goodsAdd">添加新商品</a>
					</li>
					<li>
						<a href="javascript:;">商品分类</a>
					</li>
					<li>
						<a href="javascript:;">用户评论</a>
					</li>
					<li>
						<a href="javascript:;">商品品牌</a>
					</li>
					<li>
						<a href="javascript:;">商品回收站</a>
					</li>
					<li>
						<a href="javascript:;">图片批量处理</a>
					</li>
					<li>
						<a href="javascript:;">生成商品代码</a>
					</li>
					<li>
						<a href="javascript:;">标签管理</a>
					</li>
					<li>
						<a href="javascript:;">商品批量上传</a>
					</li>
					<li>
						<a href="javascript:;">虚拟商品列表</a>
					</li>
					<li>
						<a href="javascript:;">更改加密串</a>
					</li>
					<li>
						<a href="javascript:;">商品自动上下架</a>
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
			<li class="list3">
				订单管理
				<ul class="ul2">
					<li>
						<a href="orderList">订单列表</a>
					</li>
					<li>
						<a href="javascript:;">订单查询</a>
					</li>
					<li>
						<a href="javascript:;">合并订单</a>
					</li>
					<li>
						<a href="javascript:;">订单打印</a>
					</li>
					<li>
						<a href="javascript:;">缺货登记</a>
					</li>
					<li>
						<a href="javascript:;">添加订单</a>
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
			<li class="list5">
				报表统计
				<ul class="ul2">
					<li>
						<a href="javascript:;">流量分析</a>
					</li>
					<li>
						<a href="javascript:;">客户统计</a>
					</li>
					<li>
						<a href="javascript:;">订单统计</a>
					</li>
					<li>
						<a href="javascript:;">销售概况</a>
					</li>
					<li>
						<a href="javascript:;">会员排行</a>
					</li>
					<li>
						<a href="javascript:;">销售明细</a>
					</li>
					<li>
						<a href="javascript:;">搜索引擎</a>
					</li>
					<li>
						<a href="javascript:;">销售排行</a>
					</li>
					<li>
						<a href="javascript:;">访问购买率</a>
					</li>
					<li>
						<a href="javascript:;">站外投放JS</a>
					</li>
				</ul>
			</li>
			<li class="list6">
				文章管理
				<ul class="ul2">
					<li>
						<a href="javascript:;">文章分类</a>
					</li>
					<li>
						<a href="javascript:;">文章列表</a>
					</li>
					<li>
						<a href="javascript:;">文章自动发布</a>
					</li>
					<li>
						<a href="javascript:;">在线调查</a>
					</li>
				</ul>
			</li>
			<li class="list7">
				会员管理
				<ul class="ul2">
					<li>
						<a href="vipList">会员列表</a>
					</li>
					<li>
						<a href="vipAdd">添加会员</a>
					</li>
					<li>
						<a href="javascript:;">会员等级</a>
					</li>
					<li>
						<a href="javascript:;">会员整合</a>
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
						<a href="javascript:;">管理员日志</a>
					</li>
					<li>
						<a href="javascript:;">角色管理</a>
					</li>
					<li>
						<a href="javascript:;">办事处列表</a>
					</li>
					<li>
						<a href="javascript:;">供货商列表</a>
					</li>
				</ul>
			</li>
			<li class="list9">
				店铺设置
				<ul class="ul2">
					<li>
						<a href="javascript:;">店铺详情</a>
					</li>
					<li>
						<a href="javascript:;">修改信息</a>
					</li>
					<li>
						<a href="javascript:;">支付方式</a>
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
					<li>
						<a href="javascript:;">文件校验</a>
					</li>
					<li>
						<a href="javascript:;">首页主广告管理</a>
					</li>
					<li>
						<a href="javascript:;">授权证书</a>
					</li>
					<li>
						<a href="javascript:;">站点地图</a>
					</li>
				</ul>
			</li>
			<li class="list10">
				模板管理
				<ul class="ul2">
					<li>
						<a href="javascript:;">模板选择</a>
					</li>
					<li>
						<a href="javascript:;">设置模板</a>
					</li>
					<li>
						<a href="javascript:;">库项目管理</a>
					</li>
					<li>
						<a href="javascript:;">语言项编辑</a>
					</li>
					<li>
						<a href="javascript:;">模板设置备份</a>
					</li>
					<li>
						<a href="javascript:;">邮件模板</a>
					</li>
				</ul>
			</li>
			<li class="list11">
				数据库管理
				<ul class="ul2">
					<li>
						<a href="javascript:;">数据备份</a>
					</li>
					<li>
						<a href="javascript:;">数据表优化</a>
					</li>
					<li>
						<a href="javascript:;">SQL查询</a>
					</li>
				</ul>
			</li>
			<li class="list12">
				短信管理
				<ul class="ul2">
					<li>
						<a href="javascript:;">发送短信</a>
					</li>
					<li>
						<a href="javascript:;">短信签名</a>
					</li>
				</ul>
			</li>
			<li class="list13">
				推荐管理
				<ul class="ul2">
					<li>
						<a href="javascript:;">推荐设置</a>
					</li>
					<li>
						<a href="javascript:;">分成管理</a>
					</li>
				</ul>
			</li>
			<li class="list14">
				移动版管理
				<ul class="ul2">
					<li>
						<a href="javascript:;">邮件订阅管理</a>
					</li>
					<li>
						<a href="javascript:;">关注管理</a>
					</li>
				</ul>
			</li>
		</ul>
	</div>
`;

$.extend(Menu.prototype, {
	init: function(){
		this.createDom();
		this.handleClickMenu();
	},
	createDom: function(){
		this.element = $(Menu.template);
		this.menuContainer.append(this.element);
	},
	handleClickMenu: function(){
		$("li").click(function(e){
			var e = e || event;
			e.stopPropagation();
		})
		$( "#menu-ul>li" ).click( function(){
			var picIndex = $(this).index() + 1;
			if( $(this).children("ul").css("display") == "none"	){
				$(this).css("background","#454545 url(/images/menu1_"+ picIndex +".png) 9px 0 no-repeat");
			}else{
				$(this).css("background","#575757 url(/images/menu_"+ picIndex +".png) 9px 0 no-repeat");
			}
			$(this).children("ul").toggle();
		} )
		$( "#menu-ul>li" ).hover(function(){
			$( this ).css( "background-color", "#454545" ).siblings().css( "background-color", "#575757" );
		})
	}
})