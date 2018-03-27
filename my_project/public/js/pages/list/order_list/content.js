function Content(contentContainer){
	this.contentContainer = contentContainer;
	this.init();
}
Content.template = `
	<!--商品列表title开始-->
	<h1>
		<span class="span1 left">
			<a href="javascript:;">Eatery后台管理中心 </a>
		</span>
		<span class="span2 left">&nbsp;-&nbsp; 订单列表</span>
		<span class="span3 left">
			<a href="javascript:;">
				<img src="/images/jnsy.png"/>
			</a>
		</span>
		<span class="span4 right">
			<a href="javascript:;">新订单</a>
		</span>
	</h1>
	<!--商品列表title结束-->

	<!--商品列表搜索栏开始-->
	<div id="form-div">
		<!--<form id="form" action="/search_goods" method="post" enctype="multipart/form-data">-->
			<img src="/images/icon_search.gif" />
			<select name="type">
				<option value="">所有分类</option>
				<option value="">川菜</option>
				<option value="">东北炖菜</option>
			</select>
			<select name="mark">
				<option value="">地区</option>
				<option value="">北京</option>
				<option value="">大连</option>
			</select>
			<select name="all">
				<option value="">全部</option>
				<option value="">新品</option>
				<option value="">精品</option>
				<option value="">热销</option>
			</select>
			关键字
			<input type="text" name="goods_keywords" id="goods_keywords" />
			<button id="btn" onclick="search()">搜索</button>
		<!--</form>-->
	</div>
	<!--商品列表搜索栏结束-->

	<!--商品列表显示开始-->
	<div id="list-div">
		<table id="table" cellpadding="3" cellspacing="1">
			<tr>
				<th>订单编号</th>
				<th>商品名称</th>
				<th>总价格</th>
				<th>用户姓名</th>
				<th>电话</th>
				<th>地址</th>
				<th>下单时间</th>
				<th>状态</th>
			</tr>
			<tr>
				<td id="order_num">
					00001
				</td>
				<td id="order_name">
					蓝莓华夫饼
				</td>
				<td>
					￥52
				</td>
				<td>
					大脸源
				</td>
				<td>
					13123232212
				</td>
				<td>
					北京市昌平区
				</td>
				<td>
					2018-03-24
				</td>
				<td>
					正在配送
				</td>
			</tr>
			
		</table>

		<!--列表下的页码开始-->
		<div id="page">
			总计 <span id="totalRecords" data-length="">24</span> 个记录&nbsp;分为 <span id="totalPages">3
    		</span> 页&nbsp;当前第 <span id="pageCurrent">1</span> 页,每页
			<input type="text" name="pageSize" id="pageSize" value="7" />
			<span id="pageLink">
    			<a href="javascript:;">第一页</a>
    			<a href="javascript:;">上一页</a>
    			<a href="javascript:;">下一页</a>
    			<a href="javascript:;">最末页</a>
    			<select name="gotoPage" id="gotoPage">
    				<option value="1">1</option>
    			</select>
    		</span>
		</div>
		<!--列表下的页码结束-->

	</div>
	<!--商品列表显示结束-->

	<!--商品列表底部结束-->
	<div id="footer">
		共执行 9 个查询，用时 0.024190 秒，Gzip 已禁用，内存占用 3.580 MB <br/> 版权所有 © 2005-2018 上海商派软件有限公司，并保留所有权利。
	</div>
	<!--商品列表底部结束-->
`;

$.extend(Content.prototype, {
	init: function(){
		this.createDom();
		this.showList();
	},
	createDom: function(){
		this.element = $(Content.template);
		this.contentContainer.append(this.element);
	},
	showList: function(){
		
	}
})
